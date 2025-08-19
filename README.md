# 🚀 Frontend - Intranet Web Project

사내 인트라넷 웹 시스템 (Frontend 전용)
Framework: **Vite + React + TypeScript + SWC**
Code Quality: **ESLint + Prettier**

---

## 📂 프로젝트 구조

```
frontend/
├── public/                 # 정적 파일 (favicon, index.html 등)
├── src/                    # 프로젝트 소스 코드
│   ├── api/                # Axios 인스턴스, API 모듈
│   ├── assets/             # 이미지, 아이콘, 폰트 등 정적 리소스
│   ├── components/         # 재사용 가능한 UI 컴포넌트
│   │    ├── common/        # 버튼, 모달, 테이블 등 범용 컴포넌트
│   │    └── layout/        # Header, Sidebar, Footer 등 레이아웃
│   ├── hooks/              # 커스텀 훅 (ex. useAuth, useFetch)
│   ├── pages/              # 라우트 단위 페이지
│   │    ├── auth/          # 로그인, 회원가입
│   │    ├── dashboard/     # 대시보드
│   │    └── users/         # 사용자 관리
│   ├── routes/             # React Router 라우팅 설정
│   ├── store/              # 전역 상태관리 (Redux, Recoil, Zustand 등)
│   ├── styles/             # 전역 스타일 (CSS, SCSS, Tailwind config)
│   ├── types/              # 전역 타입 정의 (DTO, 인터페이스 등)
│   ├── utils/              # 유틸 함수 (포맷터, 검증 로직 등)
│   ├── App.tsx             # 최상위 App 컴포넌트
│   └── main.tsx            # 엔트리 포인트
├── .eslintrc.cjs           # ESLint 설정
├── .gitignore              # Git 제외 설정
├── .prettierrc             # Prettier 코드 포맷팅 설정
├── index.html              # 진입 HTML 파일
├── package.json            # 프로젝트 설정 및 의존성
├── package-lock.json       # 패키지 버전 고정
├── tsconfig.json           # TypeScript 설정
├── tsconfig.app.json       # 앱별 TS 설정
├── tsconfig.node.json      # Node별 TS 설정
└── vite.config.ts          # Vite 빌드 설정
```

---

## ⚙️ 개발 환경

- **Node.js**: `v22.18.0`
- **npm**: `10.9.3`

---

## 🚀 설치 및 실행

```bash
# 패키지 설치
npm install

# 개발 서버 실행
npm run dev

# 코드 검사
npm run lint

# 빌드
npm run build
```

---

## 🌐 API 연동

`.env.development` 예시:

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

`axios`를 통해 API 연동:

```ts
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export default api;
```

---

## 🧹 코드 품질 관리

- **ESLint**: 코드 오류 감지
- **Prettier**: 자동 코드 포맷팅

명령어:

```bash
npm run lint      # 코드 검사
npm run lint --fix # 오류 자동 수정
```

---

## ✅ VS Code 필수 확장 프로그램

- **ESLint** (`dbaeumer.vscode-eslint`)
- **Prettier - Code Formatter** (`esbenp.prettier-vscode`)

> 위 확장 프로그램 설치 후 저장 시 자동 포맷팅이 적용되도록 VS Code 설정을 권장합니다.

---

## 📌 주요 설정

- **절대경로(`@`)**: `src/` 기준 import 경로 사용
- **Proxy 설정**: `/api` 요청 → `http://localhost:8080`
- **환경변수 관리**: `.env` 파일로 API URL 분리
- **자동 포맷팅**: VS Code 저장 시 Prettier 적용

---

## ✅ 권장 VS Code 확장

- ESLint
- Prettier - Code Formatter
- EditorConfig (선택)

---

## 📜 라이선스

이 프로젝트는 사내 전용 프로젝트로 외부 배포 금지입니다.
