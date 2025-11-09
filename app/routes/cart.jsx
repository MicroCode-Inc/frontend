import { useLoaderData, Link, useNavigate } from 'react-router'
import { useCart } from '../context/CartContext'
import { formatCurrency, calculateFinalPrice } from '../utils/helpers'
import { apiRequest } from '../utils/api'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '../utils/faIcons'

export async function loader() {
  const response = await apiRequest('/courses')
  const json = await response.json()
  return { courses: json.courses }
}

export default function Cart() {
  const { courses } = useLoaderData()
  const { cart, removeFromCart, clearCart, getCartCount } = useCart()
  const navigate = useNavigate()

  // Filter courses that are in the cart
  const cartCourses = courses.filter(course => cart.includes(course.id))

  // Calculate total
  const total = cartCourses.reduce((sum, course) => {
    return sum + calculateFinalPrice(course.price, course.discount)
  }, 0)

  const handleCheckout = () => {
    if (cartCourses.length > 0) {
      navigate('/checkout')
    }
  }

  if (getCartCount() === 0) {
    return (
      <div className='container page-transition'>
        <div className='row justify-content-center'>
          <div className='col-md-8 text-center py-5'>
            <h1 className='display-4 mb-4'>Your Cart is Empty</h1>
            <p className='lead mb-4'>
              Browse our courses and add some to your cart to get started!
            </p>
            <Link to='/courses/frontend' className='btn btn-primary btn-lg'>
              Browse Courses
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='container page-transition'>
      <div className='row'>
        <div className='col-12'>
          <h1 className='display-4 mb-4'>Shopping Cart</h1>
          <p className='text-muted mb-4'>{getCartCount()} {getCartCount() === 1 ? 'course' : 'courses'} in cart</p>
        </div>
      </div>

      <div className='row'>
        <div className='col-lg-8'>
          <div className='d-grid gap-3'>
            {cartCourses.map(course => {
              const finalPrice = calculateFinalPrice(course.price, course.discount)

              return (
                <div key={course.id} className='card border-0 bg-light rounded-4 shadow-sm'>
                  <div className='row g-0'>
                    <div className='col-auto'>
                      <img
                        src={course.image_url || 'https://placehold.co/200x200'}
                        className='img-fluid rounded-start-4'
                        style={{
                          width: '200px',
                          height: '200px',
                          objectFit: 'cover'
                        }}
                        alt={course.image_alt || course.name}
                      />
                    </div>
                    <div className='col'>
                      <div className='card-body h-100 d-flex flex-column justify-content-between p-4'>
                        <div>
                          <h5 className='card-title mb-2'>{course.name}</h5>
                          <p className='card-text text-muted mb-3'>{course.description}</p>
                          {course.tags && course.tags.length > 0 && (
                            <div className='d-flex gap-1 mb-3'>
                              {course.tags.map((tag, i) => (
                                <span
                                  key={i}
                                  className='badge'
                                  style={{ backgroundColor: tag.color }}
                                >
                                  {tag.label}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className='d-flex align-items-center justify-content-between'>
                          <div className='d-flex align-items-center gap-2'>
                            <span className='fw-bold fs-5'>{formatCurrency(finalPrice)}</span>
                            {course.discount > 0 && (
                              <>
                                <span className='text-decoration-line-through text-muted'>
                                  {formatCurrency(course.price)}
                                </span>
                                <span className='badge bg-danger'>
                                  Save {formatCurrency(course.discount)}
                                </span>
                              </>
                            )}
                          </div>
                          <button
                            className='btn btn-outline-danger'
                            onClick={() => removeFromCart(course.id)}
                          >
                            <FontAwesomeIcon icon={faTrash} className='me-2' />
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className='col-lg-4'>
          <div className='card border-0 bg-light rounded-4 shadow-sm sticky-top' style={{ top: '100px' }}>
            <div className='card-body p-4'>
              <h5 className='card-title mb-4'>Order Summary</h5>

              <div className='d-flex justify-content-between mb-2'>
                <span>Subtotal:</span>
                <span>{formatCurrency(total)}</span>
              </div>

              <div className='d-flex justify-content-between mb-3 pb-3 border-bottom'>
                <span>Tax:</span>
                <span>{formatCurrency(0)}</span>
              </div>

              <div className='d-flex justify-content-between mb-4'>
                <span className='fw-bold fs-5'>Total:</span>
                <span className='fw-bold fs-5'>{formatCurrency(total)}</span>
              </div>

              <button
                className='btn btn-primary w-100 mb-2'
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </button>

              <button
                className='btn btn-outline-secondary w-100'
                onClick={clearCart}
              >
                Clear Cart
              </button>

              <div className='mt-4 pt-3 border-top'>
                <Link to='/courses/frontend' className='text-decoration-none'>
                  ← Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
