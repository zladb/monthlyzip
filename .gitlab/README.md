## 기능 개발 흐름 예시

**프론트는 dev-fe, 백은 dev-be에서 브랜치 생성할 것!** <br>
0. 작업 중인 내용이 있다면 임시 저장 <br>
`git stash` <br>

1. dev-fe 최신화 <br>
`git checkout dev-fe` <br>
`git pull origin dev-fe` <br>

2. Jira 티켓 번호로 브랜치 생성 (작업 중인 내용이 있었으면 다시 불러오기) <br>
`git checkout -b init/S12P21D109-81` <br>
(`git stash pop`) <br>
 
3. 작업 후 커밋 <br>
`git add .` <br>
`git commit -m "init: MR 템플릿 생성성"` <br>

4. 원격에 푸시 <br>
`git push origin init/S12P21D109-81` <br>

**기능 추가 작업이 완료되었다면 프론트는 dev-fe, 백은 dev-be에 MR + merge 하기!** <br>



## Branch

**프론트는 dev-fe, 백은 dev-be에서 브랜치 생성할 것!** <br>
```
git branch [브랜치 유형]/[Jira 티켓 번호] 
git checkout [브랜치 유형]/[Jira 티켓 번호]
```

또는 

```
git checkout -b [브랜치 유형]/[Jira 티켓 번호]
```

| 브랜치 유형 | **설명** |
| --- | --- |
| feat | 새로운 기능 추가 |
| fix | 버그 및 오타 수정 |
| refactor | 코드 리팩토링 |
| design | CSS 등 사용자 UI 디자인 변경 |
| comment | 필요한 주석 추가 및 변경 |
| style | 코드 포맷팅 |
| test | 테스트 코드 추가, 수정, 삭제 |
| chore | 기타 변경사항(빌드 스크립트, 패키지 매니저 수정 등) |
| init | 프로젝트 초기 생성 |
| rename | 파일 혹은 폴더명을 수정하거나 옮기는 경우 |
| remove | 파일 삭제만 하는 경우 |
| docs | 문서를 작성한 경우 |

### **예시**

```
git branch feat/S12P21D109-79
git checkout feat/S12P21D109-79
```

또는

```
git checkout -b feat/S12P21D109-79
```



## Commit

### 템플릿

```
[브랜치명] : commit 내역 설명
```

### 예시

```
feat/S12P21D109-79 : 임차인 Navbar 기본 틀 구현
fix/S12P21D109-99 : 오타 수정
```



## Merge Request
**Merge할 브랜치 선택하기!!** <br>

### 제목

```
[Part/Type] MR 제목
```

### 본문

```
## 📋 작업 내용

- [커밋 내역]
- [커밋 내역]

## ⚠️ Jira 이슈 완료 처리
```

### 예시

```
[FE/feat] 임차인 메인화면

📋 작업 내용

- 임차인 Navbar 기본 틀 구현
- 임차인 대시보드 버튼
- 임차인 대시보드 공지사항

⚠️ Jira 이슈 완료 처리
Closes S12P21D109-71
```