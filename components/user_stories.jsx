import React, { useState, useEffect } from 'react'

import { withCurrentUser } from './current_user_context'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useParams,
  useRouteMatch
} from "react-router-dom"

const AdminStories = ({ currentUser }) => {
  const [stories, setStories] = useState([])
  const [loading, setLoading] = useState(true)
  const [apiError, setApiError] = useState(null)

  useEffect(() => {
    setApiError(null)
    setLoading(true)

    return fetch('http://localhost:3000/api/v1/stories', {
      headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json',
        'authorization': `Bearer ${currentUser.token}`
      }
    })
      .then(response => response.json())
      .then(setStories)
      .then(() => setLoading(false))
      .catch(() => {
        setApiError('Error fetching stories')
      })
  }, [])

  if (loading) {
    return <div>Splash screen</div>
  } else {
    return (
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>summary</th>
            <th>description</th>
            <th>type</th>
            <th>complexity</th>
            <th>time estimate</th>
            <th>cost</th>
          </tr>
        </thead>

        <tbody>
          {stories.map(({ id, summary, description, type, complexity, estimatedHrs, cost }) => (
            <tr key={id}>
              <td>{id}</td>
              <td>{summary}</td>
              <td>{description}</td>
              <td>{type}</td>
              <td>{complexity}</td>
              <td>{estimatedHrs || 0} h.</td>
              <td>${cost || 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
}

export default withCurrentUser(AdminStories)
