var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//CORS 지원위해 패키지참조 
const cors = require("cors");

var sequelize = require('./models/index.js').sequelize;


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

//게시글 정보관리 REST API 라우터 파일 참조하기 
var articleAPIRouter = require('./routes/article-API');


var app = express();


//mysql과 자동연결처리 및 모델기반 물리 테이블 생성처리제공
sequelize.sync(); 


//모든 호출 허락
app.use(cors());



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//각종 라우터파일의 기본호출 주소체계를 정의한다.중요해용...
app.use('/', indexRouter);
app.use('/users', usersRouter);


//게시글 정보관리 라우터파일의 기본 주소체계정의 
//http://localhost:3000/api/article/~~
app.use('/api/article',articleAPIRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
