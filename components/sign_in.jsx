import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Redirect, useHistory } from 'react-router-dom'

import { consumeCurrentUser } from './contexts/current_user_context'

const SignIn = ({ currentUser, signInUser }) => {
  const { register, handleSubmit } = useForm()
  const [signInError, setSignInError] = useState('')
  const history = useHistory()

  const onSubmit = data => {
    setSignInError('')

    fetch('http://localhost:3000/api/v1/signin', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(signInUser)
      .then(() => {
        history.push(currentUser.role == "Admin" ? '/admin' : '/app')
      })
      .catch((error) => {
        setSignInError('Error signing in')
      })
  }

  return (
    <div>
      { currentUser ? <Redirect to='/' /> : null }
      <h1 className="h6 mb-5">StoryTracker | Sign in</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        { signInError ? <div>{signInError}</div> : null }

        <div className="form-group">
          <label className="small text-muted text-uppercase" htmlFor="email">
            Email
          </label>

          <input
            className="form-control"
            ref={register}
            name="email" id="email" type="email"
            autoComplete="email" />
        </div>

        <div className="form-group">
          <label className="small text-muted text-uppercase" htmlFor="password">
            Password
          </label>

          <input
            className="form-control"
            ref={register}
            name="password" id="password" type="password"
            autoComplete="password" />
        </div>

        <div>
          <input name="isAdmin" id="isAdmin" type="checkbox" ref={register} />
          <label className="ml-2" htmlFor="isAdmin">Sign in as admin</label>
        </div>

        <div>
          <input className="btn btn-block btn-primary" type="submit" />
        </div>
      </form>
    </div>
  )
}

export default consumeCurrentUser(SignIn)
