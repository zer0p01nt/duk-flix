# <div align="center"> 프론트 1팀 클론코딩 레포지토리 </div>

## 개발 시작하기

```
git clone https://github.com/ds13th-front01/duk-flix.git
cd duk-flix
npm install
npm run dev
```


## 개발 관련 참고사항
- 브랜치 운영 방식 : `main <- feat`


## 역할 분담
<table align="center">
  <thead>
    <tr>
      <th>
        <a href="https://github.com/gogogo386">
          <img src="https://avatars.githubusercontent.com/u/165040142?v=4" width="200" />
        </a>
      </th>
            <th>
        <a href="https://github.com/yangyangeeee">
          <img src="https://avatars.githubusercontent.com/u/156039054?v=4" width="200" />
        </a>
      </th>
      <th>
        <a href="https://github.com/zer0p01nt">
          <img src="https://avatars.githubusercontent.com/u/189887138?v=4" width="200" />
        </a>
      </th>
            <th>
        <a href="https://github.com/2godong">
          <img src="https://avatars.githubusercontent.com/u/203046560?v=4" width="200" />
        </a>
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td align="center">고권혜</td>
      <td align="center">양서윤</td>
      <td align="center">백민영</td>
      <td align="center">이소라</td>
    </tr>
    <tr>
      <td align="center">
        <div>상세 페이지</div>
</td>
      <td align="center">
        <div>메인 페이지</div>
</td>
      <td align="center">
        <div>로그인, 회원가입, 첫화면</div>
        <div>배포 및 CI/CD</div>
      </td>
      <td align="center">
        <div>검색 페이지</div>
        <div>헤더 컴포넌트</div>
</td>
    </tr>
  </tbody>
</table>

 ## 기술 스택

<table align="center">
  <thead>
    <tr>
      <th>
        용도
      </th>
      <th>
        사용한 스택
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td align="center">사용 언어</td>
      <td align="center">
        <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"/>
      </td>
    </tr>
    <tr>
      <td align="center">라이브러리</td>
      <td align="center">
        <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white">
      </td>
    </tr>
    <tr>
      <td align="center">라우팅</td>
      <td align="center">
        <img src="https://img.shields.io/badge/reactrouter-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white">
      </td>
    </tr>
    <tr>
      <td align="center">번들링</td>
      <td align="center">
        <img src="https://img.shields.io/badge/vite-646CFF?style=for-the-badge&logo=vite&logoColor=white"/>
      </td>
    </tr>
    <tr>
      <td align="center">데이터 페칭</td>
      <td align="center">
        <img src="https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white"/> <img src="https://img.shields.io/badge/tanstack query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white"/>
      </td>
    </tr>
    <tr>
      <td align="center">스타일링</td>
      <td align="center">
        <img src="https://img.shields.io/badge/StyledComponents-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=white"/>
      </td>
    </tr>
    <tr>
      <td align="center">유틸리티</td>
      <td align="center">
        <img src="https://img.shields.io/badge/firebase-DD2C00?style=for-the-badge&logo=firebase&logoColor=white"/>
      </td>
    </tr>
    <tr>
      <td align="center">배포</td>
      <td align="center">
        <img src="https://img.shields.io/badge/vercel-000000?style=for-the-badge&logo=vercel&logoColor=white">
      </td>
    </tr>
    <tr>
      <td align="center">CI/CD</td>
      <td align="center">
        <img src="https://img.shields.io/badge/githubactions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white">
      </td>
    </tr>
  </tbody>
</table>


---

> ### 커밋 메세지 컨벤션
- 커밋의 시작은 아래의 목록을 참고하여 gitmoji & 커밋이름 삽입
- 커밋의 끝맺음은 "~ 기능 추가", "~ 작업", "~ 개발" 과 같이 명사로 통일
```
🎉 Init: 프로젝트 세팅
✨ Feat: 새로운 기능 추가
🐛 Fix: 버그 수정
🎨 Design: UI 스타일/디자인 수정
♻️ Refactor: 코드 리팩토링
✏️ Typo: 오타 수정,타입 수정
🚚 Rename: 폴더 구조 이동, 파일명 변경
🍱 Assets: 이미지, 폰트 등 리소스 추가/삭제
🔥 Del: 파일 삭제
📚 Docs: 문서 수정, 목데이터 작업 등
🔧 Chore: 설정파일 보완, 환경 설정
➕ Deps: 새로운 라이브러리 설치
➖ Deps: 불필요한 라이브러리 삭제
🔙 : 커밋 내용 복구
```
예시
```
✨ Feat: 메인페이지 개발
♻️ Refactor: 등록 플로우 - 글 작성 페이지 로직 정리
```


> ### 브랜치 전략
|태그이름|설명|
|--------|-------|
|main|실제 배포용 브랜치|
|develop|개발용 브랜치(기능 통합용)|
|feat/이슈번호/기능이름|새로운 기능 개발 시|
|refactor/이슈번호/기능이름|코드 리팩토링|
|fix/이슈번호/버그이름|버그 수정|
|design/이슈번호/요소|디자인 및 스타일 변경|
|chore/이슈번호/내용|설정, 의존성 등 기타 작업|

예시
```
feat/12/login-page  // 로그인 기능 개발
refactor/34/reduce-duplicated-code  // 코드 리팩토링
chore/56/update-eslint  // eslint 설정 수정
```
