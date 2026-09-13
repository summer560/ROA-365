# ROA — 공식 세계관 아카이브

검정·노랑을 중심으로 한 ROA 창작 세계관 웹사이트입니다. Astro로 HTML을 미리 생성하는 정적 사이트이며 로그인, 서버, 데이터베이스가 필요하지 않습니다. GitHub 저장소를 Cloudflare Pages에 연결해 운영할 수 있습니다.

## 가장 먼저 알아둘 원칙

**사이트의 기준 원고는 「roa 웹사이트 구성요소」입니다. 「ROA 설정집 정리」는 사용하지 않습니다.**

원고에 없는 설정을 추측해서 채우거나 과거 대화의 내용을 섞지 않습니다. 본문은 의미를 유지하면서 문단을 나누고 `~입니다 / ~합니다`로 정리합니다. 원고의 보관 위치와 페이지별 매핑, 유일한 연표 예외는 [디자인·콘텐츠 기준](docs/DESIGN.md)에 기록했습니다.

수정 요청 예시:

- “메인 그림을 첨부 이미지로 교체하고 모바일에서는 얼굴이 잘 보이게 해주세요.”
- “공개용 문서에 추가한 외계 종족을 ALIEN 페이지에 등록해주세요.”
- “이 프로필로 캐릭터 한 명을 추가해주세요. 비공개 설정은 넣지 마세요.”
- “2027년 연표에 다음 사건을 추가해주세요.”

## 프로젝트 구조

| 위치 | 역할 |
| --- | --- |
| `src/data/site.ts` | 사이트 제목, 메뉴, 메인 이미지 경로·초점, 로고, 홈 카피 |
| `src/data/pages.json` | WORLD / ABILITY / ALIEN / RANGER / ORGANIZATIONS 본문 |
| `src/data/timeline.json` | 공개용 연표. `major: true`인 사건은 홈에도 노출 |
| `src/data/systems.json` | Grade, Incident Type, 복무 유형, 등급 평가 요소 |
| `src/data/organizations.json` | 세 조직 포스터의 주장과 설명 |
| `src/content/characters/` | 캐릭터 Markdown. 목록과 상세 페이지 자동 생성 |
| `src/content/records/` | 새 종족·현상 등 추가 기록 Markdown |
| `src/pages/` | 홈페이지, 카테고리, 상세 페이지, 404, sitemap, robots |
| `src/components/` | 로고, 연표, 조직 포스터, 본문 섹션, 등급·위험도 UI |
| `src/layouts/Base.astro` | 공통 메뉴, 푸터, SEO, 메뉴 동작, 등장 효과 |
| `src/styles/global.css` | 모든 색상, 글꼴, 공통 디자인과 PC·모바일 스타일 |
| `public/images/` | hero / characters / organizations / world / alien / anomaly / icons |
| `docs/source/website-components.txt` | 선택한 공개용 문서 사본. 사이트에는 배포되지 않음 |
| `scripts/verify-build.mjs` | 빌드 결과의 링크·앵커·이미지·본문·초안 제외 검증 |
| `dist/` | 배포할 HTML·CSS·JS·이미지. 빌드 때 생성되며 Git에는 올리지 않음 |

## 로컬 실행

Node.js **22.12 이상**을 사용합니다. `.node-version`에는 22를 지정했습니다. `package-lock.json`을 유지해 같은 의존성을 설치합니다.

```bash
npm ci
npm run dev
```

브라우저에서 `http://localhost:4173`을 엽니다.

```bash
npm run build
npm run verify
npm run preview
```

`build`는 `dist/`를 만들고, `verify`는 공개 페이지의 내부 링크·자산·중복 ID·원고 일치를 확인합니다. `preview`는 생성된 결과를 확인합니다. 새 원고를 반영할 때 원고 사본도 함께 갱신한 뒤 검증합니다.

## Cloudflare Pages 배포

Cloudflare의 **Workers & Pages → Pages → Git 저장소 연결**에서 `summer560/ROA-365`를 선택하고 다음 설정을 사용합니다.

| 설정 | 값 |
| --- | --- |
| Framework preset | Astro |
| Production branch | `main` |
| Root directory | 저장소 루트, 비워두기 |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node.js | 22.12 이상. 필요 시 `NODE_VERSION=22` |
| 환경변수 `SITE_URL` | 최종 사이트 주소. 예: 실제 연결한 커스텀 도메인 |

`SITE_URL`이 없으면 Cloudflare가 제공하는 `CF_PAGES_URL`을 사용합니다. 둘 다 없는 로컬 빌드에서는 가짜 도메인을 만들지 않으며 canonical과 사이트맵 주소는 비워 둡니다. 실제 도메인이 정해지면 `SITE_URL`을 지정하고 다시 빌드하세요.

이 프로젝트는 **Cloudflare Pages용 정적 출력**입니다. Cloudflare 어댑터, Worker, 별도 서버, 비밀 키가 필요하지 않습니다. `public/_headers`는 생성된 CSS/JS를 오래 캐시하고 매달 교체하는 이미지는 재검증하도록 설정합니다. `404.astro`가 일반 404 페이지를 생성하므로 SPA 전체 경로 리다이렉트는 추가하지 않습니다.

Cloudflare 계정 연결과 실제 배포는 별도 단계입니다. GitHub에 코드를 저장하는 것만으로 사이트가 공개되는 것은 아닙니다.

## 메인 이미지와 로고 교체

가장 간단한 방법은 **`public/images/hero/hero-main.webp` 파일 하나를 같은 이름으로 교체**하는 것입니다. 현재 파일은 사용자가 제공한 임시 일러스트를 최적화한 WebP입니다.

