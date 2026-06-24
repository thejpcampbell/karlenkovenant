import { createContext, useContext } from 'react';

// Provides the active role ('jp' | 'ashley') + a setter to the whole app.
const RoleContext = createContext({ role: null, setRole: () => {} });

export function RoleProvider({ role, setRole, children }) {
  return <RoleContext.Provider value={{ role, setRole }}>{children}</RoleContext.Provider>;
}

export function useRole() {
  return useContext(RoleContext);
}
