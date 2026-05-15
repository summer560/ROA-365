export type Product = { name: string; price: string; stock: string; category: string; description: string };
export type EventItem = { title: string; period: string; detail: string; note?: string };

export const alertMessages = [
  '현재 일온시 중앙권역 포탈 경보는 관심 단계입니다.',
  'ROA 호출기 배터리팩 일부 품목 재고 부족',
];

export const quickMenus = ['상품 검색', '행사 상품', '비상용품 재고', '세이프존 현황', 'ROA 제휴 서비스', '매장 이용 안내', '3개월 채용 공고', '고객 문의'];
export const dashboard = [
  ['영업 상태', '정상 운영'],
  ['포탈 경보', '관심 (1단계)'],
  ['세이프존 수용 가능 인원', '42명'],
  ['비상 키트 재고', '충분'],
  ['ROA 제휴 카운터', '운영 중'],
];

export const products: Product[] = [
  { name: '365 고열량 전투식 도시락', price: '₩6,900', stock: '충분', category: '도시락/간편식', description: '출동 전후 식사를 고려한 고열량 구성.' },
  { name: '일온 야간근무 삼각김밥 세트', price: '₩4,500', stock: '보통', category: '도시락/간편식', description: '야간 교대 근무 고객 선호 조합.' },
  { name: '포탈 대기열 에너지바', price: '₩2,200', stock: '충분', category: '음료/디저트', description: '장시간 대기를 고려한 탄수·단백 균형.' },
  { name: '정화수 500ml', price: '₩1,400', stock: '충분', category: '생활용품', description: '비상 보관 적합 용기 규격.' },
  { name: '외계 잔류물 클린티슈', price: '₩3,200', stock: '보통', category: '포탈 재난 대비용품', description: '초기 표면 오염 대응용.' },
  { name: '비상 호출기 배터리팩', price: '₩12,000', stock: '부족', category: '레인저 제휴 상품', description: 'ROA 인증 단말 호환 배터리.' },
];

export const events: EventItem[] = [
  { title: '도시락 2+1', period: '05.01 - 05.31', detail: '지정 간편식 대상, 교대 근무 시간대 추가 증정.' },
  { title: '야간근무 에너지바 묶음 할인', period: '상시', detail: '22시~04시, 4개 묶음 15% 할인.' },
  { title: '비상용품 주간 할인', period: '매월 둘째 주', detail: '마스크·담요·정화수 카테고리 특별가.' },
  { title: 'ROA 앱 인증 레인저 커피 리필', period: '상시', detail: '임무 전후 1회 리필 제공.' },
];

export const notices = ['일온시 포탈 경보 관심 단계 유지 안내', '비상 호출기 배터리팩 일부 품목 재입고 지연', '세이프존 정기 점검 일정 안내', '이상현상 의심 상품 신고 절차 안내'];
export const faqs = [
  ['포탈 경보가 울리면 매장은 계속 운영하나요?', '관심·주의 단계에서는 일반 영업을 유지하며, 경계 이상 단계에서는 일부 구역이 세이프존으로 전환됩니다.'],
  ['세이프존 이용은 무료인가요?', '대피 공간 이용은 무료입니다. 단, 담요·충전·일부 소모성 물품은 유료로 제공됩니다.'],
  ['레인저가 아니어도 비상용품을 구매할 수 있나요?', '대부분의 방재용품은 일반 시민도 구매할 수 있으며 일부 ROA 인증 품목은 앱 인증이 필요합니다.'],
  ['외인혼혈 채용은 어떤 제도인가요?', '본사 세이프존 인력 지원 프로그램에 따른 3개월 기간제 시범 고용 트랙입니다.'],
  ['이상현상을 발견하면 어떻게 해야 하나요?', '직원에게 알리거나 이상현상 신고 QR을 이용해 접수해 주세요.'],
];

export const safezoneFacilities = ['강화 방호 셔터', '간이 방호벽', '응급 키트', '외계 독성 차단 마스크', '정화수 보관함', '비상식량 보관함', '비상 호출기 충전 독', 'ROA 직통 신고 버튼', '이상현상 신고 태블릿'];
export const roaServices = ['ROA 앱 인증', '호출기 배터리 교환', '출동 전 픽업 예약', '임무 복귀자 간편식 패키지', '오염 의류 임시 밀봉백', '비상 보고 QR 접수', '세이프존 우선 대피 동선 안내'];
