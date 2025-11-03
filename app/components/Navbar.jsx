import { Link, useLocation, useNavigate } from 'react-router'
import { faLightbulb, faMicroCode } from '../utils/faIcons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useTheme } from '../context/ThemeContext'
import { useAuth } from '../context/AuthContext'
import routes from '../routes'
import { useEffect, useRef, useState } from 'react'

export default function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const { isLoggedIn: loggedIn, user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const navRoutes = routes.filter(e => e.showInNav)
  const navbarRef = useRef(null)
  const brandRef = useRef(null)
  const loginRef = useRef(null)
  const profileRef = useRef(null)
  const navPillsRef = useRef(null)
  const [pillStyle, setPillStyle] = useState({})
  const [pillType, setPillType] = useState('nav')
  const [isNavCollapsed, setIsNavCollapsed] = useState(true)

  useEffect(() => {
    const handleClickOutside = event => {
      const navbar = navbarRef.current
      const collapse = navbar?.querySelector('.navbar-collapse')

      if (collapse && collapse.classList.contains('show')) {
        if (!navbar.contains(event.target)) {
          const toggler = navbar.querySelector('.navbar-toggler')
          toggler?.click()
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    const navbar = navbarRef.current
    const collapse = navbar?.querySelector('.navbar-collapse')

    if (!collapse) return

    const handleCollapse = () => setIsNavCollapsed(true)
    const handleShow = () => setIsNavCollapsed(false)
    const handleCollapsing = () => setIsNavCollapsed(true)

    collapse.addEventListener('hidden.bs.collapse', handleCollapse)
    collapse.addEventListener('shown.bs.collapse', handleShow)
    collapse.addEventListener('hide.bs.collapse', handleCollapsing)

    setIsNavCollapsed(!collapse.classList.contains('show'))

    return () => {
      collapse.removeEventListener('hidden.bs.collapse', handleCollapse)
      collapse.removeEventListener('shown.bs.collapse', handleShow)
      collapse.removeEventListener('hide.bs.collapse', handleCollapsing)
    }
  }, [])

  useEffect(() => {
    const updatePillPosition = () => {
      let activeElement = null
      let containerElement = null
      let newPillType = 'nav'

      if (location.pathname === '/' && brandRef.current) {
        activeElement = brandRef.current
        containerElement = navbarRef.current
        newPillType = 'brand'
      } else if (location.pathname === '/login' && loginRef.current) {
        activeElement = loginRef.current
        containerElement = navbarRef.current
        newPillType = 'login'
      } else if (location.pathname === '/profile' && profileRef.current) {
        activeElement = profileRef.current
        containerElement = navbarRef.current
        newPillType = 'profile'
      } else if (navPillsRef.current) {
        const isMobile = window.innerWidth < 992
        const shouldShowNavPill = !isMobile || !isNavCollapsed

        if (shouldShowNavPill) {
          activeElement = navPillsRef.current.querySelector('.nav-link.active')
          containerElement = navPillsRef.current
          newPillType = 'nav'
        }
      }

      if (activeElement && containerElement) {
        const containerRect = containerElement.getBoundingClientRect()
        const activeRect = activeElement.getBoundingClientRect()
        const navbarRect = navbarRef.current.getBoundingClientRect()

        setPillStyle({
          left: `${activeRect.left - navbarRect.left}px`,
          top: `${activeRect.top - navbarRect.top}px`,
          width: `${activeRect.width}px`,
          height: `${activeRect.height}px`,
          opacity: 1
        })
        setPillType(newPillType)
      } else {
        setPillStyle(prev => ({ ...prev, opacity: 0 }))
      }
    }

    const timer = setTimeout(updatePillPosition, 10)

    window.addEventListener('resize', updatePillPosition)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', updatePillPosition)
    }
  }, [location.pathname, loggedIn, isNavCollapsed])

  const handleLoginClick = () => {
    const navbar = navbarRef.current
    const collapse = navbar?.querySelector('.navbar-collapse')

    if (collapse && collapse.classList.contains('show')) {
      const toggler = navbar.querySelector('.navbar-toggler')
      toggler?.click()
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  // Get profile picture URL
  const profilePictureUrl = user?.profile_picture
    ? `http://127.0.0.1:5000${user.profile_picture}`
    : 'https://placehold.co/50'

  return (
    <nav
      className='navbar navbar-expand-lg bg-dark-subtle sticky-top z-3 p-2 px-5 shadow'
      ref={navbarRef}
    >
      <div
        className={`navbar-sliding-pill navbar-sliding-pill-${pillType}`}
        style={{
          ...pillStyle,
          transition:
            'opacity 0.05s ease, left 0.4s cubic-bezier(0.4, 0, 0.2, 1), top 0.4s cubic-bezier(0.4, 0, 0.2, 1), width 0.4s cubic-bezier(0.4, 0, 0.2, 1), height 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      />

      <div className='container-fluid p-0'>
        <div className='d-flex align-items-center gap-3'>
          <Link
            to='/'
            ref={brandRef}
            className='navbar-brand p-2 py-2 rounded-3 d-flex align-items-center gap-3 border border-2 position-relative'
            style={{
              '--bs-border-color':
                location.pathname === '/' ? 'var(--bs-primary)' : 'transparent',
              transition: 'border-color 0.3s ease',
              zIndex: 2
            }}
          >
            <FontAwesomeIcon
              icon={faMicroCode}
              widthAuto={true}
              className='fs-2 ms-1 text-primary'
            />
            <span className='fs-4 fw-light text-body-emphasis'>MicroCode</span>
          </Link>
        </div>
        <div className='d-flex align-items-center gap-2 order-lg-last'>
          {!loggedIn &&
            navRoutes
              .filter(route => route.path === '/login')
              .map(({ path, label }) => {
                const isActive = location.pathname === path
                return (
                  <Link
                    to={path}
                    ref={loginRef}
                    className={`btn ${
                      isActive ? 'btn-primary' : 'btn-success'
                    } text-capitalize position-relative`}
                    style={{ zIndex: 2 }}
                    key={label}
                    onClick={handleLoginClick}
                  >
                    {label}
                  </Link>
                )
              })}
          {loggedIn && (
            <Link
              to='/profile'
              ref={profileRef}
              className='d-flex align-items-center rounded-circle border border-5 position-relative overflow-hidden'
              style={{
                '--bs-border-color':
                  location.pathname === '/profile'
                    ? 'var(--bs-primary)'
                    : 'transparent',
                transition: 'border-color 0.3s ease',
                zIndex: 2,
                width: '60px',
                height: '60px'
              }}
            >
              <img
                src={profilePictureUrl}
                alt={user?.username || 'Profile'}
                className='w-100 h-100'
                style={{ objectFit: 'cover' }}
              />
            </Link>
          )}
          <button
            className={`btn btn-outline-${
              theme === 'dark' ? 'light' : 'dark'
            } border-0 p-1 fs-5`}
            onClick={toggleTheme}
          >
            <FontAwesomeIcon icon={faLightbulb} />
          </button>
          <button
            className='navbar-toggler border-0 p-1'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarNav'
            aria-controls='navbarNav'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
        </div>
        <div
          className='collapse navbar-collapse'
          id='navbarNav'
        >
          <ul
            className='nav nav-pills nav-pills-animated mx-auto gap-1 fw-bold flex-column flex-lg-row align-items-end align-items-lg-center mt-3 mt-lg-0 position-relative'
            ref={navPillsRef}
          >
            {navRoutes
              .filter(route => route.path !== '/login')
              .map(({ path, label, navTo }) => {
                const linkPath = navTo || path
                const isActive =
                  path === '/'
                    ? location.pathname === path
                    : location.pathname.startsWith(path)
                return (
                  <li
                    className='nav-item'
                    key={label}
                  >
                    <Link
                      to={linkPath}
                      className={`nav-link text-capitalize position-relative ${
                        isActive ? 'active' : 'text-body'
                      }`}
                      style={{ zIndex: 2 }}
                    >
                      {label}
                    </Link>
                  </li>
                )
              })}
          </ul>
        </div>
      </div>
    </nav>
  )
}
