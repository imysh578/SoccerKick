const express = require('express');
const path = require('path');
const morgan = require('morgan');
const nunjucks = require('nunjucks');

const {sequelize} = require('./models');


const app = express();

const PORT = 3000;
// 기존 포트 넘버 없으면 3000으로 설정
app.set('port', process.env.PORT || PORT);
app.set('view engine', 'html');
nunjucks.configure('views', {
  express: app,
  watch: true,
});