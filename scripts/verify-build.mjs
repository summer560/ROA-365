// Build-output checks for actual navigation, assets, draft isolation and source fidelity.
// Run after `npm run build`. No browser, service or additional dependency is required.
import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';

const root = process.cwd();
const dist = path.join(root, 'dist');
async function walk(dir) {
  const result = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    result.push(...(entry.isDirectory() ? await walk(file) : [file]));
  }
  return result;
}
const files = await walk(dist);
const htmlFiles = files.filter(file => file.endsWith('.html'));
assert(htmlFiles.length >= 9, 'Expected home, seven categories, and 404.');
const htmlByFile = new Map();
const idsByFile = new Map();
for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  htmlByFile.set(file, html);
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  assert.equal(new Set(ids).size, ids.length, `Duplicate ids in ${file}`);
  idsByFile.set(file, new Set(ids));
  assert.match(html, /<html[^>]*lang="ko"/, `Missing Korean language: ${file}`);
  assert.match(html, /<title>[^<]+<\/title>/, `Missing title: ${file}`);
  assert.match(html, /name="description"/, `Missing description: ${file}`);
  assert(!html.includes('캐릭터 이름'), `A template leaked into ${file}`);
}

let linkCount = 0;
for (const [file, html] of htmlByFile) {
  const relative = path.relative(dist, file).split(path.sep).join('/');
  const base = new URL(relative === 'index.html' ? '/' : '/' + relative.replace(/index\.html$/, ''), 'https://verify.invalid');
  const urls = [...html.matchAll(/\b(?:href|src)="([^"<>]+)"/g)].map(match => match[1]);
  urls.push(...[...html.matchAll(/\bsrcset="([^"<>]+)"/g)].flatMap(match => match[1].split(',').map(item => item.trim().split(/\s+/)[0])));
  for (const ref of urls) {
    if (/^(?:https?:|mailto:|tel:|data:|javascript:)/.test(ref)) continue;
    const target = new URL(ref, base);
    let resolved = path.join(dist, decodeURIComponent(target.pathname));
    let info;
    try { info = await stat(resolved); } catch { throw new Error(`Broken link in ${relative}: ${ref}`); }
    if (info.isDirectory()) resolved = path.join(resolved, 'index.html');
    await stat(resolved);
    if (target.hash && resolved.endsWith('.html')) {
      assert(idsByFile.get(resolved)?.has(decodeURIComponent(target.hash.slice(1))), `Broken anchor in ${relative}: ${ref}`);
    }
    linkCount++;
  }
  for (const img of html.matchAll(/<img\b[^>]*>/g)) assert(/\balt="[^"]*"/.test(img[0]), `Missing alt in ${relative}`);
}

// Compare lore sentences, not decorative headings or navigation labels.
const normalize = text => text.replace(/\s+/g, '').replaceAll('했죠.', '했습니다.').replaceAll('‘외계인은', '외계인은');
const canon = normalize(await readFile(path.join(root, 'docs/source/website-components.txt'), 'utf8'));
const loreKeys = new Set(['paragraphs', 'description', 'lead', 'gradeIntro', 'gradePrinciples', 'incidentIntro', 'note', 'quote']);
let sentenceCount = 0;
function compare(value, at, active = false) {
  if (Array.isArray(value)) value.forEach((item, i) => compare(item, `${at}[${i}]`, active));
  else if (value && typeof value === 'object') Object.entries(value).forEach(([key, item]) => compare(item, `${at}.${key}`, loreKeys.has(key)));
  else if (active && typeof value === 'string') {
    for (const sentence of value.split(/\s+\/\s+/).flatMap(part => part.split(/(?<=\.)\s+/)).filter(Boolean)) {
      assert(canon.includes(normalize(sentence)), `Lore not found in selected source: ${at}: ${sentence}`);
      sentenceCount++;
    }
  }
}
for (const name of ['pages', 'timeline', 'systems', 'organizations']) compare(JSON.parse(await readFile(path.join(root, `src/data/${name}.json`), 'utf8')), name);
assert(!files.some(file => file.includes('/docs/') || file.includes('_template')), 'Private build inputs must not be published.');
console.log(`Verified ${htmlFiles.length} HTML pages, ${linkCount} internal references, ${sentenceCount} source-grounded lore sentences. Drafts excluded.`);
