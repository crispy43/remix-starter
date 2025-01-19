# Remix Starter

[tailwindcss](https://tailwindcss.com/)와 [shadcn/ui](https://ui.shadcn.com/)가 적용된 [Remix](https://remix.run/) 스타터 탬플릿입니다.
라이트&다크 테마 변경과 다국어 현지화 언어셋을 사용할 수 있습니다.
[Ajv](https://ajv.js.org/)가 포함되어 있으므로 데이터 구조의 유효성 검사는 [JSON schema](https://json-schema.org/) 형식을 사용하는 것을 권장합니다.

## 시작하기

아래 `create-remix` 커맨드로 신규 리믹스 프로젝트를 시작합니다.

```bash
npx create-remix@latest --template crispy43/remix-starter
```

내부적으로 Yarn 패키지 매니저를 사용하기 때문에, 두번째 `deps   Install dependencies with npm?` 질문에서 No를 선택하고 패키지를 yarn 커맨드로 수동 설치해야 합니다.

```bash
  deps   Install dependencies with npm?
         No
```

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

(`yarn build`후에 `yarn start`로 실행하게 되면 더 이상 .env 파일의 환경 변수는 참조되지 않습니다)

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
│   │   ├── en              # 영어 네임스페이스 언어셋
│   │   ├── ko              # 한국어 네임스페이스 언어셋
│   │   └── types.d.ts      # 언어 JSON 파일 타입 정의
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

테마는 `/app/hooks/use-theme.tsx`의 `useTheme`훅을 리액트 컴포넌트에서 사용합니다.

```typescript
import { useTheme } from '~/hooks/use-theme';

const [theme, setTheme] = useTheme();
```

`theme`의 기본 값은 시스템 테마를 따라갑니다. `setTheme()`로 테마를 변경하면 세션에 영구 저장되어 다음 접속때에도 동일한 테마가 유지됩니다.

### 다국어 현지화

i18n 관련 라이브러리를 사용하지 않지만, 본 프로젝트에서는 리믹스 프레임워크의 SSR 형태에 맞게 다국어 옵션을 사용할 수 있습니다. i18n을 사용하는 것과 유사하지만 서버사이드에서 언어 텍스트가 먼저 렌더링되므로 i18n 보다 정적입니다.

#### localize

언어별 텍스트 정의는 `/app/locales/{languageCode}/` 경로에 JSON 파일로 저장하면 됩니다. 영어는 `/app/locales/en/`, 한국어는 `/app/locales/ko/` 아래에 JSON 파일을 저장하는 식입니다. `common.json`은 공통 언어 파일로 기본 네임스페이스가 되고 다른 네임스페이스에 언어 정의를 상속합니다. 이외 파일들은 각 파일 명으로 네임스페이스가 지정됩니다. 예를 들어 `welcome.json`파일은 네임스페이스가 `welcome`이 되므로 welcome 언어셋을 가져오려면 리믹스 `loader` 구문에서 아래 코드처럼 가져옵니다.

```typescript
import { LoaderFunctionArgs } from '@remix-run/node';

import { localize } from '~/.server/lib/localization';
import { WelcomeJson } from '~/locales/types';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const t = await localize<WelcomeJson>(request, 'welcome');
  return { t };
};
```

`localize()` 함수를 사용할 때, 위 코드처럼 `/app/locales/types.d.ts` 파일에 정의된 타입을 제네릭으로 주입하여 사용하는 언어셋 `t`의 타입 추론을 할 수 있습니다. JSON 언어 파일을 생성할 때 `/app/locales/types.d.ts`에 타입 정의도 함께 해주면 됩니다.

```json
{
  "welcome": "Remix에 오신 것을 환영합니다!"
}
```

```typescript
// /app/locales/types.d.ts
export type WelcomeJson = typeof import('../locales/en/welcome.json');
```

화면에 언어 텍스트 적용 아래 코드처럼 `t`를 리믹스의 `useLoaderData()` 훅으로 가져와서 사용합니다.

```tsx
// /app/locales/en/welcome.json = { "welcome": "Welcome to Remix!" }
// /app/locales/ko/welcome.json = { "welcome": "Remix에 오신 것을 환영합니다!" }

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const t = await localize<WelcomeJson>(request, 'welcome');
  return { t };
};

export default function Index() {
  const { t } = useLoaderData<typeof loader>();
  return <p>{t.welcome}</p>;
  // 언어가 en인 경우 <p>Welcome to Remix!</p>
  // 언어가 ko인 경우 <p>Remix에 오신 것을 환영합니다!</p>
}
```

언어를 추가해야 하는 경우 `/app/common/constants.ts` 상수 파일의 `LANGUAGES` 배열에 언어 코드를 추가합니다. 기본 언어 코드는 `DEFAULT_LANGUAGE` 값으로 설정합니다.

#### useLanguage

언어 코드 확인과 변경은 `/app/hooks/use-language.ts`의 `useLanguage`훅을 리액트 컴포넌트에서 사용합니다.

```typescript
import { useLanguage } from '~/hooks/use-language';

const [language, setLanguage] = useLanguage();
```

`language`로 현재 적용된 언어 코드를 확인할 수 있습니다. 언어 변경은 `setLanguage('en')`처럼 변경할 언어 코드를 `setLanguage`함수의 인자로 사용하면 됩니다.
