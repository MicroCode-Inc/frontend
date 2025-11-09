import { useState } from 'react'
import { useLoaderData, useNavigate } from 'react-router'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { formatCurrency, calculateFinalPrice } from '../utils/helpers'
import { purchaseCourses } from '../services/purchaseApi'
import { apiRequest } from '../utils/api'

export async function loader() {
  const response = await apiRequest('/courses')
  const json = await response.json()
  return { courses: json.courses }
}

export default function Checkout() {
  const { courses } = useLoaderData()
  const { cart, clearCart } = useCart()
  const { user, login } = useAuth()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  })
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState(null)

  // Filter courses that are in the cart
  const cartCourses = courses.filter(course => cart.includes(course.id))

  // Calculate total
  const total = cartCourses.reduce((sum, course) => {
    return sum + calculateFinalPrice(course.price, course.discount)
  }, 0)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const validateForm = () => {
    if (!formData.cardNumber || formData.cardNumber.length < 16) {
      setError('Please enter a valid 16-digit card number')
      return false
    }
    if (!formData.cardName || formData.cardName.trim().length < 3) {
      setError('Please enter cardholder name')
      return false
    }
    if (!formData.expiryDate || !/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
      setError('Please enter expiry date in MM/YY format')
      return false
    }
    if (!formData.cvv || formData.cvv.length !== 3) {
      setError('Please enter 3-digit CVV')
      return false
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    // Skip validation for demo purposes
    // if (!validateForm()) {
    //   return
    // }

    if (cartCourses.length === 0) {
      setError('Your cart is empty')
      return
    }

    setProcessing(true)

    try {
      // Mock payment processing delay
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Call purchase API
      const response = await purchaseCourses(cart)

      // Update user context with new owned_courses
      const token = localStorage.getItem('token')
      login(token, response.user)

      // Clear cart
      clearCart()

      // Redirect to first invoice
      if (response.invoice_numbers && response.invoice_numbers.length > 0) {
        navigate(`/invoice/${response.invoice_numbers[0]}`)
      } else {
        navigate('/profile')
      }
    } catch (err) {
      setError(err.message || 'Payment failed. Please try again.')
      setProcessing(false)
    }
  }

  if (cartCourses.length === 0) {
    return (
      <div className='container page-transition'>
        <div className='row justify-content-center'>
          <div className='col-md-8 text-center py-5'>
            <h1 className='display-4 mb-4'>No Items to Checkout</h1>
            <p className='lead mb-4'>
              Your cart is empty. Add some courses before checking out!
            </p>
            <button onClick={() => navigate('/courses/frontend')} className='btn btn-primary btn-lg'>
              Browse Courses
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='container page-transition py-4'>
      <h1 className='display-4 mb-4'>Checkout</h1>

      <div className='row'>
        <div className='col-lg-7'>
          <div className='card border-0 bg-light rounded-4 shadow-sm mb-4'>
            <div className='card-body p-4'>
              <h5 className='card-title mb-4'>Payment Information</h5>
              <p className='text-muted mb-4'>
                <small>This is a mock payment system for demonstration purposes. No real charges will be made. All fields are optional - you can leave them empty or enter any values.</small>
              </p>

              <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                  <label htmlFor='cardNumber' className='form-label'>Card Number <span className='text-muted'>(optional)</span></label>
                  <input
                    type='text'
                    className='form-control'
                    id='cardNumber'
                    name='cardNumber'
                    placeholder='1234 5678 9012 3456 (optional)'
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    maxLength='16'
                    disabled={processing}
                  />
                </div>

                <div className='mb-3'>
                  <label htmlFor='cardName' className='form-label'>Cardholder Name <span className='text-muted'>(optional)</span></label>
                  <input
                    type='text'
                    className='form-control'
                    id='cardName'
                    name='cardName'
                    placeholder='John Doe (optional)'
                    value={formData.cardName}
                    onChange={handleInputChange}
                    disabled={processing}
                  />
                </div>

                <div className='row'>
                  <div className='col-md-6 mb-3'>
                    <label htmlFor='expiryDate' className='form-label'>Expiry Date <span className='text-muted'>(optional)</span></label>
                    <input
                      type='text'
                      className='form-control'
                      id='expiryDate'
                      name='expiryDate'
                      placeholder='MM/YY (optional)'
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      maxLength='5'
                      disabled={processing}
                    />
                  </div>

                  <div className='col-md-6 mb-3'>
                    <label htmlFor='cvv' className='form-label'>CVV <span className='text-muted'>(optional)</span></label>
                    <input
                      type='text'
                      className='form-control'
                      id='cvv'
                      name='cvv'
                      placeholder='123 (optional)'
                      value={formData.cvv}
                      onChange={handleInputChange}
                      maxLength='3'
                      disabled={processing}
                    />
                  </div>
                </div>

                {error && (
                  <div className='alert alert-danger' role='alert'>
                    {error}
                  </div>
                )}

                <button
                  type='submit'
                  className='btn btn-primary w-100 btn-lg'
                  disabled={processing}
                >
                  {processing ? (
                    <>
                      <span className='spinner-border spinner-border-sm me-2' role='status' aria-hidden='true'></span>
                      Processing Payment...
                    </>
                  ) : (
                    `Complete Purchase - ${formatCurrency(total)}`
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className='col-lg-5'>
          <div className='card border-0 bg-light rounded-4 shadow-sm sticky-top' style={{ top: '100px' }}>
            <div className='card-body p-4'>
              <h5 className='card-title mb-4'>Order Summary</h5>

              <div className='mb-3'>
                {cartCourses.map(course => {
                  const finalPrice = calculateFinalPrice(course.price, course.discount)
                  return (
                    <div key={course.id} className='d-flex justify-content-between mb-2'>
                      <span className='text-truncate me-2'>{course.name}</span>
                      <span className='text-nowrap'>{formatCurrency(finalPrice)}</span>
                    </div>
                  )
                })}
              </div>

              <div className='border-top pt-3'>
                <div className='d-flex justify-content-between mb-2'>
                  <span>Subtotal:</span>
                  <span>{formatCurrency(total)}</span>
                </div>

                <div className='d-flex justify-content-between mb-3'>
                  <span>Tax:</span>
                  <span>{formatCurrency(0)}</span>
                </div>

                <div className='d-flex justify-content-between'>
                  <span className='fw-bold fs-5'>Total:</span>
                  <span className='fw-bold fs-5'>{formatCurrency(total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
