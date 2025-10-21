import { useLoaderData, useParams } from 'react-router'

export async function loader({ params }) {
  const { tab } = params
  const courses = {
    frontend: [
      { name: 'react basics' },
      { name: 'css basics' },
      { name: 'html basics' },
      { name: 'javascript basics' }
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

  return (
    <div
      className='accordion'
      id='accordionCourses'
    >
      {data.map(({ name }, i) => (
        <div
          className='accordion-item border-0 my-3 bg-dark-subtle rounded'
          key={name.replace(' ', '-')}
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
                      className='img-fluid rounded-start'
                    />
                  </div>
                  <div className='col'>
                    <div className='card-body h-100 align-content-center'>
                      <h5 className='card-title'>Card title</h5>
                      <p className='card-text'>
                        This is a wider card with supporting text below as a
                        natural lead-in to additional content. This content is a
                        little bit longer.
                      </p>
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
            <div className='accordion-body'>
              <strong>This is the first item’s accordion body.</strong> It is
              shown by default, until the collapse plugin adds the appropriate
              classes that we use to style each element. These classes control
              the overall appearance, as well as the showing and hiding via CSS
              transitions. You can modify any of this with custom CSS or
              overriding our default variables. It’s also worth noting that just
              about any HTML can go within the <code>.accordion-body</code>,
              though the transition does limit overflow.
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
