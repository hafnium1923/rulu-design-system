# design-system

유명 디자인 시스템 코드를 이해하기 어려워서 만드는 쉬운 컴포넌트  
emotion, styled-components, scss 버전의 공용 컴포넌트

# 목차

1. [폴더 구조](#폴더-구조)  
   1-1.[주요 디렉토리 설명](#주요-디렉토리-설명)

# 폴더 구조 [↑](#목차)

```plaintext
design-system/
├─ src/
│ ├─ components/        # 공통 UI 컴포넌트 폴더
│ │ ├─ button/          # Button 컴포넌트
│ │ │ ├─ buttonEmotion/ # Emotion으로 구현된 컴포넌트
│ │ │ ├─ buttonSCSS/    # SCSS로 구현된 컴포넌트
│ │ │ ├─ buttonStyled/  # Styled-components로 구현된 컴포넌트
│ │ │ ├─ ...ts          # 에서 공용으로 사용하는 로직 훅 들
│ │ └─ ...              # 다른 공통 컴포넌트들도 동일한 구조
│ │
│ ├─ hooks/             # 공용 훅
│ │ └─ ...              # 여러 컴포넌트에서 공통으로 사용하는 로직
│ │
│ ├─ stories/           # 스토리북 파일
│ │ ├─ Emotion/         # Emotion 기반 컴포넌트의 스토리북
│ │ ├─ SCSS/            # SCSS 기반 컴포넌트의 스토리북
│ │ └─ Styled/          # Styled-components 기반 컴포넌트의 스토리북
│ │
│ ├─ styles/            # 글로벌 스타일 파일
│ │ ├─ Emotion/         # Emotion 전용 글로벌 스타일 파일
│ │ ├─ SCSS/            # SCSS 전용 글로벌 스타일 파일
│ │ ├─ Styled/          # Styled-components 전용 글로벌 스타일 파일
│ │ └─ ...              # 전역 스타일
│ │
│ ├─ types/             # 공용 타입 정의
└─ ...

```

## 주요 디렉토리 설명 [↑](#목차)

`src/components/`

- 공통 UI 컴포넌트가 포함된 폴더입니다.
- 각 컴포넌트는 하위에 Emotion, SCSS, Styled 폴더를 포함하여 스타일링 방법에 따라 구현된 버전을 제공합니다.
- 해당 컴포넌트에서만 사용하는 공용 로직이나 훅은 각 컴포넌트 폴더 내에서 독립된 파일로 관리됩니다.

`src/hooks/`

- 특정 컴포넌트에 국한되지 않고, 두 개 이상의 컴포넌트에서 공통으로 사용되는 훅이 포함된 폴더입니다.

`src/stories/`

- 각 스타일링 방식(Emotion, SCSS, Styled)에 따라 컴포넌트 스토리북 파일이 위치합니다.

`src/styles/`

- 글로벌 스타일 파일이 포함된 폴더입니다.
- 스타일링 방식별(Emotion, SCSS, Styled)로 분리되어 있으며, 공용으로 사용되는 세부 스타일 파일이 존재합니다.

`src/types/`

- 모든 컴포넌트에서 공용으로 사용하는 타입 정의 파일이 포함된 폴더입니다.
