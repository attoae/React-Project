import React, {useCallback, useEffect, memo, useMemo, useRef} from 'react';
import {AppPanel, AppCollapse} from '../../../components/collapse';
import {useDispatch, useSelector} from 'react-redux';
import {requestAnalysisOrderData} from '../../../store/modules/analysis';
import Loading from '../../common/loading';
import { Empty } from 'antd';
import AnalysisTable from '../../../components/analysis-table';
import * as echarts from 'echarts';
import '../analysis_user/style.scss';

const panelNav = [
  {title: '7日订单指标', value: 7},
  {title: '15日订单指标', value: 15},
  {title: '30日订单指标', value: 30}
]

function getEchartOptions(data: number[]) {
  let options = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left',
    },
    series: [
      {
        type: 'pie',
        radius: '50%',
        data: [
          {value: data[1], name: '已付款'},
          {value: data[2], name: '待付款'},
          {value: data[3], name: '作废'}
        ],
        emphasis: {
          itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };
  return options;
}

// 获得昨日核心数据
const TypeOneDom: React.FC<{oneData: any}> = memo(function TypeOneDom({oneData}) {
  const status = oneData.get('status');
  const data = oneData.get('data');
  switch (status) {
    case 'loading':
      return (
        <div className="panel-container loading">
          <Loading/>
        </div>
      );
    case 'success':
      return (
        <div className="panel-container success">
          <div className="success-panel">
            <h3>新增订单数</h3>
            <p>{data && data.get('newCount')}</p>
          </div>
          <div className="success-panel">
            <h3>已支付数</h3>
            <p>{data && data.get('payCount')}</p>
          </div>
          <div className="success-panel">
            <h3>累计金额</h3>
            <p>{data && data.get('allCount')}</p>
          </div>
        </div>
      );
    case 'fail':
      return (
        <div className="panel-container fail">
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="请求错误！" />
        </div>
      );
    default:
      return null;
  }
});

// 展示多日的数据
const TypeTwoDom: React.FC<{otherData: any}> = memo(function TypeTwoDom({otherData}) {
  const status = otherData.get('status');
  const data = otherData.get('data');
  const chartRef = useRef<HTMLDivElement>(null!);
  
  let res = useMemo(() => {
    let tmp: number[] = [0, 0, 0, 0, 0];
    data && data.forEach((item: any) => {
      tmp[0] += item.get('newCount');
      tmp[1] += item.get('payCount');
      tmp[2] += item.get('waitCount');
      tmp[3] += item.get('cancelCount');
      tmp[4] += item.get('allCount');
    })
    return tmp;
  }, [data]);

  useEffect(() => {
    if (status === 'success') {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(chartRef.current);
      let options = getEchartOptions(res);
      // 绘制图表
      myChart.setOption(options);
      window.onresize = function () {
        myChart.resize();
      }
    }
  }, [status, res])

  switch (status) {
    case 'loading':
      return (
        <div className="panel-container type-two loading">
          <Loading/>
        </div>
      );
    case 'success':
      return (
        <div className="panel-container type-two success">
          <div className="order-info">
            <h3>各项指标</h3>
            <p>订单总数：{res[0]}</p>
            <p>已付款：{res[1]}</p>
            <p>待付款：{res[2]}</p>
            <p>作废：{res[3]}</p>
            <p>总金额：{res[4]}</p>
          </div>
          <div className="order-chart" ref={chartRef}></div>
        </div>
      );
    case 'fail':
      return (
        <div className="panel-container type-two fail">
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="请求错误！" />
        </div>
      );
    default:
      return null;
  }
});

// 表格结构信息
const columns = [
  {title: '日期', dataIndex: 'date'},
  {title: '订单总数', dataIndex: 'newCount'},
  {title: '已支付', dataIndex: 'payCount'},
  {title: '待付款', dataIndex: 'waitCount'},
  {title: '作废', dataIndex: 'cancelCount'},
  {title: '总金额', dataIndex: 'allCount'},
 ];

const AnalysisOrder: React.FC<{}> = () => {
  const dispatch = useDispatch();

  const orderData = useSelector(state => (state as any).getIn(['analysis', 'order']));
  
  const handleFirstActive = useCallback((key) => {
    const value = (panelNav.find((item, index) => index === Number(key))!).value;
    dispatch(requestAnalysisOrderData(value));
  }, [dispatch]);
  // 请求默认展开的数据
  useEffect(() => {
    // 初始化请求昨日指标
    dispatch(requestAnalysisOrderData(1));
  }, [dispatch]);

  const handleChange = useCallback((dateArr: string[]) => {
    dispatch(requestAnalysisOrderData(-1, dateArr[0], dateArr[1]));
  }, [dispatch]);

  return (
    <div>
      <h1>订单分析</h1>
      <p>本页根据昨日数据来进行计算，而非实时数据。</p>
      <AppCollapse activeKey="-1" onFirstActive={handleFirstActive}>
        <AppPanel key="-1" header="昨日订单指标">
          <TypeOneDom oneData={orderData.get('1')}/>
        </AppPanel>
        {
          panelNav.map((item, index) => (
            <AppPanel key={index} header={item.title}>
              <TypeTwoDom otherData={orderData.get(item.value.toString())}/>
            </AppPanel>
          ))
        }
      </AppCollapse>
      <AnalysisTable 
        onChange={handleChange}
        status={orderData.getIn(['-1', 'status'])}
        columns={columns}
        data={orderData.getIn(['-1', 'data'])}
        http="/manager/api/analysis/order/excel"
      />
    </div>
  );
};

export default AnalysisOrder;