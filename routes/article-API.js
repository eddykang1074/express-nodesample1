var express = require('express');
var router = express.Router();

//ORM DB객체를 참조한다.
var db = require('../models/index');


//모든 게시글 정보 조회 REST API 라우팅 메소드
//호출유형: GET
//호출주소: http://localhost:3000/api/article/list
//반환유형: 지정된 반환형식 
router.get('/list',async(req,res)=>{

    var apiResult = {
        code:200,
        data:"",
        result:""
    };
    
    //DB articles 테이블의 모든 데이터를 조회해온다.
    //조회 결과물은 ORM에 의해 JSON형태로 변환 제공됨.
    //db.모델속성명.findAll() 메소드는 ORM FRAMEWORK에 의해
    //SELECT * FROM articles; 쿼리로 변화되어 DB서버에 전달되어 실행되고
    //결과를 반환받는다.

    try{
        const articleData = await db.Article.findAll();

        apiResult.code = 200;
        apiResult.data = articleData;
        apiResult.result ="Ok";

    }catch(Err){
        apiResult.code = 500;
        apiResult.data = "";
        apiResult.result ="Failed";
    }

    res.json(apiResult);
});



//단일 게시글 신규등록처리 REST API 라우팅 메소드
//호출유형: post
//호출주소: http://localhost:3000/api/article/create
//반환유형: 지정된 반환형식 
router.post('/create',async(req,res)=>{

    var apiResult = {
        code:200,
        data:"",
        result:""
    };

    try{

        //STEP1: 프론트엔드에서 전달해오는 신규 게시글 입력정보를 추출한다.
        var title = req.body.title;
        var contents =req.body.contents;
        var registUserId = req.body.userid;

        //STEP2:DB 게시글 테이블 저장할 JSON데이터 구조수립 및 프론트 데이터 바인딩
        //ORM을 통해 DB에 특정 테이블에 데이터를 신규 등록/수정할떄는 해당 모델모듈의 구조와
        //동일한 데이터 객체를 정의해서 사용해야함.
        var article = {
            title,
            contents,
            view_count:0,
            ip_address:"111.111.111.111",
            reg_date:Date.now(),
            reg_member_id:registUserId
        }

        //create() => INSERT INTO articles(title...)Values('제목입니다.');
        //데이터를 등록하고 테이블에 실제 등록된 게시글 정보를 반환합니다. 
        var registedArticle = await db.Article.create(article);

        apiResult = {
            code:200,
            data:registedArticle,
            result:"Ok"
        };

    }catch(Err){
        apiResult = {
            code:500,
            data:"",
            result:"서버에러발생 관리자에게 문의하세요."
        };

    }

    res.json(apiResult);
});


//단일 게시글 정보 수정처리 REST API 라우팅 메소드
//호출유형: post
//호출주소: http://localhost:3000/api/article/modify/1
//반환유형: 지정된 반환형식 
router.post('/modify/:aidx',async(req,res)=>{

    var apiResult = {
        code:200,
        data:"",
        result:""
    };

    try{

        var articleIdx = req.params.aidx;

        //STEP1: 프론트엔드에서 전달해오는 신규 게시글 입력정보를 추출한다.
        var title = req.body.title;
        var contents =req.body.contents;
        var registUserId = req.body.userid;

        //STEP2:DB 게시글 테이블 저장할 JSON데이터 구조수립 및 프론트 데이터 바인딩
        //ORM을 통해 DB에 특정 테이블에 데이터를 신규 등록/수정할떄는 해당 모델모듈의 구조와
        //동일한 데이터 객체를 정의해서 사용해야함.
        var article = {
            title,
            contents,
            view_count:2,
            ip_address:"222.111.111.111"
        }

        //update() => UPDATE articles SET title=title,contents=cotents.. WEHRER aritlce_idx =1;
        //데이터를 등록하고 테이블에 실제 등록된 게시글 정보를 반환합니다.
        //반환값은 업데이트 건수가 반환됨..
        var updatedCnt = await db.Article.update(article,{where:{article_idx:articleIdx}});

        apiResult = {
            code:200,
            data:updatedCnt,
            result:"Ok"
        };

    }catch(Err){
        apiResult = {
            code:500,
            data:"",
            result:"서버에러발생 관리자에게 문의하세요."
        };

    }

    res.json(apiResult);
});



//단일 게시글 정보 삭제처리 REST API 라우팅 메소드
//호출유형: delete
//호출주소: http://localhost:3000/api/article/1
//반환유형: 지정된 반환형식 
router.delete('/:aidx',async(req,res)=>{

    var apiResult = {
        code:200,
        data:"",
        result:""
    };

    try{

        //STEP1)URL파라메터 방식으로 전달되는 게시글 고유번호를 추출하자.
        var articleIdx = req.params.aidx;

        //STEP2) DB 게시글 테이블에서 해당 글번호 단일 게시글 정보를 조회해온다.
        //DELETE FROM articles WHERE article_idx = 1;
        var deletedCnt = await db.Article.destroy({
            where:{article_idx:articleIdx}
        });

        apiResult= {
            code:200,
            data:deletedCnt,
            result:"Ok"
        };

    }catch(Error){
        apiResult= {
            code:500,
            data:{},
            result:"Failed"
        };
    }

    res.json(apiResult);

});



//단일 게시글 정보 조회 REST API 라우팅 메소드
//** 파라메터 와일드카드방식을 사용하는 라우팅 메소드는 해당 라우터파일의 맨 마지막 위치로 이동시킨다. */
//호출유형: GET
//호출주소: http://localhost:3000/api/article/1 :파라메터방식
//호출주소: http://localhost:3000/api/article?idx=1: 쿼리스트링방식
//반환유형: 지정된 반환형식 
router.get('/:aidx',async(req,res)=>{

    var apiResult = {
        code:200,
        data:"",
        result:""
    };

    try{

        //STEP1)URL파라메터 방식으로 전달되는 게시글 고유번호를 추출하자.
        var articleIdx = req.params.aidx;

        //STEP2) DB 게시글 테이블에서 해당 글번호 단일 게시글 정보를 조회해온다.
        //SELECT * FROM articles WHERE article_idx = 1;
        var article = await db.Article.findOne({
            where:{article_idx:articleIdx}
        });

        apiResult= {
            code:200,
            data:article,
            result:"Ok"
        };

    }catch(Error){
        apiResult= {
            code:500,
            data:{},
            result:"Failed"
        };
    }

    res.json(apiResult);

});





module.exports = router;