import { NavLink, Outlet, useParams } from 'react-router'

export default function Courses() {
  const tabs = ['frontend', 'backend', 'database', 'git']
  const { tab } = useParams()

  return (
    <div
      className='container page-transition'
      style={{ height: '100%' }}
    >
      <div
        className='row justify-content-center mt-3'
        style={{ height: '100%' }}
      >
        <div
          className='col-12 col-lg-8 rounded-4 px-4 py-4 d-flex flex-column bg-secondary bg-opacity-90'
          style={{ height: '100%' }}
        >
          {/* Static nav pills */}
          <div
            className='flex-shrink-0 z-2'
            style={{ width: '102%', transform: 'translateX(-1%)' }}
          >
            <ul className='nav nav-pills bg-light flex-shrink-0 rounded-3 p-2 d-flex gap-1 shadow'>
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
          </div>

          {/* Scrollable content container */}
          <div
            className='flex-grow-1'
            style={{ overflowY: 'auto' }}
          >
            <Outlet key={tab} />
          </div>
        </div>
      </div>
    </div>
  )
}
