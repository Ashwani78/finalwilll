import { createContext, useContext, useEffect, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    console.log(authUser);
  }, [authUser]);

  return (
    <UserContext.Provider
      value={{
        authUser,
        setAuthUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
