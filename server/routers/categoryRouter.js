const {Router} = require('express');
const Category = require('../model/category');

const router = new Router();

// 新增分类
router.get('/add', async (req, res) => {
  const {name} = req.query;
  if(name){
    await new Category({name}).save();
    res.json({
      code: 0,
      message: 'ok'
    })
  }else{
    res.json({
      code: -1,
      message: '缺少参数'
    })
  }
});

// 获得所有的分类
router.get('/get', async (req, res) => {
  const result = await Category.find();
  // 查询每一个分类商品的数量
  const newResult = result.map(item => {
    return {
      _id: item._id,
      name: item.name,
      count: parseInt(Math.random()*100)
    }
  });

  res.json({
    code: 0,
    message: 'ok',
    data: newResult
  });
});



module.exports = router;