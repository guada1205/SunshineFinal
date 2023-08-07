import { useContext } from "react";
import { LoginContext } from "../context/login.jsx"

export const useLogin = () => {
  const context = useContext(LoginContext)

  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }

    return context
  }