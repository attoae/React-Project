import immutable from 'immutable'
import API from '../../ajax/api'
import HttpRequest from '../../ajax'
import { Dispatch } from 'redux';


enum AddCategoryType {
  load = 'add_category_load',
  success = 'add_category_success',
  fail = 'add_category_fail'
}

enum GetCategoryType {
  load = 'get_category_load',
  success = 'get_category_success',
  fail = 'get_category_fail'
}

// 同步action
const addCategory = (type: AddCategoryType, value?: any) => ({
  type,
  value
})

const getCategory = (type: GetCategoryType, value?: any) => ({
  type,
  value
})

type Action = ReturnType<typeof addCategory> | ReturnType<typeof getCategory>;

// 异步action
// 发送新增分类的事件
export const requestAddCategory = (categoryName: string) => (dispatch: Dispatch) => {
  dispatch(addCategory(AddCategoryType.load));
  HttpRequest.get(API.CATEGORY_ADD_API, {
    params: {
      name: categoryName
    }
  })
  .then(result => {
    dispatch(addCategory(AddCategoryType.success));
  })
  .catch(error => {
    dispatch(addCategory(AddCategoryType.fail));
  })
}

// 获得所有的分类
export const requestGetAllCategory = () => (dispatch: Dispatch) => {
  dispatch(getCategory(GetCategoryType.load));
  HttpRequest.get(API.CATEGORY_ALL_API)
  .then(({data}) => {
    const newData = data.data.map((item: any) => ({...item, key: item._id}));
    dispatch(getCategory(GetCategoryType.success, newData));
  })
  .catch(error => {
    dispatch(getCategory(GetCategoryType.fail));
  })
}

// state
const initialState = {
  add: {
    status: 'waiting'
  },
  all: {
    status: 'waiting',
    data: null
  }
}

//reducer
const category = (state = immutable.fromJS(initialState), action: Action) => {
  switch (action.type) {
    case AddCategoryType.load:
      return (state as any).setIn(['add', 'status'], 'loading');
    case AddCategoryType.success:
      return (state as any).setIn(['add', 'status'], 'success');
    case AddCategoryType.fail:
      return (state as any).setIn(['add', 'status'], 'fail');
    case GetCategoryType.load:
      return (state as any).setIn(['all', 'status'], 'loading');
    case GetCategoryType.success:
      const newState = (state as any).setIn(['all', 'status'], 'success');
      return newState.setIn(['all', 'data'], action.value);
    case GetCategoryType.fail:
      return (state as any).setIn(['all', 'status'], 'fail');
    default:
      return state;
  }
}

export default category;