# ⚽ **SoccerKick**
> Football-Community-Website (축구 커뮤니티 사이트 )


![image](https://user-images.githubusercontent.com/33863016/145717747-096571a9-044f-4d30-bf2c-888eaeb7a5ce.png)

### 기간 : `2021-09-29 ~ 2021-10-15`

### 팀원 및 역할

[`윤석훈`](https://github.com/imysh578) : 구단 생성/관리, 마이페이지 구현<br/>
[`선영규`](https://github.com/bukgyu) : 로그인/회원가입 구현, DB연동 <br/>
[`이상민`](https://github.com/LeessangMin) : 서버 배포, DB연동, 용병 게시판 구현<br/>
[`제갈동훈`](https://github.com/GariJK) : 구장 찾기, 경기 매칭 게시판 구현 <br/>



***


# 목차
[1. 개요](#개요)

[2. 목적](#목적)

[3. 사용한 기술](#사용한-기술)

[4. 주요 기능](#주요-기능)

[5. 상세 설명](#상세-설명)

[6. 발생한 이슈 & 해결 방법](#발생한-이슈--해결-방법)


***

## 개요📒

- 국내 축구 커뮤니티 대부분이 사용하기 복잡하고 불편함을 해소하기 위한 웹사이트 개발
- 구단 생성 및 구단 간 경기 매칭 등의 기능을 토대로 높은 편의성을 가진 웹사이트 

***

## 목적🎯

#### (1) 배경
축구 경기 시 필요한 인원을 모으기 힘듦
일반인이 소속팀을 갖기 어려움
경기 매칭 시스템 기능이 있는 축구 커뮤니티의 부재

#### (2) 주요 고객
축구를 하고싶은 지역주민
소속팀을 갖고 싶은 일반인

#### (3) 개발 목표
사용자에게 높은 접근성과 편의성을 제공
축구 커뮤니티 및 매칭 기능 제공

***

## 사용한 기술🛠
- 웹 화면 구성 : `HTML` `CSS`
- 템플릿 엔진 : `nunjucks`
- DBMS : `MySQL`
- 개발 Tool : `Visual Studio Code` `github`
- AWS 배포 : `EC2` `RDS`
- 로그인 구현 : `JavaScript`
- 프레임워크 : `NodeJs` 
- 프로젝트 관리 Tool : `Google Drive` `GitHub` 

***

## 주요 기능⚙
  - 회원가입/로그인
  - 구단 생성/가입
  - 내 소속 구단 관리
  - 구단 가입 신청 및 가입 수락 기능
  - 구장 찾기(Kakao map API 활용)
  - 구단 게시판
  - 용병 게시판
  - 경기 매칭 기능(구현 중)

***

## 상세 설명🧾
### 페이지 미리보기
| 페이지 | 화면 | 설명 |
| --- | --- | --- |
| **메인페이지** |  ![mainpage](https://user-images.githubusercontent.com/33863016/144067412-c8291256-5488-49e2-8480-5ba71cbaccad.gif)| 축구 하이라이트 유튜브 영상을 띄움 |
| **로그인/회원가입** | ![loginpage](https://user-images.githubusercontent.com/33863016/144067454-e5f88293-4bf7-48d0-baca-533810b8a924.gif)| 한 페이지에서 버튼을 클릭하여 로그인/회원가입으로 전환 |
| **마이페이지** |![myPage](https://user-images.githubusercontent.com/33863016/144178069-978ac5a5-3fce-4bf4-9cb2-dafa8bdb4dd8.gif) | 회원 정보 수정이 가능하며 왼쪽 상단에는 소속 구단 마크가 보여진다. |
| **구단 가입** | ![team_join](https://user-images.githubusercontent.com/33863016/144068634-c62fbeb2-ddf8-44e7-98d9-c11953529165.gif)| 로그인 후 구단 가입 신청이 가능하다 |
| **구단 생성** | ![team_create](https://user-images.githubusercontent.com/33863016/144079159-a9141382-ebe9-4aca-a1bc-30ecfa0a9593.gif)| 로그인 후 구단 생성하여 구단주가 될 수 있다. 팀로고를 추가하여 나만의 구단을 완성하자! |
| **구단 관리** | ![team_edit](https://user-images.githubusercontent.com/33863016/144080411-00589972-c892-4276-8d82-2728ff5ebbf6.gif)| 소속 팀원 리스트를 확인 할 수 있으며, 구단주만 구단 정보를 수정할 수 있다. |
| **가입 신청 목록** | ![team_join_approve](https://user-images.githubusercontent.com/33863016/144082358-4a897386-198c-4591-ad6b-809edf0e43d2.gif) | 구단주만 가입 신청 목록을 확인할 수 있으며, 승인 및 거절 권한이 있다. |
| **구단 게시판** | ![team_community](https://user-images.githubusercontent.com/33863016/144084171-62fdffe7-c1d5-41fa-ba94-d40b82c8f66d.gif) | 구단에 가입하면, 소속 구단 게시판에 글 작성 및 수정할 수 있는 권한이 주어진다. |
| **용병 게시판** | ![mercenary_boards](https://user-images.githubusercontent.com/33863016/144086035-d0b7a7b2-196b-4dd6-90d9-261aefe7dd0d.gif) | 용병 게시판에는 '구해요', '할래요' 게시판으로 나뉘며 버튼을 통해 전환된다. |
| **한판떠요 게시판** | ![image](https://user-images.githubusercontent.com/33863016/144086734-d206a839-538b-46ee-94ec-6072b00f34f1.png) `구현 중` | 한판 떠요 게시판으로 구단 간 경기 매칭을 잡을 수 있다. 구단주만이 글을 남길 수 있다. |
| **구장 찾기** | ![playground_map](https://user-images.githubusercontent.com/33863016/144088132-054ebf09-c7ab-4319-9f97-d9b6b8d57bbe.gif) | 추천 구장을 지도에서 클릭하여 정보를 확인할 수 있다. 또한, 키워드 검색을 통해 해당 지역 구장을 검색할 수 있다. |
| **통합 검색** |![search](https://user-images.githubusercontent.com/33863016/144207860-036953bf-d9b7-4b4d-ae79-83bd60d33f56.gif) | 상단에 위치한 통합검색 창으로 구단 검색 및 모든 게시판 검색이 가능하다. 빈칸으로 검색 시 모든 내용이 출력된다. |
  

### DB 테이블 관계도
| EER diagram | 설명 |
| --- | --- |
| ![image](https://user-images.githubusercontent.com/33863016/144186995-dd247826-44dc-40ac-bc56-047a9cdb4e16.png) | users 테이블과 teams 테이블을 중심으로 게시판 테이블을 구성했으며, 원하는 데이터를 빠르게 검색할 수 있도록 관계 사이에 테이블(usersinteams, wannaJoins) 을 하나 더 추가하였다. |



***

## 발생한 이슈 & 해결 방법🤬

### "유저 로그인 시 보안성 문제"

- [상황]  
유저 로그인 정보를 쿠키에 저장하면서 보안성 문제가 발생함.  

- [문제]  
처음 코드를 짰을 때 보안성에 크게 생각을 하지 않고 단순하게 쿠키로 로그인 유지를 실현했다.  
그러나 우리가 배포를 했을 때를 생각하고 만들다 보니 로그인 보안의 문제점이 취약하다는 것을 깨달았다.  
보안성의 문제를 해결하고 나니 로그인 유지가 되지 않는 문제점이 다시 발생이 되었다.

- [해결]  
각 미들웨어 별로 로그인 관련되어 필요한 코드들을 만들었고 로그인 쿠키가 있을시  
다음 페이지로 넘어갈수 있게 만들고 쿠키가 없을시 로그인 페이지로 넘어가게 만들었다.  
각 코드별로 exports 해서 각각의 미들웨어에 코드를 사용했다.  

- **[/public/loginCheck.js](https://github.com/imysh578/SoccerKick/blob/main/public/loginCheck.js)**
```
exports.logined = (req, res, next) => {
  // 로그인 검증
  const cookie = req.cookies.user;
  if (cookie == undefined) {
    // 로그인이 안돼있으면 아래 코드 실행
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.write("<script>alert('로그인 후 이용해주세요!')</script>");
    res.write("<script>window.location='/user/login'</script>");
    res.end();
  } else {
    //
    next(); // 로그인이 돼있으면 다음 미들웨어로 넘어가
  }
};

exports.notLogined = async (req, res, next) => {
  // 로그인 검증
  const cookie = req.cookies.user;
  if (cookie == undefined) {
    next(); //  로그인이 안돼있으면 다음 미들웨어로 넘어가
  } else {
    // 로그인이 돼있으면 아래 코드 실행
    res.redirect("/");
  }
};

...
```  
  
### "모든 페이지에 공통으로 사용되는 컴포넌트 관리 문제"
- [상황]  
모든 페이지에는 헤더, 푸터 같이 공통으로 사용되는 컴포넌트가 있는데 수정 사항이 생김. 

- [문제]  
페이지 마다 일일이 수정을 하게 되는데, 실수로 누락하면서 적용이 안되는 페이지가 발생함.

- [해결]  
Template Engine 중 하나인 `Nunjucks`를 활용하여 헤더, 푸터, 스타일 관련 html을 따로 관리하여 유지보수가 간편하게 만듦.  
layout 폴더에 공통 컴포넌트를 따로 관리 했으며, 필요한 페이지에 `Nunjucks`를 이용하여 삽입함.  
![image](https://user-images.githubusercontent.com/33863016/144210251-e4170ec8-2d89-40db-9d12-041e60349860.png)

- **[/views/team_board.html](https://github.com/imysh578/SoccerKick/blob/main/views/team_board.html)**
```
...

<body class="wrapper">
    // 넌적스를 이용하여 헤더 파일을 삽입
    {% include "./layout/header.html" %}
    <main class="site-content">
      <div class="forum-index">
      
...
```
  
### "이용자 소속 구단에 따른 메뉴 내용 변경하기"
- [상황]  
로그인된 사용자의 소속 구단에 따라 다른 게시판을 보여줘야 함

- [문제]  
로그인 정보를 다른 페이지에 전달이 안되는 문제가 발생

- [해결]  
`loginCheck` 미들웨어에서 로그인 상태 뿐만 아니라 로그인 정보도 보내도록 코드를 추가함.  
`res.locals` 를 이용해서 미들웨어 간 데이터를 전달함.


- **[/public/loginCheck.js](https://github.com/imysh578/SoccerKick/blob/main/public/loginCheck.js)**
```
...

// 필요한 데이터를 res.locals.[변수명] = [값] 형태로 보내기
// 이 미들웨어는 '/'에서 불러오기 때문에 모든 페이지에서 다 사용 가능함
exports.loginDataParser = async (req, res, next) => {
  const cookie = req.cookies.user;
  if (cookie != undefined) {
    const user = await User.findOne({
      where: {
        user_id: req.cookies.user.user_id,
      },
    });
    res.cookie("user", user, {
      maxAge: 60 * 60 * 1000 * 24,
      httpOnly: true, //
      path: "/",
    });
    res.locals.login = req.cookies.user.user_id;

    // 팀이 있으면 req.locals에 아래 항목들 추가
    const team = req.cookies.user.user_team;
    if (team) {
      const team_info = await Team.findOne({
        where: {
          team_name: req.cookies.user.user_team,
        },
      });
      if (team_info) {
        res.locals.team_logo = team_info.dataValues.logo_filename;
        res.locals.team_leaderId = team_info.dataValues.team_leaderId;
      }
      res.locals.teamName = team;
    }
  }
  next();
};
```
  


### "DB 테이블 관계 설정"
- [상황]  
프로젝트를 진행하면서 각각의 테이블에 초기에 구상한 것보다 더 많은 정보가 들어가게 됨.

- [문제]  
테이블 column이 늘어나면서 오히려 관계도가 복잡해짐.  
데이터량이 방대해지면 데이터 검색이 저하될 문제가 우려됨.  

- [해결]  
연관이 있는 테이블 사이에 또 하나의 테이블을 만듦.  
데이터 검색을 할 때는 해당 테이블만 검색하여 검색 속도에 영향을 최소화 함.  
ex) user 테이블에도 소속 구단 컬럼이 있지만, `usersInTeam` 테이블을 하나 더 생성하여 구단 내 선수 검색할 때 빠른 검색이 가능하도록 함.
![image](https://user-images.githubusercontent.com/33863016/144227199-be3cd16a-c96e-4beb-9a44-1216a9530e7f.png)  


  
### "MySQL과 RDS 연동 문제"  

- [상황]  
개발단계와 배포단계에서 AWS MySQL RDS DB 연결이 되지 않음  
배포단계의 서버 또한 같은 상황

- [문제]  
보안그룹의 인바운드 규칙에 맞지 않는 접근이라 연결되지 않았음

- [해결]  
정확한 해결법은 알지 못하였으나 어차피 RDS에 접근할 때
RDS DB를 생성할 때 받은 엔드포인트와 username, password가 필요하기에 보안에 문제는 없을거라 판단하여
![image](https://user-images.githubusercontent.com/90792916/144182789-84bcb003-33dd-450a-a864-a7fe2c6a6d1f.png)  
인바운드 규칙을 모든 트래픽에 아무나 접근할 수 있도록 0.0.0.0/0 으로 지정해주었다.  


### "AWS 배포"
- [상황]  
배포단계에서 AWS 서버 연결 후 외부에서 도메인으로 접속 시 메인 페이지가 정상적으로 출력되지 않음

- [문제]  
AWS 윈도우 서버 내에서 express를 실행시키고 있지 않았음

- [해결]  
![image](https://user-images.githubusercontent.com/90792916/144185551-e843480b-8bd7-4ffa-88f1-d8b6da8a7b7a.png)  
윈도우 서버에서도 내 컴퓨터에서 로컬호스트 돌리 듯 똑같이 로컬로 포트를 열어주고  
외부 컴퓨터로 AWS에서 받은 퍼블릭도메인 주소에 접속 시 localhost에 접속하는 것 처럼 연결이 됨



***
<!-- 
## 프로젝트를  깨달은 점 

깨달은 점...

깨달은것　어렵다  
가슴　　　시립다  
탈주　　　마렵다  
집이　　　그립다  
몸이　　　가렵다  
라임　　　지렸다  
플로우　　구렸다  
　　　　　　　다 다 다 다 다다다 다다다  
　　　　　　　다 다 다 다 또 물보라를 일으켜  


이 세상엔 천재가 많다  
나는 똥멍청이다  
겨울은 춥다  

MySQL의 DB 구성을 미리 확실하게 해두고 가야 더 좋았을 것 같다.  
작업 중에 계속해서 DB 테이블에 새로이 넣어야 할 것이 추가되다 보니  
테이블을 계속 갈아엎고 새로 만들고 하게 되어 불필요한 과정을 여러번 하게 되었다.  



## 배포 활용(EC2, RDS, MySQL) 

배포에 관한 설명... -->









