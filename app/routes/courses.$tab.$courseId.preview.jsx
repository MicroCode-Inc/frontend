import { useLoaderData, useParams } from 'react-router'
import { useAuth } from '../context/AuthContext'
import { apiRequest } from '../utils/api'
import { isCourseOwned } from '../utils/helpers'
import PurchaseButton from '../components/PurchaseButton'

export async function loader({ params }) {
  const { courseId } = params
  const response = await apiRequest(`/courses/${courseId}`)
  const json = await response.json()

  return json
}

export default function CoursePreview() {
  const data = useLoaderData()
  const { tab } = useParams()
  const { user } = useAuth()
  const owned = isCourseOwned(data.id, user?.owned_courses)

  return (
    <div className='container page-transition'>
      <div className='bg-body d-grid gap-3 mt-3'>
        <img
          className='img-fluid rounded-4'
          src={data.image_url || 'https://placehold.co/1920x420'}
          alt={data.image_alt || data.name}
        />
        <div className='d-flex align-items-start gap-3 px-5 pt-5'>
          <div className='flex-grow-1'>
            <h1 className='display-4'>{data.name}</h1>
            <p className='fs-5 text-muted'>{data.description}</p>
          </div>
        </div>

        {/* Preview content with fade effect */}
        <div className='position-relative px-5 mt-3'>
          <div
            className='fs-4 fw-light d-flex flex-column gap-4'
            style={{
              maxHeight: '500px',
              overflow: 'hidden',
              position: 'relative'
            }}
          >
            {data.content &&
              data.content.slice(0, 2).map((e, i) => (
                <div key={i}>
                  {e.title && <h3 className='fs-2 fw-bold mb-3'>{e.title}</h3>}
                  {e.body && <p className='mb-5'>{e.body}</p>}
                  {e.expected_output && (
                    <>
                      <h4 className='fw-bold'>Expected Output</h4>
                      <p className='mb-5'>{e.expected_output}</p>
                      <h3 className='fs-2 fw-bold mb-3'>Instructions</h3>
                      <ol>
                        {e.instructions.slice(0, 3).map((f, i) => (
                          <li
                            className='mb-3'
                            key={i * 10}
                          >
                            {f}
                          </li>
                        ))}
                      </ol>
                    </>
                  )}
                </div>
              ))}
          </div>

          {/* Fade overlay */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '200px',
              background:
                'linear-gradient(to bottom, transparent, var(--bs-secondary))',
              pointerEvents: 'none'
            }}
          ></div>
        </div>

        {/* Purchase section */}
        <div className='card border-0 bg-secondary rounded-4 shadow-sm my-4'>
          <div className='card-body p-5 text-center'>
            <h3 className='mb-3'>Want to see more?</h3>
            <p className='text-muted mb-4'>
              Purchase this course to access the full content and start
              learning!
            </p>
            <div className='d-flex justify-content-center'>
              <PurchaseButton
                course={data}
                variant='detail'
                tab={tab}
                showPreview={false}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
