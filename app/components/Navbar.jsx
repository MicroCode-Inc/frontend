import { Link, useLocation } from 'react-router'
import { faLightbulb } from '../utils/faIcons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useTheme } from '../context/ThemeContext'
import routes from '../routes'

export default function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()
  const navRoutes = routes.filter(e => e.showInNav)

  return (
    <nav className='navbar navbar-expand bg-dark-subtle sticky-top z-3'>
      <div className='container-fluid'>
        <ul className='navbar-nav ml-auto align-items-center'>
          <li className='navbar-brand'>
            <Link
              to='/'
              className='nav-link'
            >
              <b>MicroCode</b>
            </Link>
          </li>
        </ul>
        <ul className='nav nav-pills ms-auto align-items-center gap-1'>
          {navRoutes.map(({ path, label, navTo }) => {
            const linkPath = navTo || path
            const isActive = location.pathname === linkPath

            return (
              <li
                className='nav-item'
                key={label}
              >
                <Link
                  to={linkPath}
                  className={`text-capitalize ${
                    path === '/login'
                      ? 'btn btn-success mx-2'
                      : `nav-link text-body ${isActive ? 'active' : ''}`
                  }`}
                >
                  {label}
                </Link>
              </li>
            )
          })}
          <li className='nav-item'>
            <button
              className='btn border-0 p-1 fs-5 text-body'
              onClick={toggleTheme}
            >
              <FontAwesomeIcon icon={faLightbulb} />
            </button>
          </li>
        </ul>
      </div>
    </nav>
  )
}
