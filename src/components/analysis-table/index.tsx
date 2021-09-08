import React, {useCallback, useState} from 'react';
import moment from 'moment';
import { DatePicker, Button, Table, message, Empty } from 'antd';
import useLoading from '../../utils/useLoading';
import './style.scss';

const { RangePicker } = DatePicker;

function disabledDate(current: moment.Moment) {
  // Can not select days before today and today
  return current && current > moment().endOf('day');
}

interface onChangeInterface {
  status: string
  columns: {
    title: string
    dataIndex: string
  }[]
  data: any[]
  http: string
  onChange: (dateArr: string[]) => void
}

const AnalysisTable: React.FC<onChangeInterface> = ({onChange, data, columns, status, http}) => {
  
  const [selectDate, setSelectDate] = useState(['', '']);
  
  const changeDateAction = useCallback((momentDateArr, stringDateArr) => {
    onChange(stringDateArr);
    setSelectDate(stringDateArr);
  }, [onChange]);

  const dataDOM = data && <Table columns={columns}  size="middle" className="table"
  dataSource={(data.map(item => item.set('key', item.get('date'))) as any).toJS()}/>;

  const contentDOM = useLoading(status, dataDOM, <Empty/>);

  return (
    <div>
      <header className="table-header">
        <RangePicker 
          disabledDate={disabledDate}
          format="YYYY-MM-DD"
          onChange={changeDateAction}
        />
        <Button type="link" onClick={() => {
          if (selectDate[0] && selectDate[1]) {
            window.open(`${http}?begin=${selectDate[0]}&end=${selectDate[1]}`);
          } else {
            message.error('请先选择时间');
          }
        }}>打印表格</Button>
      </header>
      <div className="content-center table-content">
        {contentDOM}
      </div>
    </div>
  );
};

export default AnalysisTable;




