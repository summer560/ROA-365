import { useState } from 'react';
import { alertMessages, dashboard, events, faqs, notices, products, quickMenus, roaServices, safezoneFacilities } from './mockData';

type Page = 'home' | 'customer' | 'login';

const navItems: { label: string; id?: string; page?: Page }[] = [
  { label: '상품', id: 'products' },
  { label: '행사', id: 'events' },
  { label: '서비스', id: 'services' },
  { label: '세이프존', id: 'safezone' },
  { label: 'ROA 제휴', id: 'roa' },
  { label: '고객센터', page: 'customer' },
];

const sectionClass = 'mx-auto max-w-7xl px-4 py-10';
const cardClass = 'rounded-xl border border-slate-200 bg-white p-5 shadow-sm';

export default function App() {
  const [page, setPage] = useState<Page>('home');
  const [user, setUser] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-slate-50 text-brand-navy">
      <Header user={user} onGoLogin={() => setPage('login')} onGoCustomer={() => setPage('customer')} onGoHome={() => setPage('home')} />
      {page === 'home' && <AlertBar />}
      <main>
        {page === 'home' && <HomePage />}
        {page === 'customer' && <CustomerCenterPage onGoHome={() => setPage('home')} />}
        {page === 'login' && <LoginPage onLogin={(id) => { setUser(id); setPage('home'); }} />}
      </main>
      <Footer />
    </div>
  );
}

