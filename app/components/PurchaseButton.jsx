import { useNavigate, Link } from 'react-router'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import {
  isCourseOwned,
  formatCurrency,
  calculateFinalPrice
} from '../utils/helpers'

/**
 * PurchaseButton - Displays appropriate button based on ownership and cart status
 * @param {Object} course - Course object with id, name, price, discount
 * @param {boolean} showBuyNow - Whether to show "Buy Now" button (default: true)
 * @param {string} variant - Button variant: "card" (small) or "detail" (large)
 * @param {string} tab - Optional tab parameter for linking to course detail page
 * @param {boolean} showPreview - Whether to show "Preview" button (default: true)
 */
export default function PurchaseButton({
  course,
  showBuyNow = true,
  variant = 'card',
  tab,
  showPreview = true
}) {
  const { isLoggedIn, user } = useAuth()
  const { addToCart, isInCart, removeFromCart } = useCart()
  const navigate = useNavigate()

  const owned = isCourseOwned(course.id, user?.owned_courses)
  const inCart = isInCart(course.id)
  const finalPrice = calculateFinalPrice(course.price, course.discount)

  const handleAddToCart = e => {
    e.preventDefault()
    e.stopPropagation()

    if (!isLoggedIn) {
      navigate('/login')
      return
    }

    if (addToCart(course.id)) {
      // Successfully added
    }
  }

  const handleRemoveFromCart = e => {
    e.preventDefault()
    e.stopPropagation()
    removeFromCart(course.id)
  }

  const handleBuyNow = e => {
    e.preventDefault()
    e.stopPropagation()

    if (!isLoggedIn) {
      navigate('/login')
      return
    }

    // Add to cart and go to checkout
    addToCart(course.id)
    navigate('/checkout')
  }

  // All buttons use default Bootstrap sizes

  // If user owns the course, show "Open" button or "Owned" badge
  if (owned) {
    // If tab is provided, show "Open" button that links to course detail page
    if (tab) {
      return (
        <Link
          to={`/courses/${tab}/${course.id}`}
          className='btn btn-success'
          onClick={e => e.stopPropagation()}
        >
          HTML
        </Link>
      )
    }

    // Otherwise show "Owned" badge
    return (
      <div className='d-flex align-items-center gap-2'>
        <span className='badge bg-success'>✓ Owned</span>
      </div>
    )
  }

  // If in cart, show remove and go to cart buttons
  if (inCart) {
    return (
      <div className='d-flex align-items-center gap-2'>
        <button
          className='btn btn-outline-danger'
          onClick={handleRemoveFromCart}
        >
          Remove
        </button>
        <button
          className='btn btn-primary'
          onClick={e => {
            e.preventDefault()
            e.stopPropagation()
            navigate('/cart')
          }}
        >
          Go to Cart
        </button>
      </div>
    )
  }

  // Show purchase options
  return (
    <div className='d-flex align-items-center gap-2'>
      {tab && showPreview && (
        <Link
          to={`/courses/${tab}/${course.id}/preview`}
          className='btn btn-outline-secondary'
          onClick={e => e.stopPropagation()}
        >
          Preview
        </Link>
      )}
      <button
        className='btn btn-outline-primary'
        onClick={handleAddToCart}
      >
        Buy
      </button>
      {showBuyNow && (
        <button
          className='btn btn-outline-primary'
          onClick={handleBuyNow}
        >
          Buy Now
        </button>
      )}
      <div className='d-flex align-items-center gap-2'>
        <span className='btn bg-secondary-subtle fw-bold'>
          {formatCurrency(finalPrice)}
        </span>
        {course.discount > 0 && (
          <>
            <span className='text-decoration-line-through text-muted'>
              {formatCurrency(course.price)}
            </span>
            <span className='badge bg-danger'>
              -{formatCurrency(course.discount)}
            </span>
          </>
        )}
      </div>
    </div>
  )
}
