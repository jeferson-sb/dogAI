import React, { lazy, Suspense } from 'react'
import { Switch, Route } from 'react-router-dom'

import Loading from '../components/Loading'

const Home = lazy(() => import('../pages/Home/Home'))
const Dashboard = lazy(() => import('../pages/Dashboard/Dashboard'))

const Routes = () => (
  <Switch>
    <Suspense fallback={<Loading />}>
      <Route exact path="/" component={Home} />
      <Route path="/dash" component={Dashboard} />
    </Suspense>
  </Switch>
)

export default Routes
