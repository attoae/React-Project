import * as React from 'react';
import { Empty, Button } from 'antd';
import {Link} from 'react-router-dom';

const AppError: React.FC<{}> = () => {
  return (
    <div className="common-container">
      <Empty description="error,页面出错了">
        <Button type="primary">
          <Link to="/">返回首页</Link>
        </Button>
      </Empty>
    </div>
  );
};

export default AppError;