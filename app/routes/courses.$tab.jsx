import { Link, useLoaderData, useParams } from 'react-router'
import { useAuth } from '../context/AuthContext'
import FavoriteButton from '../components/FavoriteButton'
import { useState } from 'react'

export async function loader({ params }) {
  const { tab } = params
  const response = await fetch(`http://127.0.0.1:5000/courses/${tab}`)
  const json = await response.json()

  // Fetch all courses to build a lookup map for requirements
  const allCoursesResponse = await fetch(`http://127.0.0.1:5000/courses`)
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
                  return (
                    <Link
                      className='list-group-item list-group-item-action bg-secondary-subtle text-body p-3 border-0 shadow'
                      to={`/courses/${tab}/${reqId}`}
                      key={idx}
                    >
                      {reqCourse ? reqCourse.name : `Course ${reqId}`}
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
    <div className='accordion d-grid gap-3 tab-stagger pt-3'>
      {courses.map(course => {
        const isFavorited = favoriteCourses.includes(course.id)
        const anchorId = course.name.replace(/\s+/g, '-')

        return (
          <div
            className='accordion-item border-0 bg-dark-subtle rounded-4'
            key={course.id}
          >
            <h2 className='accordion-header'>
              {/* parent for positioning */}
              <div className='position-relative'>
                {/* the actual accordion toggle */}
                <button
                  className='accordion-button rounded text-capitalize p-0 bg-transparent pe-3 shadow-none collapsed'
                  type='button'
                  data-bs-toggle='collapse'
                  data-bs-target={`#${anchorId}`}
                  aria-expanded='false'
                  aria-controls={anchorId}
                >
                  <div className='card border-0 bg-transparent w-100'>
                    <div className='row g-0'>
                      <div className='col-auto'>
                        <img
                          src={
                            course.image_url || 'https://placehold.co/175x175'
                          }
                          className='img-fluid rounded-start-4'
                          style={{
                            width: '175px',
                            height: '175px',
                            objectFit: 'cover'
                          }}
                          alt={course.image_alt || course.name}
                        />
                      </div>
                      <div className='col'>
                        <div className='card-body h-100 align-content-center py-3 d-flex flex-column justify-content-between'>
                          <h5 className='card-title'>{course.name}</h5>
                          <p className='card-text mb-2'>{course.description}</p>
                          {course.tags && course.tags.length > 0 && (
                            <div className='d-flex gap-1'>
                              {course.tags.map((tag, i) => (
                                <span
                                  key={i}
                                  className='badge'
                                  style={{ backgroundColor: tag.color }}
                                >
                                  {tag.label}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </button>

                {/* ✅ overlay button, now a sibling, not nested */}
                {isLoggedIn && (
                  <FavoriteButton
                    itemId={course.id}
                    itemType='course'
                    isFavorited={isFavorited}
                    onToggle={newState =>
                      handleFavoriteToggle(course.id, newState)
                    }
                  />
                )}
              </div>
            </h2>

            <div
              id={anchorId}
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
