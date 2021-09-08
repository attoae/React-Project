import React, {useCallback} from 'react';
import {useHistory} from 'react-router';
import { Layout, Menu } from 'antd';
import siderConfig from '../../config/sider.config';
import useRouteInfo from '../../utils/useRouteInfo';
import {useTranslationLanguage} from '../../config/locale';

const { SubMenu } = Menu;
const { Sider } = Layout;

const AppSider: React.FC<{}> = (props) => {
  // 切换路由的事件
  const history = useHistory();  
  const itemClickAction = useCallback((path: string) => {
      history.push(path);
  }, [history]);

  // 获得展开导航栏的ids
  const {ids} = useRouteInfo();

  const translationLanguage = useTranslationLanguage();

  return (
    <Sider width={200} className="site-layout-background">
        <Menu
            mode="inline"
            defaultOpenKeys={[ids[0]]}
            defaultSelectedKeys={[ids[1]]}
            style={{ height: '100%', borderRight: 0 }}
        >   
            {
                siderConfig.map(configItem => (
                    <SubMenu 
                        key={configItem.id} 
                        icon={<configItem.icon />} 
                        title={translationLanguage(configItem.root)}
                    >
                        {
                            configItem.children.map(item => (
                                <Menu.Item 
                                    key={item.id}
                                    onClick={() => {
                                        itemClickAction(item.path);
                                    }}
                                    title={translationLanguage(item.title)}
                                >{translationLanguage(item.id)}</Menu.Item>
                            ))
                        }
                    </SubMenu>
                ))
            }
        </Menu>
    </Sider>
  )
}

export default AppSider;
