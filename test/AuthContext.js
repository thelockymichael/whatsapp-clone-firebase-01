import React, {createContext} from 'react'

export const AuthContext = createContext({})

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null)

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        signIn: async () => {
          try {
            console.log('Sign in')
            await AuthManager.signInAsync()
            const token = await AuthManager.getAccessTokenAsync()

            console.log('authContext token', token)

            return token
            // dispatch({type: 'SIGN_IN', token})
          } catch (e) {
            console.log(e)
          }
        },
        register: async (email, password) => {
          try {
            await firebase
              .auth()
              .createUserWithEmailAndPassword(email, password)
          } catch (e) {
            console.log(e)
          }
        },
        logout: async () => {
          try {
            await firebase.auth().signOut()
          } catch (e) {
            console.error(e)
          }
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// const AuthProvider = ({children}) => {

// return (
//   <AuthContext.Provider value={
//     {
//       signIn: async () => {},
//       signOut: () => {}
//      }}>
//     {children}
//   </AuthContext.Provider>
// )

// signIn: async () => {},
// signOut: () => {}
// export {AuthContext, AuthProvider}
