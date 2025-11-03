import { NavLink, Outlet, useParams } from 'react-router'

export default function Courses() {
  const tabs = ['frontend', 'backend', 'sql', 'git']
  const { tab } = useParams()

  return (
    <div
      className='container page-transition'
      style={{ maxHeight: 'calc(100vh - 56px)' }}
    >
      <div className='row justify-content-center'>
        <div className='col-12 col-lg-8'>
          <div
            className='rounded-4 d-flex flex-column'
            style={{ maxHeight: 'calc(100vh - 56px)' }}
          >
            <ul className='nav nav-pills bg-dark-subtle flex-shrink-0 rounded-3 p-2 mb-3 d-flex gap-1'>
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
              <Outlet key={tab} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
