import React, { useState, useEffect, useContext } from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useParams,
  useRouteMatch
} from "react-router-dom"

import { provideCurrentUser, withCurrentUser } from './current_user_context'

import SignIn from './sign_in'
import UserSpace from './user_space'
import AdminSpace from './admin_space'

const Root = ({ currentUser, currentUserLoading }) => {
  if (currentUserLoading) {
    return <div>Splash Screen</div>
  } else {
    return (
      <div>
        <Router>
          { !currentUser ? <Redirect to="/signin" /> : null }

          <Switch>
            <Route path="/signin"><SignIn /></Route>
            <Route path="/admin"><AdminSpace /></Route>
            <Route path="/app"><UserSpace /></Route>
            <Redirect to={ currentUser?.role == 'Admin' ? '/admin' : '/app' } />
          </Switch>
        </Router>
      </div>
    )
  }
}

export default provideCurrentUser(withCurrentUser(Root))
