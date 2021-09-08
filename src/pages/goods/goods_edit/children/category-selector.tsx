import React, {useEffect} from 'react';
import {requestGetAllCategory} from '../../../../store/modules/category';
import {useDispatch, useSelector} from 'react-redux';
import {Select} from 'antd';
const {Option} = Select;

const CategorySelector: React.FC<{onChange: (value: string) => void}> = function CategorySelector({onChange}) {
  const dispatch = useDispatch();
  const category = useSelector(state => (state as any).getIn(['category', 'all', 'data']));
  
  // 请求分类的数据
  useEffect(() => {
    dispatch(requestGetAllCategory());
  }, [dispatch]);



  return category ? (
    <Select  style={{ width: 120 }} onChange={onChange}>
      {
        category.map((item: any) => (
        <Option key={item._id} value={item.name}>{item.name}</Option>
        ))
      }
    </Select>
  ) : null;
}
export default CategorySelector;

