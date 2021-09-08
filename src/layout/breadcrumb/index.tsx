import React from 'react';
import {Link} from 'react-router-dom';
import { Breadcrumb } from 'antd';
import useRouteInfo from '../../utils/useRouteInfo';
import {useTranslationLanguage} from '../../config/locale';

const AppBreadcrumb: React.FC<{}> = (props) => {
  
  const {breadcrumb} = useRouteInfo();
  const translationLanguage = useTranslationLanguage();
  
  if (!breadcrumb) {
    return null;
  }
  
  return (
    <Breadcrumb style={{ margin: '16px 0' }}>
      {
        breadcrumb.map((item, index: number) => (
          <Breadcrumb.Item key={index}>
            {
              item.to ? <Link to={item.to}>
                {translationLanguage(item.title)}
              </Link> : translationLanguage(item.title)
            }
          </Breadcrumb.Item>
        ))
      }
    </Breadcrumb>
  )
}

export default AppBreadcrumb;