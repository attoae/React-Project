import immutable from 'immutable';
import API from '../../ajax/api';
import HttpRequest from '../../ajax';
import {Dispatch} from 'redux';

enum SetAnalysisUserDataType {
  load = 'set_analysis_user_load',
  success = 'set_analysis_user_success',
  fail = 'set_analysis_user_fail'
}

enum SetAnalysisOrderDataType {
  load = 'set_analysis_order_load',
  success = 'set_analysis_order_success',
  fail = 'set_analysis_order_fail'
}

// 同步action
const setAnalysisUserData = (type: SetAnalysisUserDataType, date: string, value?: any) => ({
  type,
  date,
  value
});

const setAnalysisOrderData = (type: SetAnalysisOrderDataType, date: string, value?: any) => ({
  type,
  date,
  value
});

type Action = ReturnType<typeof setAnalysisUserData> | ReturnType<typeof setAnalysisOrderData>;

// 异步action
export const requestAnalysisUserData = (value?: number, begin?: string, end?: string) => (dispatch: Dispatch) => {
  const valStr = value ? value.toString() : '';
  // 状态为正在请求
  const action = setAnalysisUserData(SetAnalysisUserDataType.load, valStr);
  dispatch(action);
  // 请求数据
  HttpRequest.get(API.ANALYSIS_USER_API, {
    params: {
      begin,
      end,
      count: value
    }
  })
  .then(({data}) => {
    // 状态为成功
    const action = setAnalysisUserData(SetAnalysisUserDataType.success, valStr, data.data);
    dispatch(action);
  })
  .catch(error => {
    // 状态为失败
    const action = setAnalysisUserData(SetAnalysisUserDataType.fail, valStr);
    dispatch(action);
  })
}

export const requestAnalysisOrderData = (value?: number, begin?: string, end?: string) => (dispatch: Dispatch) => {
  const valStr = value ? value.toString() : '';
  // 状态为正在请求
  const action = setAnalysisOrderData(SetAnalysisOrderDataType.load, valStr);
  dispatch(action);
  // 请求数据
  HttpRequest.get(API.ANALYSIS_ORDER_API, {
    params: {
      begin,
      end,
      count: value
    }
  })
  .then(({data}) => {
    // 状态为成功
    if (data.data instanceof Array) {
      data.data.forEach((item: any) =>{
        item.newCount = item.payCount + item.waitCount + item.cancelCount;
      })
    } else {
      data.data.newCount = data.data.payCount + data.data.waitCount + data.data.cancelCount;
    }
    const action = setAnalysisOrderData(SetAnalysisOrderDataType.success, valStr, data.data);
    dispatch(action);
  })
  .catch(error => {
    // 状态为失败
    const action = setAnalysisOrderData(SetAnalysisOrderDataType.fail, valStr);
    dispatch(action);
  })
}

const initialState = {
  user: {
    '-1': {
      data: null,
      status: 'waiting'
    },
    '1': {
      data: null,
      status: 'waiting'
    },
    '7': {
      data: null,
      status: 'waiting'
    },
    '15': {
      data: null,
      status: 'waiting'
    },
    '30': {
      data: null,
      status: 'waiting'
    }
  },
  order: {
    '1': {
      data: null,
      status: 'waiting'
    },
    '7': {
      data: null,
      status: 'waiting'
    },
    '15': {
      data: null,
      status: 'waiting'
    },
    '30': {
      data: null,
      status: 'waiting'
    }
  }
}

const immutableState = immutable.fromJS(initialState);

const analysis = (state = immutableState, action: Action) => {
  switch (action.type) {
    // 用户正在请求
    case SetAnalysisUserDataType.load:
      return (state as any).setIn(['user', action.date, 'status'], 'loading');
    // 用户请求成功
    case SetAnalysisUserDataType.success:
      const userState = (state as any).setIn(['user', action.date, 'status'], 'success');
      return userState.setIn(['user', action.date, 'data'], immutable.fromJS(action.value));
    // 用户请求失败
    case SetAnalysisUserDataType.fail:
      return (state as any).setIn(['user', action.date, 'status'], 'fail');
    // 订单正在请求
    case SetAnalysisOrderDataType.load:
      return (state as any).setIn(['order', action.date, 'status'], 'loading');
    // 订单请求成功
    case SetAnalysisOrderDataType.success:
      const orderState = (state as any).setIn(['order', action.date, 'status'], 'success');
      return orderState.setIn(['order', action.date, 'data'], immutable.fromJS(action.value));
    // 订单请求失败
    case SetAnalysisOrderDataType.fail:
      return (state as any).setIn(['order', action.date, 'status'], 'fail');
    default:
      return state;
  }
}

export default analysis;