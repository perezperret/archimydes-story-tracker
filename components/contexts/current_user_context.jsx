import React, { createContext, useContext, useState, useEffect } from 'react'

const CurrentUserContext = createContext({
  currentUser: {},
  signInUser: () => {},
  signOutUser: () => {}
})

export default CurrentUserContext

export const consumeCurrentUser = Component => {
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
    const [currentUser, setCurrentUser] = useState(null)
    const [currentUserLoading, setCurrentUserLoading] = useState(true)

    const signInUser = currentUser => {
      window.localStorage.setItem('currentUser', JSON.stringify(currentUser))
      setCurrentUser(currentUser)
    }

    const signOutUser = () => {
      window.localStorage.removeItem('currentUser')
      setCurrentUser(null)
    }

    useEffect(() => {
      const currentUser =
        window.localStorage.getItem('currentUser')
        && JSON.parse(window.localStorage.getItem('currentUser'))

      setCurrentUser(currentUser ? currentUser : null)
      setCurrentUserLoading(false)
    }, [])

    return (
      <CurrentUserContext.Provider
        value = {{
          currentUser: currentUser,
          currentUserLoading: currentUserLoading,
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
