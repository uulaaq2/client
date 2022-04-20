import { createContext, useContext, useState } from 'react'
import appInfo from './appInfo.json'

const AppContext = createContext();

export function AppWrapper({ children }) {
  const [getAppContext, setAppContext] = useState(appInfo)
  let context = {
    getAppContext,
    setAppContext
  }
  return (
    <AppContext.Provider value={{getAppContext, setAppContext}}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
