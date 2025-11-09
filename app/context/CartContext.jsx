import { createContext, useContext, useState, useEffect } from 'react'

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
        console.error('Failed to parse cart from localStorage:', error)
        setCart([])
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (courseId) => {
    if (!cart.includes(courseId)) {
      setCart([...cart, courseId])
      return true
    }
    return false // Already in cart
  }

  const removeFromCart = (courseId) => {
    setCart(cart.filter(id => id !== courseId))
  }

  const clearCart = () => {
    setCart([])
  }

  const isInCart = (courseId) => {
    return cart.includes(courseId)
  }

  const getCartCount = () => {
    return cart.length
  }

  const value = {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    isInCart,
    getCartCount
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
