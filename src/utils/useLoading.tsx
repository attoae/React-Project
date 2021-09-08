import React from 'react';
import Loading from '../pages/common/loading';
import { Empty } from 'antd';

function useLoading(status: string, dom: React.ReactNode, emptyDOM? : React.ReactNode) {

  switch (status) {
    case 'loading': {
      return <Loading/>;
    }
    case 'success': {
      return dom;
    }
    case 'fail': {
      return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="请求错误！" />;
    }
    default: {
      return emptyDOM || null;
    }
  }
}

export default useLoading;