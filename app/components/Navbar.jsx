import { Link } from 'react-router'
import { faLightbulb } from '../utils/faIcons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useTheme } from '../context/ThemeContext'

export default function Navbar() {
  const { theme, toggleTheme } = useTheme()

  return (
    <nav className={`navbar navbar-expand bg-${theme}-subtle sticky-top`}>
      <div className='container-fluid'>
        <ul className='navbar-nav ml-auto align-items-center'>
          <li className='navbar-brand'>
            <Link
              to='/'
              className='nav-link '
            >
             <b>MicroCode</b> 
            </Link>
          </li>
        </ul>
        <ul className='navbar-nav ms-auto align-items-center'>
          <li className='nav-item'>
            <Link
              to='/'
              className='nav-link'
            >
              Inicio
            </Link>
          </li>
          <li className='nav-item'>
            <Link
              to='/users'
              className='nav-link'
            >
              Perfil
            </Link>
          </li>
          <li className='nav-item'>
            <Link
              to='/contact'
              className='nav-link'
            >
              Contacto
            </Link>
          </li>
          <li className='nav-item'>
            <Link
              to='/test'
              className='nav-link'
            >
              Login
            </Link>
          </li>
          <li className='nav-item'>
            <button
              className={`btn btn-outline-${
                theme === 'dark' ? 'light' : 'dark'
              } border-0 p-1 mx-2`}
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
