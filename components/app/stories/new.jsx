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

      <div>
        <label htmlFor="summary">Summary</label>
        <input ref={register} name="summary" id="summary" type="text" />
      </div>

      <div>
        <label htmlFor="description">Description</label>
        <textarea ref={register} name="description" id="description" />
      </div>

      <div>
        <label htmlFor="type">Type</label>
        <select ref={register} name="type" id="type">
          {['enhancement', 'bugfix', 'development', 'QA'].map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="complexity">Complexity</label>
        <select ref={register} name="complexity" id="complexity">
          {['low', 'mid', 'high'].map(complexity => (
            <option key={complexity} value={complexity}>{complexity}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="estimatedHrs">Time estimate</label>
        <input ref={register} name="estimatedHrs" id="estimatedHrs" type="text" />
      </div>

      <div>
        <label htmlFor="cost">Cost</label>
        $<input ref={register} name="cost" id="cost" type="number" />
      </div>

      <div>
        <input type="submit" />
      </div>
    </form>
  )
}

export default consumeCurrentUser(New)
