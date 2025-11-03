import { Link, useNavigate } from 'react-router'
import { useAuth } from '../context/AuthContext'

export default function Logout() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className='container align-self-center page-transition'>
      <div className='row justify-content-center'>
        <div className='col-12 col-md- col-lg-6'>
          <div className='card border-0 bg-dark-subtle p-4 rounded-4'>
            <div className='card-body text-center'>
              <p className='display-5 mb-4'>Would you like to logout?</p>
              <div className='d-flex gap-3 justify-content-center'>
                <Link
                  to='/'
                  className='btn btn-primary btn-lg px-5'
                >
                  Home
                </Link>
                <button
                  className='btn btn-danger btn-lg px-5'
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
