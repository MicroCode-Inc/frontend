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

  // Button size based on variant
  const btnSize = variant === 'detail' ? 'btn-lg' : ''
  const badgeSize = variant === 'detail' ? 'fs-5' : ''

  // If user owns the course, show "Open" button or "Owned" badge
  if (owned) {
    // If tab is provided, show "Open" button that links to course detail page
    if (tab) {
      return (
        <Link
          to={`/courses/${tab}/${course.id}`}
          className={`btn btn-success ${btnSize}`}
          onClick={e => e.stopPropagation()}
        >
          Open
        </Link>
      )
    }

    // Otherwise show "Owned" badge
    return (
      <div className='d-flex align-items-center gap-2'>
        <span className={`badge bg-success ${badgeSize}`}>✓ Owned</span>
      </div>
    )
  }

  // If in cart, show remove and go to cart buttons
  if (inCart) {
    return (
      <div className='d-flex align-items-center gap-2 flex-wrap'>
        <button
          className={`btn btn-outline-danger ${btnSize}`}
          onClick={handleRemoveFromCart}
        >
          Remove
        </button>
        <button
          className={`btn btn-primary ${btnSize}`}
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
    <div className='d-flex align-items-center gap-2 flex-wrap'>
      <div className='d-flex align-items-center gap-2'>
        <span
          className={`btn bg-secondary-subtle fs-5 fw-bold ${
            variant === 'detail' ? 'fs-5 px-3 py-2' : 'px-2 py-1'
          }`}
        >
          {formatCurrency(finalPrice)}
        </span>
        {course.discount > 0 && (
          <>
            <span
              className={`text-decoration-line-through text-muted ${
                variant === 'detail' ? 'fs-6' : 'small'
              }`}
            >
              {formatCurrency(course.price)}
            </span>
            <span
              className={`badge bg-danger ${
                variant === 'detail' ? 'fs-6 px-2 py-1' : 'small'
              }`}
            >
              -{formatCurrency(course.discount)}
            </span>
          </>
        )}
      </div>
      {tab && showPreview && (
        <Link
          to={`/courses/${tab}/${course.id}/preview`}
          className={`btn btn-outline-secondary ${btnSize}`}
          onClick={e => e.stopPropagation()}
        >
          Preview
        </Link>
      )}
      <button
        className={`btn btn-outline-primary ${btnSize}`}
        onClick={handleAddToCart}
      >
        Add to Cart
      </button>
      {showBuyNow && (
        <button
          className={`btn btn-outline-primary ${btnSize}`}
          onClick={handleBuyNow}
        >
          Buy Now
        </button>
      )}
    </div>
  )
}
