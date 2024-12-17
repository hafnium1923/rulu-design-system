# design-system

유명 디자인 시스템 코드를 이해하기 어려워서 만드는 쉬운 컴포넌트  
emotion, styled-components, scss 버전의 공용 컴포넌트

# 목차

1. [폴더 구조](#폴더-구조)  
   1-1.[주요 디렉토리 설명](#주요-디렉토리-설명)
2. [실행 방법](#실행-방법)

# 폴더 구조 [↑](#목차)

```plaintext
design-system/
├─ src/
│ ├─ components/
│ │ ├─ common/          # 스타일링 방법과 관계없는 공통 컴포넌트 폴더
│ │ ├─ button/          # Button 컴포넌트
│ │ │ ├─ buttonEmotion/ # Emotion으로 구현된 컴포넌트
│ │ │ ├─ buttonSCSS/    # SCSS로 구현된 컴포넌트
│ │ │ ├─ buttonStyled/  # Styled-components로 구현된 컴포넌트
│ │ │ ├─ ...ts          # 해당 컴포넌트에서 공용으로 사용하는 로직 훅 들
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

- 모든 컴포넌트를 관리하는 폴더입니다.
- 하위의 `common`폴더는 스타일링 관계없이 사용가능한 공통 컴포넌트가 있습니다.
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

# 실행 방법 [↑](#목차)

스토리북 실행방법

```bash
npm run storybook
# or
yarn storybook
```

# 컴포넌트 설명

자세한 사용법과 props 설명은 JSDocs와 Storybook을 참고해주세요.

|                   |                     |
| ----------------- | ------------------- |
| [Badge](#Badge)   | [Divider](#Divider) |
| [Drawer](#Drawer) | [Switch](#Switch)   |
| [Menu](#Menu)     | [Table](#Table)     |
| [SVG](#SVG)       | [Tooltip](#Tooltip) |
| [Modal](#Modal)   |                     |

<table>
  <thead>
    <tr>
      <th>컴포넌트</th>
      <th>기능</th>
      <th>설명</th>
    </tr>
  </thead>
  <tbody>
  <tr>
      <td id="Badge" rowspan="2">Badge<a href="#컴포넌트-설명">↑</a></td>
      <td>기본뱃지</td>
      <td>
        <input type="checkbox" checked disabled> 색상 커스텀<br>
        <input type="checkbox" checked disabled> 보여짐 여부 상태관리<br>
        <input type="checkbox" checked disabled> 오버랩 지원 (원형기준 / 사각기준)<br>
        <input type="checkbox" checked disabled> 뱃지위치(상/하/좌/우)<br>
        <input type="checkbox" checked disabled> 점 형태 지원(dot)
      </td>
    </tr>
    <tr>
      <td>숫자뱃지</td>
      <td>
        <input type="checkbox" checked disabled> 표시할 숫자<br>
        <input type="checkbox" checked disabled> 최대 숫자제한<br>
        <input type="checkbox" checked disabled> 숫자가 0일 때 뱃지 표시 여부 (기본값: 표시X)
      </td>
    </tr>
   <tr>
      <td id="Divider" rowspan="5">Divider<a href="#컴포넌트-설명">↑</a></td>
      <td>길이 형태 (위치)</td>
      <td>
        <input type="checkbox" checked disabled> 전체 길이<br>
        <input type="checkbox" checked disabled> 뒤에만 있는 선<br>
        <input type="checkbox" checked disabled> 앞에만 있는 선<br>
        <input type="checkbox" checked disabled> 가운데만 있는 선
      </td>
    </tr>
    <tr>
      <td>수직, 수평</td>
      <td><input type="checkbox" checked disabled> 기본 값은 수평</td>
    </tr>
    <tr>
      <td>자식 컴포넌트를 이용한 렌더링</td>
      <td>
        <input type="checkbox" checked disabled> 자식 없음<br>
        <input type="checkbox" checked disabled> 텍스트 자식일 때<br>
        <input type="checkbox" checked disabled> 컴포넌트 자식일 때
      </td>
    </tr>
    <tr>
      <td>자식 위치</td>
      <td>
        <input type="checkbox" checked disabled> 왼쪽 위치 (수직일 때는 위로)<br>
        <input type="checkbox" checked disabled> 가운데 위치<br>
        <input type="checkbox" checked disabled> 오른쪽 위치 (수직일 때는 아래로)
      </td>
    </tr>
    <tr>
      <td>List 안에 배치</td>
      <td><input type="checkbox" checked disabled> li 태그로 감싸 return</td>
    </tr>
    <tr>
      <td id="Drawer"rowspan="7">Drawer<a href="#컴포넌트-설명">↑</a></td>
      <td>열리는 방향</td>
      <td>
        <input type="checkbox" checked disabled> Top<br>
        <input type="checkbox" checked disabled> Bottom<br>
        <input type="checkbox" checked disabled> Left<br>
        <input type="checkbox" checked disabled> Right
      </td>
    </tr>
    <tr>
      <td>Scrim 유무</td>
      <td>
        <input type="checkbox" checked disabled> 있음<br>
        <input type="checkbox" checked disabled> 없음
      </td>
    </tr>
    <tr>
      <td>백그라운드 컨트롤</td>
      <td>
        <input type="checkbox" checked disabled> 클릭 시 닫힘<br>
        <input type="checkbox" checked disabled> 클릭해도 안 닫힘
      </td>
    </tr>
    <tr>
      <td>키보드 컨트롤</td>
      <td><input type="checkbox" checked disabled> ESC 컨트롤 유무</td>
    </tr>
    <tr>
      <td>영역 차지</td>
      <td>
        <input type="checkbox" checked disabled> 인라인 (바디 안에 영역 차지)<br>
        <input type="checkbox" checked disabled> 아웃라인 (바디 위에 영역 차지)
      </td>
    </tr>
    <tr>
      <td>드로워 손잡이</td>
      <td><input type="checkbox" checked disabled> size만큼 열리는 방향에 맞는 방향쪽에 드로워 보임</td>
    </tr>
    <tr>
      <td>못닫게 하기</td>
      <td><input type="checkbox" checked disabled> 닫는 버튼 없는 Drawer</td>
    </tr>
     <tr>
      <td id="Menu" rowspan="9">Menu<a href="#컴포넌트-설명">↑</a></td>
      <td>메뉴 버튼</td>
      <td>
        <input type="checkbox" checked disabled> 클릭으로 열고 닫음<br>
        <input type="checkbox" checked disabled> 열려있을 때 클릭 시 메뉴 닫힘<br>
        <input type="checkbox" checked disabled> children 타입에 따른 스타일 적용
      </td>
    </tr>
    <tr>
      <td>메뉴 리스트 (ol)</td>
      <td>
        <input type="checkbox" checked disabled> 메뉴의 열고 닫히는 상태를 관리<br>
        <input type="checkbox" checked disabled> 클릭된 메뉴 아이템을 포커스<br>
        <input type="checkbox" checked disabled> 키보드 액션과 관련된 상태 관리<br>
      </td>
    </tr>
    <tr>
     <td>열리는 포지션</td>
      <td>
        <input type="checkbox" checked disabled> Left (direction 수직 : 위)<br>
        <input type="checkbox" checked disabled> Right (direction 수직 :아래)
      </td>
    </tr>
     <tr>
     <td>열리는 방향</td>
      <td>
        <input type="checkbox" checked disabled> Top<br>
        <input type="checkbox" checked disabled> Bottom<br>
        <input type="checkbox" checked disabled> Left<br>
        <input type="checkbox" checked disabled> Right
      </td>
    </tr>
    <tr>
      <td>선택한 메뉴 기억</td>
      <td>
        <input type="checkbox" checked disabled> true: 클릭된 메뉴 아이템을 포커스<br>
        <input type="checkbox" checked disabled> true: 선택된 메뉴 옆에 체크 버튼<br>
        <input type="checkbox" checked disabled> false: 항상 최상위 아이템 포커스<br>
        <input type="checkbox" checked disabled> false: 선택된 메뉴 옆에 체크 버튼 없음
      </td>
    </tr>
    <tr>
      <td>메뉴 리스트 키보드 컨트롤</td>
      <td>
        <input type="checkbox" checked disabled> 상하 키보드를 통해 메뉴 아이템 변경<br>
        <input type="checkbox" checked disabled> ESC 버튼을 통해 메뉴 닫기<br>
        <input type="checkbox" checked disabled> Enter 버튼을 통해 메뉴 아이템 선택<br>
        <input type="checkbox" checked disabled> 키보드 컨트롤 사용하지 않음
      </td>
    </tr>
    <tr>
      <td>메뉴 리스트 백그라운드 컨트롤</td>
      <td>
        <input type="checkbox" checked disabled> true: 외부 영역 클릭 시 메뉴가 바로 닫힘<br>
        <input type="checkbox" checked disabled> false: 외부 영역 클릭 시 메뉴가 닫히지 않음
      </td>
    </tr>
    <tr>
      <td>메뉴 그룹 (ol)</td>
      <td>
        <input type="checkbox" checked disabled> 타이틀 표시<br>
        <input type="checkbox" checked disabled> 하위 컴포넌트 일정한 들여쓰기<br>
        <input type="checkbox" checked disabled> 스타일 커스텀
      </td>
    </tr>
    <tr>
      <td>메뉴 아이템 (li)</td>
      <td>
        <input type="checkbox" checked disabled> 메뉴 아이템 스타일 커스텀<br>
        <input type="checkbox" checked disabled> 컴포넌트로 전달했을 때 메뉴 기본 스타일 적용하지 않음<br>
        <input type="checkbox" checked disabled> string으로 전달했을 때 메뉴 기본 스타일 적용
      </td>
    </tr>
    <tr>
      <td id="SVG" rowspan="2">SVG<a href="#컴포넌트-설명">↑</a></td>
      <td>기본기능</td>
      <td>
        <input type="checkbox" checked disabled> 크기 조절<br>
        <input type="checkbox" checked disabled> 이름만으로 SVG 렌더링
      </td>
    </tr>
    <tr>
      <td>커스텀 스타일 적용</td>
      <td>
        <input type="checkbox" checked disabled> 배경색 커스텀<br>
        <input type="checkbox" checked disabled> 색상 커스텀
      </td>
    </tr>
     <tr>
      <td id="Modal" rowspan="5">Modal<a href="#컴포넌트-설명">↑</a></td>
      <td>모달 상태 관리</td>
      <td>
        <input type="checkbox" checked disabled> 모달 오픈 상태 관리<br>
        <input type="checkbox" checked disabled> 모달 포털링 (Portal)<br>
        <input type="checkbox" checked disabled> 모달 내용 렌더링<br>
        <input type="checkbox" checked disabled> 모달 오픈 함수 제공<br>
        <input type="checkbox" checked disabled> 모달 클로즈 함수 제공<br>
        <input type="checkbox" checked disabled> 모달 온/오프 상태 값 제공<br>
        <input type="checkbox" checked disabled> 모달 백그라운드 제공
      </td>
    </tr>
    <tr>
      <td>스크롤 제한</td>
      <td>
        <input type="checkbox" checked disabled> 배경 스크롤 방지(true)<br>
        <input type="checkbox" checked disabled> 외부 스크롤 가능(false)<br>
        <input type="checkbox" checked disabled> 모달 바디 내 내부 영역 크기 설정
      </td>
    </tr>
    <tr>
      <td>키보드 컨트롤</td>
      <td>
        <input type="checkbox" checked disabled> ESC 키로 모달 닫기<br>
        <input type="checkbox" checked disabled> 포커스 트랩 (모달 내부에서만 탭 이동)<br>
        <input type="checkbox" checked disabled> 단일 버튼일 시 Enter 키 활성화
      </td>
    </tr>
    <tr>
      <td>컨펌 모달</td>
      <td>
        <input type="checkbox" checked disabled> >: focus가 없을 경우 왼쪽 첫 버튼 focus<br>
        <input type="checkbox" checked disabled> <: focus가 없을 경우 오른쪽 첫 버튼 focus
      </td>
    </tr>
    <tr>
      <td>스타일링</td>
      <td>
        <input type="checkbox" checked disabled> 크기 조절 가능 (sm, md, lg, full)<br>
        <input type="checkbox" checked disabled> 위치 설정 (center, top, bottom)<br>
        <input type="checkbox" checked disabled> 애니메이션 지원
      </td>
    </tr>
     <tr>
      <td id="Switch" rowspan="3">Switch<a href="#컴포넌트-설명">↑</a></td>
      <td>상태</td>
      <td>
        <input type="checkbox" checked disabled> 토글 on/off 상태 관리(필수 값)<br>
        <input type="checkbox" checked disabled> 상태 값 변경 onChange 이벤트 핸들링<br>
        <input type="checkbox" checked disabled> 상태 값 변경 디바운스 처리
      </td>
    </tr>
    <tr>
      <td>스타일링</td>
      <td>
        <input type="checkbox" checked disabled> 외부 스타일 props로 스타일링 적용<br>
        <input type="checkbox" checked disabled> onColor/offColor 적용<br>
        <input type="checkbox" checked disabled> 기본 트랙 색상: 블랙<br>
        <input type="checkbox" checked disabled> thumbOnColor/thumbOffColor 설정
      </td>
    </tr>
    <tr>
      <td>크기(size)</td>
      <td>
        <input type="checkbox" checked disabled> XS, S, M, L<br>
        <input type="checkbox" checked disabled> 기본 값: M
      </td>
    </tr>
    <tr>
      <td id="Table" rowspan="2">Table<a href="#컴포넌트-설명">↑</a></td>
      <td>기본기능</td>
      <td>
        <input type="checkbox" checked disabled> 기본 테이블 구조 (thead, tbody, tfoot)<br>
        <input type="checkbox" checked disabled> 컬럼 헤더 구현<br>
        <input type="checkbox" checked disabled> 헤더 고정 on/off<br>
        <input type="checkbox" checked disabled> 로우(행) 데이터 표시<br>
        <input type="checkbox" checked disabled> 반응형 테이블 레이아웃 지원
      </td>
    </tr>
    <tr>
      <td>스타일링</td>
      <td>
        <input type="checkbox" checked disabled> 테이블 사이즈 (sm/md/lg/full)<br>
        <input type="checkbox" checked disabled> 호버 효과<br>
        <input type="checkbox" checked disabled> 선택된 행 스타일<br>
        <input type="checkbox" checked disabled> 커스텀 스타일 적용
      </td>
    </tr>
    <tr>
      <td id="Tooltip" rowspan="3">Tooltip<a href="#컴포넌트-설명">↑</a></td>
      <td>값</td>
      <td>
        <input type="checkbox" checked disabled> 툴팁의 기준이 되는 컴포넌트를 children으로 전달<br>
        <input type="checkbox" checked disabled> label: 툴팁 내부 값(컴포넌트, 텍스트 등)
      </td>
    </tr>
    <tr>
      <td>스타일링</td>
      <td>
        <input type="checkbox" checked disabled> color: 툴팁 배경 색상<br>
        <input type="checkbox" checked disabled> 기본 색상: 블랙<br>
        <input type="checkbox" checked disabled> 외부 스타일 props로 스타일링
      </td>
    </tr>
    <tr>
      <td>위치(position)</td>
      <td>
        <input type="checkbox" checked disabled> 기준 컴포넌트로부터 상/하/좌/우 위치 설정<br>
        <input type="checkbox" checked disabled> 12가지 위치 옵션 제공
      </td>
    </tr> 
  </tbody>
</table>
