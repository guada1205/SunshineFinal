import { useContext } from "react";
import { Cartcontext } from "../context/cart.jsx"

export const useCart = () => {
  const context = useContext(Cartcontext)

  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }

    return context
  }