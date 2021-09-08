import React, {useState, useCallback, useRef, useEffect, useMemo} from 'react';
import { Table, Modal, Divider, Button, Input } from 'antd';
import {requestAddCategory, requestGetAllCategory} from '../../../store/modules/category';
import {useDispatch, useSelector} from 'react-redux';
import './style.scss';

const { Column } = Table;

const CategoryManagement: React.FC<{}> = () => {
  const [visible, setVisible] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const textRef = useRef<string>(null!);
  const dispatch = useDispatch();
  const addStatus = useSelector(state => (state as any).getIn(['category', 'add', 'status']));
  const data = useSelector(state => (state as any).getIn(['category', 'all', 'data']));

  const confirmLoading = useMemo(() => {
    if (addStatus === 'loading') {
      return true;
    } else {
      return false;
    }
  }, [addStatus]);
  // 转换输入框的值
  useEffect(() => {
    textRef.current = inputVal;
  }, [inputVal]);
  // 根据新增的提交状态,控制新增弹出框的显示
  useEffect(() => {
    if (addStatus === 'success' || addStatus === 'fail') {
      setVisible(false);
    }
    // 新增提交成功了再次请求，刷新分类列表
    if (addStatus === 'success') {
      dispatch(requestGetAllCategory());
    }
  }, [addStatus, dispatch]);
  // 第一次请求所有数据
  useEffect(() => {
    dispatch(requestGetAllCategory());
  }, [dispatch]);

  const handleChange = useCallback((ev: React.ChangeEvent<HTMLInputElement>) => {
    setInputVal(ev.target.value);
  }, []);
  const handleOk = useCallback(() => {
    dispatch(requestAddCategory(textRef.current));
  }, [dispatch, textRef]);

  return (
    <div className="category-management">
      <div className="title">
        <span>分类管理</span>
        <Button type="primary" onClick={() => setVisible(true)}>新增</Button>
      </div>

      <Table dataSource={data}>
        <Column title="分类" dataIndex="name" key="name" />
        <Column title="商品数量" dataIndex="count" key="count" />
        <Column
          title="操作"
          key="action"
          render={(text, record: any) => (
            <span>
              <Button type="link">修改</Button>
              <Divider type="vertical" />
              <Button type="link">删除</Button>
            </span>
          )}
        />
      </Table>

      <Modal
        title="新增分类"
        visible={visible}
        confirmLoading={confirmLoading}
        onOk={handleOk}
      >
        <Input placeholder="请输入新增的分类" value={inputVal} onChange={handleChange} />
      </Modal>
    </div>
  );
};

export default CategoryManagement;