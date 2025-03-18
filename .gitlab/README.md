
## Branch

### Branch 만드는 법

**dev-fe 또는 dev-be에서 브랜치 생성할 것!**

1. `git branch [브랜치 유형]/[Jira 티켓 번호]` 
`git checkout feat/[지라 이슈번호]`
또는 
**`git checkout -b [브랜치 유형]/[Jira 티켓 번호]`**
    
    
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
    1. `git add .` (현재 디렉토리 아래의 모든 변경사항)
    2. `git commit -m "커밋 컨벤션"`
    3. `git push -u origin feat/[지라 이슈번호]` 
        
        첫 push 이후에는 git push만 해도 됨 (`-u origin feat...` 이게 default를 origin feature....를 고정시킴)
        

### **예시**

```
git branch feat/S12P21D109-79
git checkout feat/S12P21D109-79
또는
git checkout -b feat/S12P21D109-79
```

```
git add .
```

```
git commit -m "feat/S12P21D109-79 : git 컨벤션 템플릿 생성"
```

```
git push origin feat/S12P21D109
```

**기능 추가 작업이 완료되었다면 feature 브랜치는 develop 브랜치로 merge하기**

브랜치 이름은 반드시 다음과 같이 `브랜치 유형/Jira 티켓 번호`를 따른다. Jira 티켓 번호를 잘못 기입하면 해당 티켓과 연동이 되지 않기 때문에, 브랜치 생성 전 이를 반드시 확인하도록 한다. 예를 들어, `GETP-72`에 대한 기능을 개발한다고 가정하면 `feat/GETP-72` 로 브랜치를 생성하도록 한다.

## Commit

### 템플릿

```
[브랜치명]/[Jira 티켓 번호 끝에 두자리만] : commit 내역 설명
```

### **예시**

```
feat/#71 : 임차인 Navbar 기본 틀 구현
fix/#99 : 오타 수정
```

## **Merge Request**

### **제목**

```
[Part/Type] MR 제목
```

### 예시

```
[FE/feat] 임차인 메인화면
```

### **본문**

```
⚠️ 관련 Jira 티켓 번호
[상태 유형] [지라 티켓 번호]

📋 작업 내용

- 작업 내용을 작성해주세요. (커밋 내역)
- 작업 내용을 작성해주세요.
- 작업 내용을 작성해주세요.
```

### 예시

```
⚠️ 관련 Jira 티켓 번호
resolve S12P21D109-71

📋 작업 내용

- 임차인 Navbar
- 임차인 대시보드 버튼
- 임차인 대시보드 공지사항
```

| **상태 유형** | **설명** |
| --- | --- |
| resolve | 이슈를 해결한 경우 |
| ref | 참조할 이슈가 있을 때 사용 |
| fixes | 이슈 수정 중 (아직 해결되지 않은 경우) |
| related to | 해당 커밋과 관련된 이슈 번호 (아직 해결되지 않은 경우) |