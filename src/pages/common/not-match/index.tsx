import * as React from 'react';
import { Empty, Button } from 'antd';
import {Link} from 'react-router-dom';

const NotMatch: React.FC<{}> = () => {
  return (
    <div className="common-container">
      <Empty description="404,找不到页面">
        <Button type="primary">
          <Link to="/">返回首页</Link>
        </Button>
      </Empty>
    </div>
  );
};

export default NotMatch;