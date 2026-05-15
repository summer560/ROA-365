# 365 STORE 일온시 지점 공식 홈페이지

가상의 현대 포탈 재난 세계관에 존재하는 `365 STORE 일온시 지점` 공식 홈페이지입니다.
React + Vite + TypeScript + Tailwind CSS 기반 단일 페이지이며, 실제 대형 편의점 홈페이지처럼 정보 밀도가 높은 섹션 중심으로 구성했습니다.

## 기술 스택
- React
- Vite
- TypeScript
- Tailwind CSS

## 로컬 실행
```bash
npm install
npm run dev
```

## 타입 검사
```bash
npm run typecheck
```

## 빌드
```bash
npm run build
```

## GitHub Pages 배포 확인
- `vite.config.ts`에 `base: '/ROA-365/'`가 설정되어 있습니다.
- GitHub Pages 배포 후 `https://<계정명>.github.io/ROA-365/` 경로에서 확인합니다.
- 정적 파일은 `npm run build` 결과물(`dist`) 기준으로 배포합니다.

## 구성 섹션
Header, AlertBar, Hero, QuickMenu, StatusDashboard, ProductSection, EventSection, SafezoneSection, AnomalySection, AdultRestrictedSafetySection, ROAPartnershipSection, HiringSection, FranchiseSection, NoticeSection, FAQSection, Footer
