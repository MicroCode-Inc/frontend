import { Link } from 'react-router'
import { faLightbulb } from '../utils/faIcons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useTheme } from '../context/ThemeContext'

export default function Navbar() {
  const { toggleTheme } = useTheme()

  return (
    <nav className={`navbar navbar-expand bg-dark-subtle`}>
      <div className='container-fluid'>
        <ul className='navbar-nav ms-auto align-items-center'>
          <li className='nav-item'>
            <Link
              to='/'
              className='nav-link'
            >
              Home
            </Link>
          </li>{' '}
          <li className='nav-item'>
            <Link
              to='/about'
              className='nav-link'
            >
              About
            </Link>
          </li>
          <li className='nav-item'>
            <Link
              to='/contact'
              className='nav-link'
            >
              Contact
            </Link>
          </li>
          <li className='nav-item'>
            <button
              className={`nav-link`}
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
