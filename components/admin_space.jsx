import React, { useState, useEffect, useContext } from 'react'
import ReactDOM from 'react-dom'
import { useForm } from "react-hook-form"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useParams,
  useRouteMatch
} from "react-router-dom"

import { withCurrentUser } from './current_user_context'
import AdminStories from './admin_stories'
import AdminStory from './admin_story'

const AdminSpace = ({ currentUser, signOutUser }) => (
  <div>
    <div>Admin space</div>
    <button type="button" onClick={signOutUser}>Sign out</button>

    <Switch>
      <Route path="/admin/stories/:id"><AdminStory /></Route>
      <Route path="/admin/stories"><AdminStories /></Route>
      <Route path="/admin"><Redirect to="/admin/stories" /></Route>
    </Switch>
  </div>
)

export default withCurrentUser(AdminSpace)
