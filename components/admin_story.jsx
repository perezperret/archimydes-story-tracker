import React, { useState, useEffect } from 'react'

import { withCurrentUser } from './current_user_context'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useParams,
  useRouteMatch,
  useHistory
} from "react-router-dom"

const AdminStory = ({ currentUser }) => {
  const [story, setStory] = useState({})
  const [loading, setLoading] = useState(true)
  const [apiError, setApiError] = useState(null)
  const { id } = useParams();
  const history = useHistory();

  const createActionHandler = (action) => {
    return () => {
      setApiError(null)

      return fetch(`http://localhost:3000/api/v1/stories/${id}/${action}`, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
          'Accepts': 'application/json',
          'authorization': `Bearer ${currentUser.token}`
        }
      })
        .then(response => response.json())
        .then(setStory)
        .then(() => { history.push('/admin/stories') })
        .catch(() => {
          setApiError('Error fetching stories')
        })
    }
  }

  useEffect(() => {
    setApiError(null)
    setLoading(true)

    return fetch(`http://localhost:3000/api/v1/stories/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json',
        'authorization': `Bearer ${currentUser.token}`
      }
    })
      .then(response => response.json())
      .then(setStory)
      .then(() => setLoading(false))
      .catch(() => {
        setApiError('Error fetching stories')
      })
  }, [])

  const { summary, description, type, complexity, estimatedHrs, cost } = story

  if (loading) {
    return <div>Splash screen</div>
  } else {
    return (
      <div>
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
            <tr key={id}>
              <td>{id}</td>
              <td>{summary}</td>
              <td>{description}</td>
              <td>{type}</td>
              <td>{complexity}</td>
              <td>{estimatedHrs || 0} h.</td>
              <td>${cost || 0}</td>
            </tr>
          </tbody>
        </table>

        <button type="button" onClick={createActionHandler('accepted')}>
          Accept
        </button>

        <button type="button" onClick={createActionHandler('rejected')}>
          Reject
        </button>
      </div>
    )
  }
}

export default withCurrentUser(AdminStory)
