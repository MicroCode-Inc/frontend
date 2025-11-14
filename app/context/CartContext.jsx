import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react'

const CartContext = createContext()

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart))
      } catch (error) {
        setCart([])
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = useCallback((courseId) => {
    setCart((prevCart) => {
      if (!prevCart.includes(courseId)) {
        return [...prevCart, courseId]
      }
      return prevCart
    })
    return !cart.includes(courseId)
  }, [cart])

  const removeFromCart = useCallback((courseId) => {
    setCart((prevCart) => prevCart.filter(id => id !== courseId))
  }, [])

  const clearCart = useCallback(() => {
    setCart([])
  }, [])

  const isInCart = useCallback((courseId) => {
    return cart.includes(courseId)
  }, [cart])

  const getCartCount = useCallback(() => {
    return cart.length
  }, [cart])

  const value = useMemo(
    () => ({
      cart,
      addToCart,
      removeFromCart,
      clearCart,
      isInCart,
      getCartCount
    }),
    [cart, addToCart, removeFromCart, clearCart, isInCart, getCartCount]
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
