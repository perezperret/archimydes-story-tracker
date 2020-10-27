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

const App = ({ currentUser }) => {
  if (currentUser.loading) {
    return <div>Splash Screen</div>
  } else {
    return (
      <div>
        <Router>
          { currentUser.role
            ? <Redirect to={currentUser.role == 'Admin' ? '/admin' : '/'} />
            : <Redirect to="/signin"/> }

          <Switch>
            <Route path="/signin"><SignIn /></Route>
            <Route path="/admin"><AdminSpace /></Route>
            <Route path="/"><UserSpace /></Route>
          </Switch>
        </Router>
      </div>
    )
  }
}

export default provideCurrentUser(withCurrentUser(App))
