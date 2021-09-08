const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use('/manager/api/analysis', require('./routers/analysisRouter'));
app.use('/manager/api/category', require('./routers/categoryRouter'));


mongoose.connect('mongodb://localhost:27017/db', {useNewUrlParser: true}, (error) => {
  if (error) {
    console.log('数据库启动失败', error);
  } else {
    
  }
})

app.listen(5000, (error) => {
  console.log('服务器启动了', error);
});