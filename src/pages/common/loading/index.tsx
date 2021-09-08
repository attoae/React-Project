import * as React from 'react';
import { Spin } from 'antd';

const Loading: React.FC<{}> = () => {
  return (
    <div className="common-container">
      <Spin tip="Loading..." size="large"></Spin>
    </div>
  );
};

export default Loading;