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
<table>
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
