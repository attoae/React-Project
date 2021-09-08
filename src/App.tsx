import React, { Suspense, useMemo } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import renderRoutes from './routes/renderRoutes';
import routes from './routes';
import { Layout, ConfigProvider } from 'antd';
import {LocaleProvider} from './config/locale';
import enUS from 'antd/lib/locale/en_US';
import zhCN from 'antd/lib/locale/zh_CN';
import {useSelector} from 'react-redux';
import Loading from './pages/common/loading';
import Header from './layout/header';
import Sider from './layout/sider';
import Breadcrumb from './layout/breadcrumb';
import Login from './pages/common/login';

const { Content } = Layout;

const AppLayout: React.FC<{}> = () => {
  const role = useSelector(state => {
    return (state as any).get('root').get('userInfo').get('role');
  });
  return (
    <Layout className="app">
      <Header/>
      <Layout>
        <Sider/>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb/>
          <Content style={{
            background: '#fff',
            padding: 24,
            margin: 0,
            minHeight: 'auto'
          }}>
            <Suspense fallback={<Loading/>}>
              {renderRoutes(routes, role)}
            </Suspense>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}

const App: React.FC<{}> = () => {

  const locale = useSelector(state => {
    return (state as any).get('root').get('locale');
  });

  const isLogin = useSelector(state => {
    return (state as any).get('root').get('isLogin');
  });

  const localeJSON = useMemo(() => {
    if (locale === 'zhCN') {
      return zhCN;
    } else if (locale === 'enUS') {
      return enUS;
    }
    return zhCN;
  }, [locale])
  
  return (
    <BrowserRouter>
      <ConfigProvider locale={localeJSON}>
        <LocaleProvider locale={locale}>
          <Switch>
            <Route path="/login" component={Login}/>
            <Route render={() => {
              if (!isLogin) {
                return <Redirect to="/login"/>
              } else {
                return <AppLayout/>;
              }
            }}/>
          </Switch>
        </LocaleProvider>
      </ConfigProvider>
    </BrowserRouter>
  )
}

export default App;
