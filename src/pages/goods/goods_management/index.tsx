import * as React from 'react';
import {Link} from 'react-router-dom';

const GoodsManagement: React.FC<{}> = () => {
  return (
    <div>
      <h1>商品管理</h1>
      <Link to="/goods/edit/add">添加商品</Link>
    </div>
  );
};

export default GoodsManagement;