function Header({ user, onGoLogin, onGoCustomer, onGoHome }: { user: string | null; onGoLogin: () => void; onGoCustomer: () => void; onGoHome: () => void }) {
  return <header className="sticky top-0 z-40 border-b bg-white/95 backdrop-blur"><div className="mx-auto max-w-7xl px-4 py-2 text-sm flex justify-end gap-4"><button onClick={onGoLogin}>{user ? `${user}님` : '로그인'}</button><button onClick={onGoCustomer}>고객센터</button></div><div className="mx-auto max-w-7xl px-4 py-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between"><button onClick={onGoHome} className="text-3xl font-black text-amber-500 text-left">365 STORE</button><nav className="flex flex-wrap gap-3 text-sm font-semibold">{navItems.map((item) => item.page ? <button key={item.label} onClick={item.page === 'customer' ? onGoCustomer : onGoHome} className="rounded-full px-3 py-2 hover:bg-amber-50">{item.label}</button> : <a key={item.id} href={`#${item.id}`} className="rounded-full px-3 py-2 hover:bg-amber-50">{item.label}</a>)}</nav><span className="rounded-full bg-amber-100 px-4 py-2 text-xs font-bold">일온시 포탈 경보: 관심 (1단계)</span></div></header>;
}
function HomePage() { return <><Hero /><QuickMenu /><StatusDashboard /><ProductSection /><EventSection /><SafezoneSection /><AnomalySection /><ROAPartnershipSection /><HiringSection /><NoticeSection /><FAQSection /></>; }
function AlertBar() { return <div className="bg-brand-navy text-white text-sm"><div className="mx-auto max-w-7xl px-4 py-2 flex flex-wrap gap-4">{alertMessages.map((m) => <p key={m}>• {m}</p>)}</div></div>; }
function Hero() { const banners = [['오늘의 식사부터 내일의 안전까지', '365 STORE 일온시 지점은 평상시에는 편의점, 비상시에는 생활 안전 거점입니다.'], ['포탈 경보에도 열려 있는 가장 가까운 세이프존', '대피 공간, 비상용품, ROA 직통 신고 시스템을 갖춘 대형 세이프존형 매장입니다.'], ['레인저와 시민을 위한 24시간 보급 거점', 'ROA 앱 인증 고객은 호출기 배터리 교환, 출동 전 픽업, 오염 의류 밀봉 서비스를 이용할 수 있습니다.']]; return <section className={sectionClass}><div className="grid gap-4 md:grid-cols-3">{banners.map(([t, d]) => <article key={t} className="rounded-2xl bg-gradient-to-br from-amber-100 to-white p-6 border"><h2 className="text-xl font-bold">{t}</h2><p className="mt-2 text-sm">{d}</p></article>)}</div></section>; }
function QuickMenu() { return <section id="services" className={sectionClass}><div className="grid grid-cols-2 md:grid-cols-4 gap-3">{quickMenus.map((m) => <button key={m} className={`${cardClass} text-left font-semibold`}>⚡ {m}</button>)}</div></section>; }
function StatusDashboard() { return <section className={sectionClass}><h3 className="text-2xl font-bold mb-4">매장 현황</h3><div className="grid gap-3 md:grid-cols-3">{dashboard.map(([k, v]) => <div key={k} className={cardClass}><p className="text-xs text-slate-500">{k}</p><p className="mt-1 font-bold">{v}</p></div>)}</div></section>; }
function ProductSection() { return <section id="products" className={sectionClass}><h3 className="text-2xl font-bold mb-4">상품</h3><div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{products.map((p) => <article key={p.name} className={cardClass}><div className="flex justify-between"><span className="text-xs bg-amber-100 px-2 py-1 rounded">{p.category}</span><span className="text-xs">일온시 지점 취급</span></div><h4 className="mt-2 font-bold">{p.name}</h4><p className="text-sm mt-1">{p.description}</p><p className="mt-2 text-sm">가격 {p.price} · 재고 {p.stock}</p></article>)}</div></section>; }
function EventSection() { return <section id="events" className={sectionClass}><h3 className="text-2xl font-bold mb-4">행사/이벤트</h3><div className="grid gap-3 md:grid-cols-2">{events.map((e) => <article key={e.title} className={cardClass}><h4 className="font-bold">{e.title}</h4><p className="text-xs text-slate-500">{e.period}</p><p className="text-sm mt-2">{e.detail}</p>{e.note && <p className="mt-3 text-xs italic">{e.note}</p>}</article>)}</div></section>; }
function SafezoneSection() { return <section id="safezone" className={sectionClass}><h3 className="text-2xl font-bold mb-4">세이프존 안내</h3><div className="grid gap-4 md:grid-cols-2"><div className={cardClass}><p>관심 단계: 일반 영업</p><p>주의 단계: 대피 동선 안내</p><p>경계 단계: 동측 구역 세이프존 전환</p><p>심각 단계: 방호 셔터 하강, ROA 직통 신고</p></div><div className={`${cardClass} grid grid-cols-1 gap-2`}>{safezoneFacilities.map((f) => <p key={f}>• {f}</p>)}</div></div></section>; }
function AnomalySection() { const items = ['공간 왜곡', '감각 교란', '의태 외계체', '접촉성 오염', '시간 지연']; return <section className={sectionClass}><h3 className="text-2xl font-bold mb-4">일온시 이상현상 생활안전 안내</h3><div className="grid gap-3 md:grid-cols-5">{items.map((i) => <div className={cardClass} key={i}>{i}</div>)}</div></section>; }
function ROAPartnershipSection() { return <section id="roa" className={sectionClass}><h3 className="text-2xl font-bold mb-4">ROA 제휴 서비스</h3><div className="grid gap-3 md:grid-cols-3">{roaServices.map((s) => <article key={s} className={cardClass}><h4 className="font-semibold">{s}</h4></article>)}</div></section>; }
function HiringSection() { return <section className={sectionClass}><h3 className="text-2xl font-bold mb-4">외인혼혈 세이프존 보조 스태프 3개월 기간제 시범 고용</h3><div className={cardClass}>세이프존 운영 지원 인력 채용을 상시 검토합니다.</div></section>; }
function NoticeSection() { return <section className={sectionClass}><h3 className="text-2xl font-bold mb-4">공지사항</h3><ul className={cardClass}>{notices.map((n) => <li className="py-2 border-b last:border-0" key={n}>{n}</li>)}</ul></section>; }
function FAQSection() { return <section className={sectionClass}><h3 className="text-2xl font-bold mb-4">FAQ</h3><div className="space-y-3">{faqs.map(([q, a]) => <article key={q} className={cardClass}><p className="font-semibold">Q. {q}</p><p className="mt-2 text-sm">A. {a}</p></article>)}</div></section>; }
function LoginPage({ onLogin }: { onLogin: (id: string) => void }) { const [id, setId] = useState(''); const [pw, setPw] = useState(''); const [err, setErr] = useState(''); return <section className={sectionClass}><div className="max-w-md mx-auto bg-white border rounded-xl p-6"><h2 className="text-2xl font-bold">로그인</h2><p className="text-sm text-slate-500 mt-1">데모 계정: store365 / 365pass</p><input className="w-full border rounded p-2 mt-4" placeholder="아이디" value={id} onChange={(e) => setId(e.target.value)} /><input type="password" className="w-full border rounded p-2 mt-3" placeholder="비밀번호" value={pw} onChange={(e) => setPw(e.target.value)} />{err && <p className="text-red-600 text-sm mt-2">{err}</p>}<button className="w-full mt-4 bg-amber-500 text-white rounded p-2 font-bold" onClick={() => { if (id === 'store365' && pw === '365pass') onLogin(id); else setErr('아이디 또는 비밀번호가 올바르지 않습니다.'); }}>로그인</button></div></section>; }
function CustomerCenterPage({ onGoHome }: { onGoHome: () => void }) { return <section className={sectionClass}><div className={cardClass}><h2 className="text-2xl font-bold">고객센터</h2><p className="mt-3">문의 접수: 1588-0365 (24시간)</p><p>점포 제보: report@365store.virtual</p><button className="mt-4 rounded bg-brand-navy text-white px-4 py-2" onClick={onGoHome}>메인으로 돌아가기</button></div></section>; }
function Footer() { return <footer className="bg-brand-navy text-white mt-8"><div className="mx-auto max-w-7xl px-4 py-8 text-sm"><p>본 사이트의 브랜드·기관·지역은 가상 설정이며 실제와 무관합니다.</p></div></footer>; }
