import React, { useCallback, useEffect, useMemo, memo, useRef } from 'react';
import {AppPanel, AppCollapse} from '../../../components/collapse';
import AnalysisTable from '../../../components/analysis-table';
import {requestAnalysisUserData} from '../../../store/modules/analysis';
import {useDispatch, useSelector} from 'react-redux';
import useLoading from '../../../utils/useLoading';
import * as echarts from 'echarts';
import './style.scss';

const panelNav = [
  {title: '7日核心指标', value: 7},
  {title: '15日核心指标', value: 15},
  {title: '30日核心指标', value: 30}
]

function formatDate(date: Date) {
  let month: string | number = date.getMonth() + 1;
  month < 10 && (month = `0${month}`);
  let day: string | number = date.getDate();
  day < 10 && (day = `0${day}`);
  return `${month}-${day}`;
}

interface yDataInterface{
  name: string
  type: string
  data: {
    [propName: number]: number
  }
}

function getEchartOptions(data: any) {
  let xData = [];
  let yData:yDataInterface[] = [
    {
      name: '新注册用户',
      type: 'line',
      data: []
    },
    {
      name: '昨日访问',
      type: 'line',
      data: []
    }
  ];
  let arr1: any[] = [];
  let arr2: any[] = [];
  let date = new Date();
  while (xData.length < data.size) {
    // 获取数据
    arr1.push(data.get(xData.length).get('newCount'));
    arr2.push(data.get(xData.length).get('visitedCount'));
    // 获得x轴坐标
    date.setDate(date.getDate() - 1);
    xData.push(formatDate(date));
  }
  yData[0].data = arr1;
  yData[1].data = arr2;
  let options = {
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data: ['新注册用户', '昨日访问']
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    xAxis: {
        type: 'category',
        data: xData.reverse()
    },
    yAxis: {
        type: 'value'
    },
    series: yData
  };
  return options;
}

// 获得昨日核心数据
const TypeOneDom: React.FC<{oneData: any}> = memo(function TypeOneDom({oneData}) {
  const status = oneData.get('status');
  const data = oneData.get('data');

  const dataDOM = useMemo(() => {
    if (data) {
      return (
        <>
          <div className="success-panel">
            <h3>新注册用户</h3>
            <p>{data.get('newCount')}</p>
          </div>
          <div className="success-panel">
            <h3>昨日访问</h3>
            <p>{data.get('visitedCount')}</p>
          </div>
          <div className="success-panel">
            <h3>累计注册</h3>
            <p>{data.get('userCount')}</p>
          </div>
        </>
      )
    } else {
      return null;
    }
  }, [data]);

  const contentDOM = useLoading(status, dataDOM);

  return (
    <div className={`panel-container ${status}`}>
      {contentDOM}
    </div>
  )
});

// 展示多日的数据
const TypeTwoDom: React.FC<{otherData: any}> = memo(function TypeTwoDom({otherData}) {
  const status = otherData.get('status');
  const data = otherData.get('data');
  const contentRef = useRef<HTMLDivElement>(null!);
  useEffect(() => {
    if (status === 'success') {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(contentRef.current);
      let options = getEchartOptions(data);
      // 绘制图表
      myChart.setOption(options);
      window.onresize = function () {
        myChart.resize();
      }
    }
  } ,[data, contentRef, status]);

  const dataDOM = useMemo(() => (
    data && <div className="chart" ref={contentRef}></div>
  ), [data]);

  const contentDOM = useLoading(status, dataDOM);
  return (
    <div className={`panel-container type-two ${status}`}>{contentDOM}</div>
  )
});

 // 表格结构信息
 const columns = [
  {title: '日期', dataIndex: 'date'},
  {title: '新注册用户', dataIndex: 'newCount'},
  {title: '昨日访问', dataIndex: 'visitedCount'},
  {title: '累计注册', dataIndex: 'userCount'},
 ];

const AnalysisUser: React.FC<{}> = () => {
  const dispatch = useDispatch();

  const userData = useSelector(state => (state as any).getIn(['analysis', 'user']));
  
  const handleFirstActive = useCallback((key) => {
    const value = (panelNav.find((item, index) => index === Number(key))!).value;
    dispatch(requestAnalysisUserData(value));
  }, [dispatch]);

  useEffect(() => {
    // 初始化请求昨日指标
    dispatch(requestAnalysisUserData(1));
  }, [dispatch]);
  // 请求列表的数据
  const handleChangeDate = useCallback((dateArr: string[]) => {
    dispatch(requestAnalysisUserData(-1, dateArr[0], dateArr[1]));
  }, [dispatch]);

 
  return (
    <div>
      <h1>用户分析</h1>
      <p>本页根据昨日数据来进行计算，而非实时数据。</p>
      <AppCollapse activeKey="-1" onFirstActive={handleFirstActive}>
        <AppPanel key="-1" header="昨日核心指标">
          <TypeOneDom oneData={userData.get('1')}/>
        </AppPanel>
        {
          panelNav.map((item, index) => (
            <AppPanel key={index} header={item.title}>
              <TypeTwoDom otherData={userData.get(item.value.toString())}/>
            </AppPanel>
          ))
        }
      </AppCollapse>
      <AnalysisTable 
        onChange={handleChangeDate} 
        status={userData.getIn(['-1', 'status'])}
        columns={columns}
        data={userData.getIn(['-1', 'data'])}
        http="/manager/api/analysis/user/excel"
      />
    </div>
  );
};

export default AnalysisUser;