다른 파일명, 모바일 전용 이미지, 화면에서 보이는 위치는 `src/data/site.ts`의 `hero`에서 설정합니다.

```ts
hero: {
  desktop: '/images/hero/hero-main.webp',
  mobile: '/images/hero/hero-mobile.webp',
  desktopPosition: 'center 38%',
  mobilePosition: '61% 30%',
  alt: '실제 이미지에 맞는 설명',
}
```

모바일 이미지를 따로 준비하지 않았다면 두 경로를 같은 파일로 지정하면 됩니다. 경로를 바꾸기 전에 실제 파일을 먼저 넣어야 합니다. PC는 가로형, 모바일은 얼굴과 주요 인물이 중심에 놓인 세로형 구성이 적합합니다. 본문의 캐릭터 프로필과는 독립적입니다.

공식 ROA 로고가 준비되면 `public/images/icons/roa-logo-light.svg` 등에 넣고 `site.ts`의 `logo`에 `/images/icons/roa-logo-light.svg`를 지정합니다. 현재는 `logo: null`이며 임시 문자형 ROA 로고를 사용합니다.

## 세계관 설명 추가·수정

기존 페이지의 짧은 섹션은 `src/data/pages.json`에서 해당 카테고리의 `sections`에 추가합니다.

```json
{
  "id": "new-section",
  "title": "새 항목 제목",
  "eyebrow": "NEW SECTION",
  "paragraphs": ["공개용 원고의 첫 문단입니다.", "두 번째 문단입니다."],
  "tone": ""
}
```

`id`는 같은 페이지에서 중복되지 않는 영문·숫자·하이픈을 사용합니다. `paragraphs`에 문단 단위로 내용을 넣으면 공통 디자인으로 출력합니다. `tone`은 기본 빈 값, 또는 `cyan`, `yellow`, `bureau`, `origin`을 사용할 수 있습니다.

독립 상세 페이지가 필요한 **새 외계 종족·이상현상·기관 자료**는 `src/content/records/_template.md`를 복사합니다. 파일명, `slug`, `title`, `description`, `category`, 본문을 수정한 뒤 `draft: false`로 바꿉니다. 카테고리 하단에 링크와 `/records/슬러그/` 상세 페이지가 자동 생성됩니다. `category`는 `world`, `ability`, `alien`, `ranger`, `organizations` 중 하나입니다. ARCHIVE 자료는 메뉴를 공개하는 수정과 함께 추가합니다.

## 연표 추가

`src/data/timeline.json`에 아래 형식으로 추가하고 연대순으로 배치합니다. **예시 값을 실제 설정으로 사용하지 않습니다.**

```json
{
  "year": "2027",
  "title": "사용자가 확정한 사건명",
  "description": "공개용 원고의 설명입니다.",
  "major": false
}
```

`major: true`는 홈과 전체 연표에 크게 표시합니다. 현재 주요 시점은 사용자 요청대로 1986 / 1991 / 1996 / 2026입니다. 사건이 늘어나도 목록 레이아웃을 재사용합니다.

## 캐릭터 추가

1. `src/content/characters/_template.md`를 복사해 `캐릭터의-영문이름.md`로 저장합니다.
2. 이미지를 `public/images/characters/영문이름.webp`에 넣습니다.
3. 상단의 `slug`, `name`, `description`, `image`, `imageAlt`, `organization`을 수정합니다.
4. `profile`에 공개할 항목만 넣고 Markdown 본문에 소개를 작성합니다.
5. 모두 준비되면 **`draft: false`**로 변경합니다. 숫자 `order`가 낮을수록 앞에 표시됩니다.
6. 빌드하면 캐릭터 목록, `/characters/슬러그/` 상세 페이지, 사이트맵이 함께 생성됩니다.

`slug`는 파일명과 달라도 되지만 캐릭터 안에서 중복되면 안 됩니다. 영문 소문자·숫자·하이픈을 사용합니다. 초안은 사이트 HTML과 사이트맵에 포함되지 않습니다. 단, **GitHub 저장소는 공개 상태이므로 비공개 설정은 초안 파일에도 넣지 마세요.**

## 색상·글꼴 수정

`src/styles/global.css` 첫머리 `:root`에 공통 색상이 있습니다. `--black`, `--yellow`, `--paper`가 전체 아이덴티티이고 `--cyan`, `--violet`, `--acid`, `--red`, `--orange`가 보조색입니다. `--type-1`부터 `--type-5`까지가 사건 위험도 색상입니다.

`--display`는 대형 영문 제목, `--body`는 한국어 본문 글꼴입니다. 현재 외부 폰트를 내려받지 않고 시스템 글꼴을 사용합니다. 폰트를 추가할 경우 정식 라이선스의 WOFF2 파일을 사용하고 파일 크기를 확인합니다.

## 이후 Work가 수정할 때

- 우선 `docs/DESIGN.md`와 최신 「roa 웹사이트 구성요소」를 확인합니다.
- 설정 내용은 데이터·Markdown, 디자인은 공통 컴포넌트·CSS에 수정합니다.
- 캐릭터나 종족을 추가할 때 별도 화면을 새로 복제하지 않고 기존 템플릿을 재사용합니다.
- 원고를 갱신하고 `npm run build && npm run verify`를 실행합니다.
- 가능하면 PC와 모바일에서 메뉴, 그림의 잘리는 위치, Grade 탭, 목차 이동, 본문을 확인합니다.
- GitHub에 저장 후 연결된 Cloudflare Pages의 배포 결과를 확인합니다.
