import { useLoaderData } from 'react-router'
import { apiRequest } from '../utils/api'

export async function loader({ params }) {
  const { courseId } = params
  const response = await apiRequest(`/courses/${courseId}`)
  const json = await response.json()

  return json
}

export default function Course() {
  const data = useLoaderData()
  const content = data.content
  console.log(content)

  return (
    <div className='container page-transition'>
      <div className='bg-secondary d-grid gap-3'>
        <img
          className='img-fluid mt-3'
          src='https://placehold.co/1920x420'
        />
        <div className='d-flex'>
          <h1 className='display-4'>{data.name}</h1>
          <h3 className='fw-light ms-auto'>{data.created_at}</h3>
        </div>
        <div>{/* <h2 className='fs-4 fw-light'>{data.description}</h2> */}</div>
        <div className='fs-4 fw-light d-flex flex-column gap-4'>
          {data.content &&
            data.content.map((e, i) => (
              <div key={i}>
                {e.title && <h3 className='fs-2 fw-bold mb-3'>{e.title}</h3>}
                {e.body && <p className='mb-5'>{e.body}</p>}
                {e.expected_output && (
                  <>
                    <h4 className='fw-bold'>Expected Output</h4>
                    <p className='mb-5'>{e.expected_output}</p>
                    <h3 className='fs-2 fw-bold mb-3'>Instructions</h3>
                    <ol>
                      {e.instructions.map((f, i) => (
                        <li
                          className='mb-3'
                          key={i * 10}
                        >
                          {f}
                        </li>
                      ))}
                    </ol>
                    <h3 className='fs-2 fw-bold mb-3'>Congratulations!</h3>
                    {e.conclusion && <p>{e.conclusion}</p>}
                  </>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
