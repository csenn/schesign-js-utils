import React from 'react'
import { Route } from 'react-router-dom'

export function buildRoutes (routeConfig) {
  return routeConfig
    .map(r => <Route path={r.path} exact={r.exact} component={r.component} render={r.render} />)
}
