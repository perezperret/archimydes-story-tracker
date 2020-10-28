import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import { consumeCurrentUser } from '../../contexts/current_user_context'

const New = ({ currentUser }) => {
  const { register, handleSubmit } = useForm()
  const [apiError, setApiError] = useState('')
  const history = useHistory()

  const onSubmit = data => {
    setApiError('')

    fetch('http://localhost:3000/api/v1/stories', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json',
        'authorization': `Bearer ${currentUser.token}`
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(() => { history.push('/stories') })
      .catch(() => {
        setApiError('Error creating story')
      })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      { apiError ? <div>{apiError}</div> : null }

      <div className="form-group">
        <label className="small text-muted text-uppercase" htmlFor="summary">Summary</label>
        <input className="form-control" ref={register} name="summary" id="summary" type="text" />
      </div>

      <div className="form-group">
        <label className="small text-muted text-uppercase" htmlFor="description">Description</label>
        <textarea className="form-control" ref={register} name="description" id="description" />
      </div>

      <div className="row mx-n1">
        <div className="col px-1 form-group">
          <label className="small text-muted text-uppercase" htmlFor="type">Type</label>
          <select className="form-control" ref={register} name="type" id="type">
            {['enhancement', 'bugfix', 'development', 'QA'].map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div className="col px-1 form-group">
          <label className="small text-muted text-uppercase" htmlFor="complexity">Complexity</label>
          <select className="form-control" ref={register} name="complexity" id="complexity">
            {['low', 'mid', 'high'].map(complexity => (
              <option key={complexity} value={complexity}>{complexity}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="row mx-n1">
        <div className="col px-1 form-group">
          <label className="small text-muted text-uppercase" htmlFor="estimatedHrs">Time estimate</label>
          <div className="input-group">
            <input className="form-control" ref={register} name="estimatedHrs" id="estimatedHrs" type="text" />

            <div className="input-group-append">
              <span className="input-group-text">Hrs</span>
            </div>
          </div>
        </div>

        <div className="col px-1 form-group">
          <label className="small text-muted text-uppercase" htmlFor="cost">Cost</label>
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">$</span>
            </div>

            <input className="form-control" ref={register} name="cost" id="cost" type="number" />
          </div>
        </div>
      </div>

      <div>
        <input className="btn btn-block btn-primary" type="submit" />
      </div>
    </form>
  )
}

export default consumeCurrentUser(New)
