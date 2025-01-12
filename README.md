# Remix shadcn/ui Starter

[shadcn/ui](https://ui.shadcn.com)와 tailwindcss를 사용하며 빌드 환경은 Vite가 적용된 Remix 시작 탬플릿입니다. 언어 현지화 기능과 라이트&다크 테마 변경 기능이 적용되어 있습니다.

## 설치

로컬에 기본적으로 20버전 이상의 node.js가 설치되어 있어야합니다.
패키지 매니저는 yarn 4.6.0 버전을 사용합니다.

패키지 설치하기

```bash
yarn
```

환경변수를 설정합니다. 아래 커맨드로 .env.example을 복사하여 .env 파일을 복사하여 만들어 줍니다.

```bash
cp .env.example .env
```

.env를 개발 환경에 맞게 수정해줍니다.

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
