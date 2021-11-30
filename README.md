# ⚽ **SoccerKick**
> Football-Community-Website (축구 커뮤니티 사이트 )

### 기간 : `2021-09-29 ~ 2021-10-15`

### 팀원

`윤석훈` : [Github](https://github.com/imysh578) <br/>
`선영규` : [Github](https://github.com/bukgyu) <br/>
`이상민` : [Github](https://github.com/LeessangMin) <br/>
`제갈동훈`: [Github](https://github.com/GariJK) <br/>



***


# 목차
[1. 개요](##개요)

[2. 목적](##-🎯-개발-목적)

[3. 사용한 기술](##-🛠-사용한-기술)

[4. 주요 기능](##-⚙-주요-기능)

[5. 상세 설명](##-🧾-상세-설명)

[6. 발생한 이슈 & 해결 방법](##-🤬-발생한-이슈-&-해결-방법)


***

## 📒 개요

- 국내 축구 커뮤니티의 기능의 한계: 경기 매칭을 하려면 직접 연락처를 남기고 연락해야 한다.
- 구단 생성 및 구단 간 경기 매칭 기능 구현
- 구단별, 개인별 전적 검색 기능 구현

<br/>
## 🎯 개발 목적

(1) 배경
축구 경기 시 필요한 인원을 모으기 힘듦
일반인이 소속팀을 갖기 어려움
경기 매칭 시스템 기능이 있는 축구 커뮤니티의 부재

(2) 주요 고객
축구를 하고싶은 지역주민
소속팀을 갖고 싶은 일반인

(3) 개발 목표
사용자에게 높은 접근성과 편의성을 제공
축구 커뮤니티 및 매칭 기능 제공

<br/>
## 🛠 사용한 기술 
- 웹 화면 구성 : `HTML` `CSS`
- 템플릿 엔진 : `nunjucks`
- DBMS : `MySQL`
- 개발 Tool : `Visual Studio Code` `github`
- AWS 배포 : `EC2` `RDS`
- 로그인 구현 : `JavaScript`
- 프레임워크 : `NodeJs` 
- 프로젝트 관리 Tool : `Google Drive` `GitHub` 

<br/>
## ⚙ 주요 기능 
  - 회원가입/로그인
  - 구단 생성/가입
  - 내 소속 구단 관리(구단주만) 
  - 구단 가입 신청 및 가입 수락 기능
  - 경기 매칭 기능
  - 구장 찾기(Google map 연동)
  - 구단 게시판
  - 용병 게시판

<br/>
## 🧾 상세 설명
### 페이지 미리보기
| 페이지 | 화면 | 페이지 설명 |
| --- | --- | --- |
| `메인페이지` | `이미지` | 축구 하이라이트 유튜브 영상을 띄움 |
| `로그인/회원가입` | `이미지` | 한 페이지에서 버튼을 클릭하여 로그인/회원가입으로 전환 |
| `구단 생성/가입` | `이미지` |  |



<br/>
## 🤬 발생한 이슈 & 해결 방법

### "아래 내용에 들어갈 간략한 제목"

[상황]  
벌어진 오류 등 이슈상황 설명...
유저 로그인 시 보안성 문제 

[문제] 

문제점 설명...
처음 코드를 짰을 때 보안성에 크게 생각을 하지 않고 단순하게 쿠키로 로그인 유지를
실현했다. 그러나 우리가 배포를 했을 때를 생각하고 만들다 보니 로그인 보안의 문제점이
취약하다는 것을 깨달았다. 보안성의 문제를 해결하고 나니 로그인 유지가 되지 않는 문제점이 다시 발생이 되었다.

[해결]  
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
각 미들웨어 별로 로그인 관련되어 필요한 코드들을 만들었고 로그인 쿠키가 있을시
다음 페이지로 넘어갈수 있게 만들고 쿠키가 없을시 로그인 페이지로 넘어가게 만들었다.
각 코드별로 exports 해서 각각의 미들웨어에 코드를 사용했다.

해결한 방법 설명...




## NodeJs 배포하며 깨달은 점 

깨달은 점...

깨달은것 어렵다
탈주     마렵다
집이     그립다
몸이     가렵다

이 세상엔 천재가 많다
나는 똥멍청이다
겨울은 춥다



## 배포 활용(EC2, RDS, MySQL) 

배포에 관한 설명...










### 프로젝트 기획안 PPT
PPT 첨부...


