import { NavLink, Outlet } from 'react-router'

export default function Courses() {
  const tabs = ['frontend', 'backend', 'sql', 'git']

  return (
    <div className='container mt-4'>
      <h1>Courses</h1>

      <ul className='nav nav-tabs mt-3'>
        {tabs.map(tab => (
          <li
            key={tab}
            className='nav-item'
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

      <div className='tab-content border border-top-0 p-4'>
        <Outlet />
      </div>
    </div>
  )
}
