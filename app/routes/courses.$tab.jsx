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
      id='main-accordion'
    >
      {data.map(({ name }) => (
        <div
          className='accordion-item'
          key={name}
        >
          <h2 className='accordion-header'>
            <button
              className='accordion-button'
              type='button'
              data-bs-toggle='collapse'
              data-bs-target={`#collapse-${name}`}
              aria-expanded='true'
              aria-controls={`collapse-${name}`}
            >
              {name}
            </button>
          </h2>
          <div
            id={`collapse-${name}`}
            className='accordion-collapse collapse'
            data-bs-parent='#main-accordion'
          >
            <div className='accordion-body'>
              <strong>This is the first item's accordion body.</strong> It is
              shown by default, until the collapse plugin adds the appropriate
              classes that we use to style each element.
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
