import { NavLink, Outlet } from 'react-router'

export default function Courses() {
  const tabs = ['frontend', 'backend', 'sql', 'git']

  return (
    <div
      className='container'
      style={{ maxHeight: 'calc(100vh - 56px)' }}
    >
      <div
        className='bg-dark-subtle p-4 rounded-4 d-flex flex-column'
        style={{ maxHeight: '100%' }}
      >
        <ul className='nav nav-pills flex-shrink-0 pb-4'>
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

        <div className='overflow-auto'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
