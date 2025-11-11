import { Link, useLoaderData, useParams } from 'react-router'
import { useAuth } from '../context/AuthContext'
import PurchaseButton from '../components/PurchaseButton'
import { useState, useEffect } from 'react'
import { apiRequest, apiDownload } from '../utils/api'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeartSolid, faHeartRegular } from '../utils/faIcons'
import { isCourseOwned } from '../utils/helpers'

export async function loader({ params }) {
  const { tab } = params
  const response = await apiRequest(`/courses/${tab}`)
  const json = await response.json()

  // Fetch all courses to build a lookup map for requirements
  const allCoursesResponse = await apiRequest(`/courses`)
  const allCoursesJson = await allCoursesResponse.json()

  // Create a map of course ID to course data
  const courseLookup = {}
  allCoursesJson.courses.forEach(course => {
    courseLookup[course.id] = course
  })

  return { courses: json.courses, courseLookup }
}

export default function CourseTab() {
  const { courses, courseLookup } = useLoaderData()
  const { tab } = useParams()
  const { isLoggedIn, user } = useAuth()
  const [favoriteCourses, setFavoriteCourses] = useState(
    user?.favourite_courses || []
  )

  const handleFavoriteToggle = (courseId, isFavorited) => {
    setFavoriteCourses(prev =>
      isFavorited ? [...prev, courseId] : prev.filter(id => id !== courseId)
    )
  }

  // Handle scrolling to anchor when hash changes
  useEffect(() => {
    const hash = window.location.hash
    if (hash) {
      const elementId = hash.substring(1) // Remove the # character
      setTimeout(() => {
        const element = document.getElementById(elementId)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' })
          // Open the accordion
          const accordionButton = element.querySelector('.accordion-button')
          if (
            accordionButton &&
            accordionButton.classList.contains('collapsed')
          ) {
            accordionButton.click()
          }
        }
      }, 100)
    }
  }, [tab])

  const renderSummary = summary => {
    if (!summary) return null

    return (
      <div className='container-fluid p-0 d-grid gap-4'>
        <div className='card bg-secondary-subtle rounded-4 border-0 shadow'>
          <div className='card-header h4 border-0 rounded-top-4 p-3'>Goal</div>
          <div className='card-body shadow rounded-bottom-4 p-3'>
            {summary.goal}
          </div>
        </div>
        <div className='card bg-secondary-subtle rounded-4 border-0 shadow'>
          <div className='card-header border-0 h4 rounded-top-4 shadow p-3'>
            Syllabus
          </div>
          <div className='card-body p-0'>
            <ol className='list-group list-group-numbered rounded-4'>
              {summary.syllabus.map((item, idx) => (
                <li
                  className='list-group-item bg-secondary-subtle py-3 border-0 rounded-top-0 shadow'
                  key={idx}
                >
                  {item}
                </li>
              ))}
            </ol>
          </div>
        </div>
        {summary.requirements && summary.requirements.length > 0 && (
          <div className='card bg-secondary-subtle rounded-4 border-0 shadow'>
            <div className='card-header border border-0 h4 rounded-top-4 p-3'>
              Requirements
            </div>
            <div className='card-body p-0'>
              <ul className='list-group rounded-4 rounded-top-0'>
                {summary.requirements.map((reqId, idx) => {
                  const reqCourse = courseLookup[reqId]
                  if (!reqCourse) {
                    // Fallback if course not found in lookup
                    return (
                      <li
                        className='list-group-item bg-secondary-subtle p-3 border-0 shadow'
                        key={idx}
                      >
                        Course {reqId}
                      </li>
                    )
                  }

                  // Determine which tab the required course belongs to
                  const reqTab = reqCourse.category || 'frontend'

                  // Generate anchor ID from course name (same as accordion ID)
                  const anchorId = reqCourse.name.replace(/\s+/g, '-')

                  return (
                    <Link
                      className='list-group-item list-group-item-action bg-secondary-subtle text-body p-3 border-0 shadow'
                      to={`/courses/${reqTab}#${anchorId}`}
                      key={idx}
                    >
                      {reqCourse.name}
                    </Link>
                  )
                })}
              </ul>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div
      className='accordion d-grid gap-3 tab-stagger pt-3'
      id='accordionCourses'
    >
      {courses.map(course => {
        const isFavorited = favoriteCourses.includes(course.id)
        const anchorId = course.name.replace(/\s+/g, '-')
        const owned = isCourseOwned(course.id, user?.owned_courses)

        return (
          <div
            id={anchorId}
            className='accordion-item border-0 bg-light rounded-4 overflow-hidden position-relative'
            key={course.id}
          >
            <span className='accordion-header'>
              <div className='d-flex align-items-stretch'>
                <div className='card border-0 bg-transparent flex-grow-1'>
                  <div
                    className='row g-0'
                    style={{ minHeight: '200px' }}
                  >
                    <div className='col-auto align-self-stretch d-flex'>
                      <img
                        src={course.image_url || 'https://placehold.co/200x200'}
                        className='rounded-start-4'
                        style={{
                          width: '200px',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                        alt={course.image_alt || course.name}
                      />
                    </div>
                    <div className='col'>
                      <div className='card-body h-100 py-2 px-3 d-flex flex-column justify-content-between'>
                        <div>
                          <h5 className='card-title mb-2'>{course.name}</h5>
                          <p
                            className='card-text mb-2'
                            style={{
                              display: '-webkit-box',
                              WebkitLineClamp: '2',
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis'
                            }}
                          >
                            {course.description}
                          </p>
                        </div>
                        <div className='d-flex flex-column gap-1'>
                          {course.tags && course.tags.length > 0 && (
                            <div className='d-flex gap-1 flex-wrap mb-3 mt-2'>
                              {course.tags.map((tag, i) => (
                                <span
                                  key={i}
                                  className='badge'
                                  style={{
                                    backgroundColor: tag.color || '#6c757d'
                                  }}
                                >
                                  {tag.label || tag.name}
                                </span>
                              ))}
                            </div>
                          )}
                          <div
                            className='d-flex align-items-center gap-2 justify-content-start flex-shrink-0'
                            style={{ pointerEvents: 'auto' }}
                          >
                            <PurchaseButton
                              course={course}
                              showBuyNow={false}
                              variant='card'
                              tab={tab}
                            />
                            {owned && (
                              <div className='btn-group dropup'>
                                <button
                                  type='button'
                                  className='btn btn-primary dropdown-toggle'
                                  data-bs-toggle='dropdown'
                                  aria-expanded='false'
                                  onClick={e => {
                                    e.preventDefault()
                                    e.stopPropagation()
                                  }}
                                >
                                  PDF
                                </button>
                                <ul className='dropdown-menu'>
                                  <li>
                                    <a
                                      className='dropdown-item'
                                      href='#'
                                      onClick={async e => {
                                        e.preventDefault()
                                        e.stopPropagation()
                                        try {
                                          await apiDownload(
                                            `/courses/${course.id}/download-pdf?theme=light`,
                                            `${course.name.replace(
                                              /\s+/g,
                                              '_'
                                            )}_light.pdf`
                                          )
                                        } catch (error) {
                                          console.error(
                                            'Error downloading PDF:',
                                            error
                                          )
                                          alert(
                                            'Failed to download PDF. Please try again.'
                                          )
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
                                        e.stopPropagation()
                                        try {
                                          await apiDownload(
                                            `/courses/${course.id}/download-pdf?theme=dark`,
                                            `${course.name.replace(
                                              /\s+/g,
                                              '_'
                                            )}_dark.pdf`
                                          )
                                        } catch (error) {
                                          console.error(
                                            'Error downloading PDF:',
                                            error
                                          )
                                          alert(
                                            'Failed to download PDF. Please try again.'
                                          )
                                        }
                                      }}
                                    >
                                      Dark Mode
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            )}
                            {isLoggedIn && (
                              <button
                                className={`btn ms-auto ${
                                  isFavorited
                                    ? 'btn-danger'
                                    : 'btn-outline-danger'
                                }`}
                                onClick={e => {
                                  e.preventDefault()
                                  e.stopPropagation()
                                  // Trigger the favorite toggle logic
                                  const endpoint = `/users/${
                                    user.id
                                  }/favourite-courses${
                                    isFavorited ? `/${course.id}` : ''
                                  }`
                                  const method = isFavorited ? 'DELETE' : 'POST'
                                  const body = !isFavorited
                                    ? JSON.stringify({ course_id: course.id })
                                    : undefined

                                  apiRequest(endpoint, { method, body })
                                    .then(res => res.json())
                                    .then(updatedUser => {
                                      const token =
                                        localStorage.getItem('token')
                                      if (token) {
                                        localStorage.setItem(
                                          'user',
                                          JSON.stringify(updatedUser)
                                        )
                                      }
                                      handleFavoriteToggle(
                                        course.id,
                                        !isFavorited
                                      )
                                    })
                                }}
                              >
                                <FontAwesomeIcon
                                  icon={
                                    isFavorited ? faHeartSolid : faHeartRegular
                                  }
                                />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  className='accordion-button collapsed bg-transparent border-0 shadow-none ps-0'
                  type='button'
                  data-bs-toggle='collapse'
                  data-bs-target={`#${anchorId}-collapse`}
                  aria-expanded='false'
                  aria-controls={`${anchorId}-collapse`}
                  style={{ width: '48px', flexShrink: 0 }}
                ></button>
              </div>
            </span>

            {/* Collapsible content that expands below */}
            <div
              id={`${anchorId}-collapse`}
              className='accordion-collapse collapse'
              data-bs-parent='#accordionCourses'
            >
              <div className='accordion-body p-5'>
                {renderSummary(course.summary)}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
