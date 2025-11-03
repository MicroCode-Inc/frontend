import { Link } from 'react-router'

export default function Profile() {
  const sections = [
    {
      id: 'collapseOne',
      title: 'Owned Courses',
      badgeColor: 'success',
      count: 8,
      linkPath: '/courses/frontend/0',
      items: Array(8).fill({
        title: 'Card title',
        description:
          'This is a wider card with supporting text below as a natural lead-in to additional content.'
      })
    },
    {
      id: 'collapseTwo',
      title: 'Favourited Courses',
      badgeColor: 'primary',
      count: 8,
      linkPath: '/courses/frontend/0',
      items: Array(8).fill({
        title: 'Card title',
        description:
          'This is a wider card with supporting text below as a natural lead-in to additional content.'
      })
    },
    {
      id: 'collapseThree',
      title: 'Saved Blogs',
      badgeColor: 'warning',
      count: 8,
      linkPath: '/blog/0',
      items: Array(8).fill({
        title: 'Card title',
        description:
          'This is a wider card with supporting text below as a natural lead-in to additional content.'
      })
    }
  ]
  return (
    <div className='container'>
      <style>{`
        .accordion-item:last-child .accordion-button.collapsed {
          border-radius: 0 0 1.5rem 1.5rem !important;
        }
        .accordion-item:last-child:has(.accordion-collapse.show) {
          border-radius: 0 !important;
        }
        .accordion-item:last-child .accordion-body {
          border-radius: 0 0 1.5rem 1.5rem;
        }
      `}</style>
      <div className='row justify-content-center'>
        <div className='col-12 col-lg-8'>
          <div className='d-flex bg-dark-subtle p-4 rounded-4 mt-4 mb-5 shadow'>
            <div className='row row-cols-1 row-cols-sm-2 g-4 g-sm-3 justify-content-center justify-content-md-start'>
              <div className='col-auto'>
                <img
                  className='img-thumbnail rounded-circle'
                  src='https://placehold.co/200'
                  alt='User profile'
                />
              </div>
              <div className='col'>
                <div className='d-flex flex-column justify-content-center align-items-center align-items-sm-start h-100'>
                  <h2>User Name</h2>
                  <h4>email@address.com</h4>
                  <p className='text-secondary fs-5 m-0'>
                    Joined on 10/12/2024
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            className='accordion rounded-4 shadow'
            id='accordionExample'
          >
            {sections.map((section, sectionIndex) => (
              <div
                className={`accordion-item bg-dark-subtle border-0 ${
                  sectionIndex === 0
                    ? 'rounded-top-4'
                    : sectionIndex === 2
                    ? 'rounded-bottom-4'
                    : ''
                }`}
                key={section.id}
              >
                <h2 className='accordion-header'>
                  <button
                    className={`accordion-button bg-dark-subtle fs-4 collapsed border-0 ${
                      sectionIndex === 0 ? 'rounded-top-4' : ''
                    }`}
                    type='button'
                    data-bs-toggle='collapse'
                    data-bs-target={`#${section.id}`}
                    aria-expanded={sectionIndex === 0 ? 'true' : 'false'}
                    aria-controls={section.id}
                  >
                    <span
                      className={`badge text-bg-${section.badgeColor} me-3`}
                    >
                      {section.count}
                    </span>
                    {section.title}
                  </button>
                </h2>
                <div
                  id={section.id}
                  className='accordion-collapse collapse'
                  data-bs-parent='#accordionExample'
                >
                  <div className='accordion-body p-4'>
                    <div className='row row-cols-1 row-cols-lg-2 g-3'>
                      {section.items.map((item, itemIndex) => (
                        <div
                          className='col'
                          key={itemIndex}
                        >
                          <Link
                            className='card border-0 bg-secondary-subtle text-decoration-none rounded-4 shadow'
                            to={section.linkPath}
                          >
                            <div className='row g-0'>
                              <div className='col-auto'>
                                <img
                                  src='https://placehold.co/175'
                                  className='img-fluid rounded-start-4 h-100'
                                  alt={item.title}
                                />
                              </div>
                              <div className='col'>
                                <div className='card-body h-100 align-content-center py-3 d-flex flex-column justify-content-between'>
                                  <h5 className='card-title'>{item.title}</h5>
                                  <p className='card-text m-0'>
                                    {item.description}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
