# Remix Starter

[tailwindcss](https://tailwindcss.com/)와 [shadcn/ui](https://ui.shadcn.com/)가 적용된 Remix 스타터 탬플릿입니다.
라이트&다크 테마 변경과 다국어 현지화 언어셋을 사용할 수 있습니다.
[Ajv](https://ajv.js.org/)가 포함되어 있으므로 데이터 구조의 유효성 검사는 [JSON schema](https://json-schema.org/) 형식을 사용하는 것을 권장합니다.

## 설치

로컬에 20버전 이상의 node.js가 설치되어 있어야합니다.
패키지 매니저는 yarn 4.6.0 버전을 사용합니다.

패키지 설치하기

```bash
yarn
```

환경변수를 설정합니다. 아래 커맨드로 .env.example을 복사하여 .env 파일을 복사하여 만들어 줍니다.

```bash
cp .env.example .env
```

.env를 로컬 개발 환경에 맞게 수정해줍니다.

## 실행 및 배포

### 개발 환경 실행

```bash
yarn dev
```

### 배포 전 빌드

```bash
yarn build
```

### 배포 앱 실행

```bash
yarn start
```

(참고: `yarn build`후에 `yarn start`로 실행하게 되면 더 이상 .env 파일의 환경 변수는 참고되지 않습니다)

## 구조

```plaintext
├── .env.example            # 환경변수 예제
├── .eslintignore           # ES Lint 제외 파일
├── .eslintrc.cjs           # ES Lint 설정 파일
├── .gitignore              # Git 제외 파일
├── .prettierignore         # Prettier 제외 파일
├── .prettierrc             # Prettier 설정 파일
├── .vscode
│   └── settings.json       # VS Code 설정 파일
├── .yarn
│   ├── install-state.gz    # 설치 패키지 상태 파일
│   └── releases            # Yarn 파일
├── .yarnrc.yml             # Yarn 설정 파일
├── README.md               # README 파일
├── app                     # 리믹스 App 폴더
│   ├── .server             # Vite 서버사이드 전용 폴더
│   ├── common              # 공통
│   ├── components          # 컴포넌트
│   │   └── ui              # shadcn/ui 컴포넌트 폴더
│   ├── entry.client.tsx    # 리믹스 클라이언트 렌더링
│   ├── entry.server.tsx    # 리믹스 서버 렌더링
│   ├── hooks               # 커스텀 훅
│   ├── lib                 # 유틸리티
│   ├── locales             # 다국어 언어셋 폴더
│   │   ├── en              # 영어
│   │   └── ko              # 한국어
│   ├── root.tsx            # 리믹스 Root 파일
│   ├── routes              # 리믹스 Routes 폴더
│   ├── schemas             # JSON Schema 폴더
│   └── styles              # CSS 폴더
│       └── global.css      # 전역 스타일 파일
├── components.json         # shadcn/ui 설정 파일
├── node_modules
├── package.json
├── postcss.config.js       # PostCSS 설정 파일
├── public
│   └── favicon.ico         # 파비콘
├── tailwind.config.js      # tailwindCSS 설정 파일
├── tsconfig.json           # 타입스크립트 설정
├── vite.config.ts          # Vite 설정
└── yarn.lock
```

## 가이드

### 라이트&다크 테마

테마는 `/app/hooks/use-theme.tsx`의 `useTheme` 훅을 사용합니다.

```typescript
import { useTheme } from '~/hooks/use-theme';

const [theme, setTheme] = useTheme();
```

`theme`의 기본 값은 시스템 테마를 따라갑니다. `setTheme()`로 테마를 변경하면 세션에 영구 저장되어 다음 접속때에도 동일한 테마가 유지됩니다.

### 다국어 현지화
