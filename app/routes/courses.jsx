import { NavLink, Outlet } from 'react-router'

export default function Courses() {
  const tabs = ['frontend', 'backend', 'sql', 'git']

  return (
    <div className='container'>
      <ul className='nav nav-pills'>
        {tabs.map(tab => (
          <li
            className='nav-item'
            key={tab}
          >
            <NavLink
              to={`/courses/${tab}`}
              className='nav-link text-capitalize'
            >
              {tab}
            </NavLink>
          </li>
        ))}
      </ul>

      <div className='tab-content'>
        <Outlet />
      </div>
    </div>
  )
}
