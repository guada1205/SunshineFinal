// import { createContext, useState } from "react";

// export const LoginContext = createContext();

// export function LoginProvider({ children }) {
//   const [user, setUser] = useState({});

//   const loginUser = (user) => {
//     setUser(user);
//   };

//   const logoutUser = () => {
//     setUser({});
//   };

//   return (
//     <LoginContext.Provider
//       value={{
//         user,
//         loginUser,
//         logoutUser,
//       }}
//     >
//       {children}
//     </LoginContext.Provider>
//   );
// }
