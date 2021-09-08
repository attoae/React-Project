import * as React from 'react';
import { Empty, Button } from 'antd';
import {Link} from 'react-router-dom';

const Forbidden: React.FC<{}> = () => {
  return (
    <div className="common-container">
      <Empty description="403,对不起你没权限">
        <Button type="primary">
          <Link to="/">返回首页</Link>
        </Button>
      </Empty>
    </div>
  );
};

export default Forbidden;