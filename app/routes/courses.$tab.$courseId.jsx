import { useLoaderData } from 'react-router'
import { useAuth } from '../context/AuthContext'
import { apiRequest, apiDownload } from '../utils/api'
import { isCourseOwned } from '../utils/helpers'
import PurchaseButton from '../components/PurchaseButton'
import ReactMarkdown from 'react-markdown'

export async function loader({ params }) {
  const { courseId } = params
  const response = await apiRequest(`/courses/${courseId}`)
  const json = await response.json()

  return json
}

export default function Course() {
  const data = useLoaderData()
  const { user } = useAuth()
  const content = data.content
  const owned = isCourseOwned(data.id, user?.owned_courses)

  return (
    <div className='container page-transition'>
      <div className='bg-body d-grid gap-3 mt-3'>
        <img
          className='img-fluid rounded-4'
          src={data.image_header || 'https://placehold.co/1920x420'}
          alt={data.image_alt || data.name}
        />
        <div className='d-flex align-items-start gap-3 px-5 pt-5'>
          <div className='flex-grow-1'>
            <h1 className='display-4'>{data.name}</h1>
            <p className='fs-5 text-muted'>{data.description}</p>
          </div>
          <div className='flex-shrink-0'>
            {owned ? (
              <div className='btn-group dropup'>
                <button
                  type='button'
                  className='btn btn-primary btn-lg dropdown-toggle'
                  data-bs-toggle='dropdown'
                  aria-expanded='false'
                >
                  Download as PDF
                </button>
                <ul className='dropdown-menu'>
                  <li>
                    <a
                      className='dropdown-item'
                      href='#'
                      onClick={async e => {
                        e.preventDefault()
                        try {
                          await apiDownload(
                            `/courses/${data.id}/download-pdf?theme=light`,
                            `${data.name.replace(/\s+/g, '_')}_light.pdf`
                          )
                        } catch (error) {
                          console.error('Error downloading PDF:', error)
                          alert('Failed to download PDF. Please try again.')
                        }
                      }}
                    >
                      Light Mode
                    </a>
                  </li>
                  <li>
                    <a
                      className='dropdown-item'
                      href='#'
                      onClick={async e => {
                        e.preventDefault()
                        try {
                          await apiDownload(
                            `/courses/${data.id}/download-pdf?theme=dark`,
                            `${data.name.replace(/\s+/g, '_')}_dark.pdf`
                          )
                        } catch (error) {
                          console.error('Error downloading PDF:', error)
                          alert('Failed to download PDF. Please try again.')
                        }
                      }}
                    >
                      Dark Mode
                    </a>
                  </li>
                </ul>
              </div>
            ) : (
              <PurchaseButton
                course={data}
                variant='detail'
                showPreview={false}
              />
            )}
          </div>
        </div>

        {/* Show content only if user owns the course */}
        {owned ? (
          <div className='fs-4 fw-light d-flex flex-column gap-4 px-5 mt-3'>
            {content &&
              content.map((e, i) => (
                <div key={i}>
                  {/* {e.title && <h3 className='fs-2 fw-bold mb-3'>{e.title}</h3>} */}
                  {e.body && (
                    <div className='mb-5'>
                      <ReactMarkdown>{e.body}</ReactMarkdown>
                    </div>
                  )}
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
        ) : (
          <div className='alert alert-info mt-4'>
            <h4 className='alert-heading'>Course Content Locked</h4>
            <p>
              Purchase this course to access the full content and start
              learning!
            </p>
            <hr />
            <p className='mb-0'>
              You'll get lifetime access to all course materials, exercises, and
              updates.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
