var express = require('express');
var router = express.Router();



/* 기본 웹사이트 메인 페이지 */
router.get('/', function(req, res, next) {
  res.render('index.ejs', { title: '모두연 현장 풀스택 핸즈온랩' });
});

//로그인 웹페이지 요청과 응답처리 라우팅 메소드
//동일한 주소체계와 동일 호출방식(get타입)
//http://localhost:3000/login
router.get('/login',function(req,res){

  //요청:req는 httpRequest객체를 말하고 웹브라우저(클라이언트)에서 전달되는 모든정보를 담고있고 제어한다.
  //응답res는 HTTPResponse 객체를 말하고 웹서버에서 웹브라우저(클라이언트)로 전달하는 모든 데이터/제어기능제공

  //res.render('뷰파일','뷰파일에 전달할 모델에서 제공된 데이터');
  //res.json('json데이터')

  res.render('login.ejs');
  //res.json({userid:"eddy",username:"강창훈",email:"ceo@msoftware.co.kr"});

});

//회원가입 웹페이지 요청 및 응답 처리 라우팅메소드(웹페이지 전달)
//http://localhost:3000/entry
router.get('/entry',function(req,res){
  res.render('entry');
});


//회원 로그인 RESTful API 라우팅 메소드 구현
//프론트엔드에서 외부시스템(클라이언트)에서 로그인 API 호출하는경우 로그인처리
//http://localhost:3000/api/login
router.get('/api/login',async(req,res)=>{
  var loginUser ={
    userid:"eddy",
    email:"eddy@naver.com",
    username:"강창훈"
  };

  res.json({loginUser});
});


//회원가입 RESTful API 라우팅 메소드 구현
//프론트엔드에서 외부시스템에서 회원가입 데이터를 전달해서 가입처리를 요청하는 API 
//http://localhost:3000/api/signup
router.get('/api/signup',async(req,res)=>{
  //STEP1) 웹브라우저클라이언테서 전달된 데이터를 추출한다.
  //ex)req.body.userid, 
  
  //STEP2)전달된 메일주소와 동일한 메일주소존재여부 체크 

  //STEP3)회원데이터 DB Member테이블에 등록처리 

  //STEP4)Member테이블에 등록된 데이터를 웹브라우저/클라이언트에 제공한다.
  var registedMember ={
    userid:"eddy",
    username:"강현서",
    email:"ceo@msoftware.co.kr",
    gender:1,
    entryDate:Date.now(),
    entryState:1
  };
  res.json({registedMember});
});




//반드시 라우터 객체를 exports
module.exports = router;
