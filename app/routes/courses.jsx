import { NavLink, Outlet, useParams } from 'react-router'

export default function Courses() {
  const tabs = ['frontend', 'backend', 'sql', 'git']
  const { tab } = useParams()

  return (
    <div className='container page-transition'>
      <div className='row justify-content-center'>
        <div className='col-12 col-lg-8'>
          {/* Sticky nav pills */}
          <div
            className='fixed-top bg-body pt-3'
            style={{ top: '76px', zIndex: 2 }}
          >
            <ul className='col-9 mx-auto nav nav-pills bg-dark-subtle flex-shrink-0 rounded-3 p-2 d-flex gap-1 shadow'>
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

          {/* Content scrolls normally with page */}
          <Outlet key={tab} />
        </div>
      </div>
    </div>
  )
}
