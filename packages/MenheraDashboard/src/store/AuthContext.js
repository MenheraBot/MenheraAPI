import { createContext, useReducer } from 'react';

const initialAuth = { username: null, password: null }

function Reducer (_state, auth) {
  if (!auth) {
    localStorage.removeItem('password');
    localStorage.removeItem('username');
    return null
  }
  localStorage.setItem('username', auth.username);
  localStorage.setItem('password', auth.password);
  return auth
}

export const Context = createContext(initialAuth)
export const StoreProvider = ({children}) => {
  const [state, dispatch] = useReducer(Reducer, null);

  return (
    <Context.Provider value={[state, dispatch]}>
          {children}
      </Context.Provider>
  )
};


