import type { APIRoute } from 'astro';
import { navigation } from '../data/site';
export const GET: APIRoute = ({site}) => {
  const origin=site;
  const extras=Object.entries(import.meta.glob('../content/{characters,records}/*.md',{eager:true})).filter(([,e]:any)=>!e.frontmatter.draft) as [string,any][];
  const routes=['/',...navigation.map(n=>`/${n.slug}/`),...extras.map(([file,e])=>`/${file.includes('/characters/')?'characters':'records'}/${e.frontmatter.slug}/`)];
  const urls=origin ? routes.map(r=>`<url><loc>${new URL(r,origin).href.replace(/&/g,'&amp;')}</loc></url>`).join('') : '';
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`,{headers:{'Content-Type':'application/xml'}});
};
