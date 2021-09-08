import React from "react";
import { Switch, Route, Redirect } from "react-router";

function renderRoutes(routes, role, extraProps = {}, switchProps = {}) {
  return routes ? (
    <Switch {...switchProps}>
      {routes.map((route, i) => (
        <Route
          key={route.key || i}
          path={route.path}
          exact={route.exact}
          strict={route.strict}
          render={props => {
            // 鉴权
            if (!checkPermission(role, route)) {
              return <Redirect to="/forbidden"/>
            }
            // 鉴权成功渲染
            return route.render ? (
              route.render({ ...props, ...extraProps, route: route })
            ) : (
              <route.component {...props} {...extraProps} route={route} />
            )
          }}
        />
        )
      )}
    </Switch>
  ) : null;
}

function checkPermission(role, {permission = [], path}) {
  // 是否是管理员
  if (role === 'admin') {
    return true;
  }
  // 不需要进行鉴权的页面
  if (!!~['/error', '/forbidden', '/not-match'].indexOf(path)) {
    return true;
  }
  // 需要进行鉴权的页面
  return !!~permission.indexOf((role));
}

export default renderRoutes;