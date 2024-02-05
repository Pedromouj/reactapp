import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({});
  const [redirectUrl, setRedirectUrl] = useState(null);

  return (
    <AuthContext.Provider value={{ authState, setAuthState, redirectUrl, setRedirectUrl }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
