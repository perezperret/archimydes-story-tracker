import React, { createContext, useContext, useState, useEffect } from 'react'

const CurrentUserContext = createContext({
  currentUser: {},
  signInUser: () => {},
  signOutUser: () => {}
})

export default CurrentUserContext

export const withCurrentUser = Component => {
  const CurrentUserConsumer = () => {
    const props = useContext(CurrentUserContext)

    return (
      <Component {...props} />
    )
  }

  return CurrentUserConsumer
}

export const provideCurrentUser = Component => {
  const CurrentUserProvider = () => {
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

    return (
      <CurrentUserContext.Provider
        value = {{
          currentUser: currentUser,
          signInUser: signInUser,
          signOutUser: signOutUser
        }}
      >
        <Component />
      </CurrentUserContext.Provider>
    )
  }

  return CurrentUserProvider
}
