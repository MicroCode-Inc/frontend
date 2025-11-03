import { Link, useLocation } from 'react-router'
import { faLightbulb } from '../utils/faIcons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useTheme } from '../context/ThemeContext'
import routes from '../routes'
import { useEffect, useRef } from 'react'

export default function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()
  const navRoutes = routes.filter(e => e.showInNav)
  const navbarRef = useRef(null)

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

  const handleLoginClick = () => {
    const navbar = navbarRef.current
    const collapse = navbar?.querySelector('.navbar-collapse')

    if (collapse && collapse.classList.contains('show')) {
      const toggler = navbar.querySelector('.navbar-toggler')
      toggler?.click()
    }
  }

  return (
    <nav
      className='navbar navbar-expand-lg bg-dark-subtle sticky-top z-3 p-2 shadow'
      ref={navbarRef}
    >
      <div className='container-fluid p-0'>
        <Link
          to='/'
          className='navbar-brand fw-bold'
        >
          MicroCode
        </Link>
        <div className='d-flex align-items-center gap-2 order-lg-last'>
          {navRoutes
            .filter(route => route.path === '/login')
            .map(({ path, label }) => {
              const isActive = location.pathname === path
              return (
                <Link
                  to={path}
                  className={`btn ${
                    isActive ? 'btn-primary' : 'btn-success'
                  } text-capitalize`}
                  key={label}
                  onClick={handleLoginClick}
                >
                  {label}
                </Link>
              )
            })}
          <button
            className={`btn btn-outline-${
              theme === 'dark' ? 'light' : 'dark'
            } border-0 p-1 fs-5`}
            onClick={toggleTheme}
          >
            <FontAwesomeIcon icon={faLightbulb} />
          </button>
          <button
            className='navbar-toggler'
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
          <ul className='nav nav-pills mx-auto gap-1 fw-bold flex-column flex-lg-row align-items-end align-items-lg-center mt-3 mt-lg-0'>
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
                      className={`nav-link text-capitalize ${
                        isActive ? 'active' : 'text-body'
                      }`}
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
