const {Router} = require('express');
const {mock} = require('mockjs');
const moment = require('moment');
var nodeExcel = require('excel-export');

const router = new Router();

function mockRangeUserData(begin, end) {
  let beginArr = begin.split('-');
  beginArr[1] = beginArr[1] - 1;
  let beginMoment = moment(beginArr);

  let endArr = end.split('-');
  endArr[1] = endArr[1] - 1;
  let endMoment = moment(endArr);
  let res = endMoment.diff(beginMoment, 'days');
  
  let data = [];
  let date = new Date(begin);
  while(data.length <= res) {
    data.push(mock({
      'date': moment(date).format('YYYY-MM-DD'),
      'newCount|100-500': 0,
      'visitedCount|1000-10000': 0,
      'userCount|100000-1000000' : 0
    }));
    date.setDate(date.getDate() + 1);
  }
  return data;
}

function mockRangeOrderData(begin, end) {
  let beginArr = begin.split('-');
  beginArr[1] = beginArr[1] - 1;
  let beginMoment = moment(beginArr);

  let endArr = end.split('-');
  endArr[1] = endArr[1] - 1;
  let endMoment = moment(endArr);
  let res = endMoment.diff(beginMoment, 'days');
  
  let data = [];
  let date = new Date(begin);
  while(data.length <= res) {
    data.push(mock({
      'date': moment(date).format('YYYY-MM-DD'),
      'newCount': 0,
      'payCount|100-200': 0,
      'waitCount|0-50': 0,
      'cancelCount|0-20': 0,
      'allCount|10000-1000000' : 0
    }));
    date.setDate(date.getDate() + 1);
  }
  if (data instanceof Array) {
    data.forEach(item =>{
      item.newCount = item.payCount + item.waitCount + item.cancelCount;
    })
  } else {
    data.newCount = data.payCount +data.waitCount + data.cancelCount;
  }
  return data;
}

function downloadExcel(req, res, type, cols) {
  const {begin, end} = req.query;
  let data;
  let conf = {};
  if (type === 'user') {
    data = mockRangeUserData(begin, end);
  } else if (type === 'order') {
    data = mockRangeOrderData(begin, end);
  }
  conf.stylesXmlFile = "styles.xml";
  conf.name = "mysheet";
  conf.cols = cols;
  conf.rows = data.map(item => Object.values(item));
  let result = nodeExcel.execute(conf);
  res.setHeader('Content-Type', 'application/vnd.openxmlformats');
  res.setHeader("Content-Disposition", `attachment; filename=${type}.xlsx`);
  res.end(result, 'binary');
}


router.get('/user', (req, res) => {
  const {begin, end, count} = req.query;
  if (count > 0) {
    res.json(mock({
      code: 0,
      message: 'ok',
      ['data|'+count]: [
        {
          'newCount|100-500': 0,
          'visitedCount|1000-10000': 0,
          'userCount|100000-1000000' : 0
        }
      ]
    }))
  } else {
    res.json({
      code: 0,
      message: 'ok',
      data: mockRangeUserData(begin, end)
    })
  }
});

router.get('/order', (req, res) => {
  const {begin, end, count} = req.query;
  if (count > 0) {
    res.json(mock({
      code: 0,
      message: 'ok',
      ['data|'+count]: [
        {
          'payCount|100-200': 0,
          'waitCount|0-50': 0,
          'cancelCount|0-20': 0,
          'allCount|10000-1000000' : 0
        }
      ]
    }))
  } else {
    res.json({
      code: 0,
      message: 'ok',
      data: mockRangeOrderData(begin, end)
    })
  }
});

router.get('/user/excel', function (req, res) {
  let cols = [
    {
      caption: '日期',
      type: 'string',
    },
    {
      caption: '新注册用户',
      type: 'number',
    },
    {
      caption: '昨日访问',
      type: 'number',
    },
    {
      caption: '累计注册',
      type: 'number',
    }
  ];
  downloadExcel(req, res, 'user', cols);
});

router.get('/order/excel', function (req, res) {
  let cols = [
    {
      caption: '日期',
      type: 'string',
    },
    {
      caption: '订单总数',
      type: 'number',
    },
    {
      caption: '已支付',
      type: 'number',
    },
    {
      caption: '待付款',
      type: 'number',
    },
    {
      caption: '作废',
      type: 'number',
    },
    {
      caption: '总金额',
      type: 'number',
    }
  ];
  downloadExcel(req, res, 'order', cols);
});

module.exports = router;