import { createContext, useContext, useEffect } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  useEffect(() => {
    console.log("HAI");
  }, []);

  const login = (email, password) => {
    console.log(email, password, "This was used in context.");
  };

  return (
    <UserContext.Provider value={{ login }}>{children}</UserContext.Provider>
  );
};

export default UserProvider;

export const useUser = () => useContext(UserContext);