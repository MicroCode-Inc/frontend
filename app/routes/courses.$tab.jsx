import { Link, useLoaderData, useParams } from 'react-router'

export async function loader({ params }) {
  const { tab } = params
  const courses = {
    frontend: [
      {
        name: 'react basics',
        tags: ['javascript', 'jsx', 'node'],
        description: 'Soft intro to React using a simple template',
        summary: (
          <>
            <div className='card mb-3'>
              <div className='card-header h4'>Goal</div>
              <div className='card-body'>
                You will be able to start building static one-pagers using a
                beginner-friedly template
              </div>
            </div>
            <div className='card border-0 mb-3'>
              <div className='card-header border border-bottom-0 h4'>
                Syllabus
              </div>
              <div className='card-body p-0'>
                <ol className='list-group list-group-numbered rounded-top-0'>
                  <li className='list-group-item px-5'>
                    What is React & why do we need it?
                  </li>
                  <li className='list-group-item px-5'>What is JSX?</li>
                  <li className='list-group-item px-5'>What are Components?</li>
                  <li className='list-group-item px-5'>Template Overview</li>
                  <li className='list-group-item px-5'>
                    Create your first page!
                  </li>
                </ol>
              </div>
            </div>
            <div className='card border-0'>
              <div className='card-header border border-bottom-0 h4'>
                Requirements
              </div>
              <div className='card-body p-0'>
                <ul className='list-group rounded-top-0'>
                  <Link
                    className='list-group-item list-group-item-action px-5'
                    to='/'
                  >
                    HTML Basics
                  </Link>
                  <Link
                    className='list-group-item list-group-item-action px-5'
                    to='/'
                  >
                    CSS Basics
                  </Link>
                  <Link
                    className='list-group-item list-group-item-action px-5'
                    to='/'
                  >
                    Javascript Basics
                  </Link>
                </ul>
              </div>
            </div>
          </>
        )
      },
      {
        name: 'css basics',
        tags: ['css', 'html', 'javascript'],
        description: 'Soft intro to CSS using a simple template'
      },
      {
        name: 'html basics',
        tags: ['html', 'css', 'javascript'],
        description: 'Soft intro to HTML using a simple template'
      },
      {
        name: 'javascript basics',
        tags: ['javascript', 'html', 'css'],
        description: 'Soft intro to Javascript using a simple template'
      }
    ],
    backend: [{ name: 'python basics' }, { name: 'flask basics' }],
    sql: [
      { name: 'sql basics' },
      { name: 'sqlalchemy basics' },
      { name: 'sqlite basics' },
      { name: 'postgresql basics' }
    ],
    git: [
      { name: 'github basics' },
      { name: 'git cli basics' },
      { name: 'github projects basics' }
    ]
  }

  return courses[tab]
}

export default function CourseTab() {
  const data = useLoaderData()
  const { tab } = useParams()

  const getTagColor = label => {
    switch (label) {
      case 'javascript':
        return 'warning'
      case 'node':
        return 'success'
      case 'jsx':
        return 'primary'
      case 'html':
        return 'danger'
      case 'css':
        return 'info'
    }
  }

  return (
    <div
      className='accordion'
      id='accordionCourses'
    >
      {data.map(({ name, description, tags, summary }, i) => (
        <div
          className='accordion-item border-0 my-3 bg-dark-subtle rounded'
          key={name.replace(' ', '-') + `-${i}`}
        >
          <h2 className='accordion-header rounded'>
            <button
              className='accordion-button rounded collapsed text-capitalize p-0 bg-transparent pe-3 shadow-none'
              type='button'
              data-bs-toggle='collapse'
              data-bs-target={`#${name.replace(' ', '-')}`}
              aria-expanded='false'
              aria-controls={`${name.replace(' ', '-')}`}
            >
              <div className='card border-0 bg-transparent'>
                <div className='row g-0'>
                  <div className='col-auto'>
                    <img
                      src='https://placehold.co/150'
                      className='img-fluid rounded-start h-100'
                    />
                  </div>
                  <div className='col'>
                    <div className='card-body h-100 align-content-center py-0'>
                      <h5 className='card-title'>{name}</h5>
                      <p className='card-text'>{description}</p>
                      {tags && (
                        <div className='d-flex gap-1'>
                          {tags.map((label, i) => (
                            <span
                              className={`badge text-bg-${getTagColor(label)}`}
                              key={label + '-' + i}
                            >
                              {label}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </button>
          </h2>
          <div
            id={`${name.replace(' ', '-')}`}
            className='accordion-collapse collapse'
            data-bs-parent='#accordionCourses'
          >
            <div className='accordion-body p-3'>{summary}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
