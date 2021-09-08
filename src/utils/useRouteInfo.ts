import {useMemo} from 'react';
import {useLocation} from 'react-router';
import {matchRoutes} from 'react-router-config';
import routes from '../routes';
import siderConfig from '../config/sider.config';

interface itemInterface {
  title: string
  to?: string
}

export default function useRouteInfo() {
  // 根据路由地址
  const {pathname} = useLocation();

  // 得到自定义路由配置项中的path, breadcrumb
  const [{route: {path, breadcrumb}}] = matchRoutes(routes, pathname);
  
  const ids = useMemo(() => {
    // 根据path切割得到左侧导航栏的id
    let ids: string[] = [];
    if (typeof path === 'string') {
      ids = path.split('/');
      ids.shift();

      const match = siderConfig.find(item => item.id === ids[0]);
      if (match) {
        ids[1] = match.children.length === 1 ? match.children[0].id : `${ids[0]}-${ids[1]}`;
      }
    }
    return ids;
  }, [path])
  

  return {
    breadcrumb: breadcrumb as itemInterface[],
    ids: ids
  }
}