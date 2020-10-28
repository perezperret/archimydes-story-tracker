import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import { provideCurrentUser, consumeCurrentUser } from './contexts/current_user_context'

import SignIn from './sign_in'
import App from './app'
import Admin from './admin'

const Root = ({ currentUser, currentUserLoading }) => {
  if (currentUserLoading) {
    return <div>Splash Screen</div>
  } else {
    return (
      <div>
        <Router>
          <div
            style={{ maxWidth: '400px' }}
            className="container-fluid py-4 mx-auto w-100"
          >
            <Switch>
              <Route path="/signin"><SignIn /></Route>
              { !currentUser ? <Redirect to="/signin" /> : null }

              <Route path="/admin"><Admin /></Route>
              <Route path="/app"><App /></Route>
              <Redirect to={ currentUser?.role == 'Admin' ? '/admin' : '/app' } />
            </Switch>
          </div>
        </Router>
      </div>
    )
  }
}

export default provideCurrentUser(consumeCurrentUser(Root))
