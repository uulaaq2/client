import { createContext, useContext, useState } from 'react'
import appInfo from './appInfo.json'

const AppContext = createContext(appInfo);

export function AppWrapper({ children }) {
  const [getAppInfo, setAppInfo] = useState(appInfo)
  let context = {
    getAppInfo,
    setAppInfo
  }
  return (
    <AppContext.Provider value={context}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
