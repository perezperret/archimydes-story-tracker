import React, { useState, useEffect } from 'react'

import { consumeCurrentUser } from '../../contexts/current_user_context'
import { useParams, useHistory } from "react-router-dom"

const Show = ({ currentUser }) => {
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
        <dl>
          <div className="row mx-n2 mb-3">
            <div className="col-12 col-sm-2 px-2">
              <dt className="small text-muted text-uppercase">Id</dt>
              <dd>{id}</dd>
            </div>

            <div className="col-6 col-sm-5 px-2">
              <dt className="small text-muted text-uppercase">Type</dt>
              <dd className="text-uppercase">{type}</dd>
            </div>

            <div className="col-6 col-sm-5 px-2">
              <dt className="small text-muted text-uppercase">Complexity</dt>
              <dd className="text-uppercase">{complexity}</dd>
            </div>
          </div>

          <div className="mb-4">
            <dt className="small text-muted text-uppercase">Summary</dt>
            <dd>{summary}</dd>
          </div>

          <div className="mb-4">
            <dt className="small text-muted text-uppercase">Description</dt>
            <dd>{description}</dd>
          </div>

          <div className="row mx-n2">
            <div className="col px-2">
              <dt className="small text-muted text-uppercase">Time estimate</dt>
              <dd>{estimatedHrs || 0} h.</dd>
            </div>

            <div className="col px-2">
              <dt className="small text-muted text-uppercase">Cost</dt>
              <dd>${cost || 0}</dd>
            </div>
          </div>
        </dl>

        <div className="row mx-n1">
          <div className="col px-1">
            <button className="btn btn-block btn-success" type="button" onClick={createActionHandler('accepted')}>
              Accept
            </button>
          </div>

          <div className="col px-1">
            <button className="btn btn-block btn-danger" type="button" onClick={createActionHandler('rejected')}>
              Reject
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default consumeCurrentUser(Show)
