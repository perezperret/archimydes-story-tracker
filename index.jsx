import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { useForm } from "react-hook-form"

const App = () => {
  const [currentUser, setCurrentUser] = useState({ loading: true })

  const signInUser = currentUser => {
    window.localStorage.setItem('currentUser', JSON.stringify(currentUser))
    setCurrentUser(currentUser)
  }

  const signOutUser = () => {
    window.localStorage.removeItem('currentUser')
    setCurrentUser({ loading: false })
  }

  useEffect(() => {
    const currentUser =
      window.localStorage.getItem('currentUser')
      && JSON.parse(window.localStorage.getItem('currentUser'))

    setCurrentUser(currentUser ? currentUser : { loading: false })
  }, [])

  if (currentUser.loading) {
    return <div>Splash Screen</div>
  } else if (currentUser.id && currentUser.isAdmin) {
    return <UserSpace signOutUser={signOutUser} />
  } else if (currentUser.id && !currentUser.isAdmin) {
    return <AdminSpace signOutUser={signOutUser} />
  } else {
    return <SignIn signInUser={signInUser} />
  }
}

const UserSpace = ({ signOutUser }) => (
  <div>
    <div>User space</div>
    <button type="button" onClick={signOutUser}>Sign out</button>
  </div>
)

const AdminSpace = ({ signOutUser }) => (
  <div>
    <div>Admin space</div>
    <button type="button" onClick={signOutUser}>Sign out</button>
  </div>
)

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
      .catch((error) => {
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

ReactDOM.render(<App />, document.getElementById('app'))
