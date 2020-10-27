import React, { useState } from 'react'
import { useForm } from "react-hook-form"

import { withCurrentUser } from './current_user_context'

const SignIn = ({ signInUser }) => {
  const { register, handleSubmit } = useForm()
  const [signInError, setSignInError] = useState('')

  const onSubmit = data => {
    setSignInError('')

    fetch('http://localhost:3000/api/v1/signin', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(signInUser)
      .catch(() => {
        setSignInError('Error signing in')
      })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      { signInError ? <div>{signInError}</div> : null }

      <div>
        <label htmlFor="email">Email</label>
        <input
          ref={register}
          name="email" id="email" type="email"
          autoComplete="email" />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          ref={register}
          name="password" id="password" type="password"
          autoComplete="password" />
      </div>

      <div>
        <input name="isAdmin" id="isAdmin" type="checkbox" ref={register} />
        <label htmlFor="isAdmin">Admin</label>
      </div>

      <div>
        <input type="submit" />
      </div>
    </form>
  )
}

export default withCurrentUser(SignIn)
