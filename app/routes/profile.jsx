import { Link, useNavigate, useLoaderData, useRevalidator } from 'react-router'
import { useAuth } from '../context/AuthContext'
import { useState } from 'react'
import ProfilePictureUpload from '../components/ProfilePictureUpload'
import DeleteSavedItemButton from '../components/DeleteSavedItemButton'
import { apiRequest } from '../utils/api'

// Use clientLoader to access localStorage (browser-only)
export async function clientLoader() {
  const user = JSON.parse(localStorage.getItem('user') || '{}')

  if (!user.id) {
    return {
      ownedCourses: [],
      favouriteCourses: [],
      savedBlogs: []
    }
  }

  try {
    // Fetch user data with expanded details
    const response = await apiRequest(`/users/${user.id}?expand=true`)

    if (!response.ok) {
      throw new Error('Failed to fetch user data')
    }

    const userData = await response.json()

    return {
      ownedCourses: userData.owned_courses || [],
      favouriteCourses: userData.favourite_courses || [],
      savedBlogs: userData.saved_blogs || []
    }
  } catch (error) {
    console.error('Error fetching user data:', error)
    return {
      ownedCourses: [],
      favouriteCourses: [],
      savedBlogs: []
    }
  }
}

// Hydrate the client loader on page load
clientLoader.hydrate = true

export default function Profile() {
  const { user, logout, login } = useAuth()
  const navigate = useNavigate()
  const { ownedCourses, favouriteCourses, savedBlogs } = useLoaderData()
  const revalidator = useRevalidator()

  // put favs and blogs in state so we can remove on click
  const [favCoursesState, setFavCoursesState] = useState(favouriteCourses)
  const [savedBlogsState, setSavedBlogsState] = useState(savedBlogs)

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const handleProfilePictureUpdate = updatedUser => {
    const token = localStorage.getItem('token')
    if (token) {
      login(token, updatedUser)
    }
    revalidator.revalidate()
  }

  const sections = [
    {
      id: 'collapseOne',
      title: 'Owned Courses',
      badgeColor: 'success',
      count: ownedCourses.length,
      items: ownedCourses.map(course => ({
        id: course.id,
        title: course.name,
        description: course.description,
        linkPath: `/courses/${course.topic}/${course.id}`,
        imgUrl: course.image_url || 'https://placehold.co/175',
        imgAlt: course.image_alt || course.name,
        tags: course.tags || [],
        removable: false, // owned, so no trash
        type: 'course'
      }))
    },
    {
      id: 'collapseTwo',
      title: 'Favourited Courses',
      badgeColor: 'primary',
      count: favCoursesState.length,
      items: favCoursesState.map(course => ({
        id: course.id,
        title: course.name,
        description: course.description,
        linkPath: `/courses/${course.topic}/${course.id}`,
        imgUrl: course.image_url || 'https://placehold.co/175',
        imgAlt: course.image_alt || course.name,
        tags: course.tags || [],
        removable: true,
        type: 'course'
      }))
    },
    {
      id: 'collapseThree',
      title: 'Saved Blogs',
      badgeColor: 'warning',
      count: savedBlogsState.length,
      items: savedBlogsState.map(blog => ({
        id: blog.id,
        title: blog.title,
        description: blog.description,
        linkPath: `/blog/${blog.id}`,
        imgUrl: blog.image_url || 'https://placehold.co/400x300',
        imgAlt: blog.image_alt || blog.title,
        tags: blog.tags || [],
        removable: true,
        type: 'blog'
      }))
    }
  ]

  return (
    <div className='container page-transition'>
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
          <div className='d-flex bg-dark-subtle p-4 rounded-4 mt-4 mb-5 shadow position-relative'>
            <button
              className='btn btn-secondary position-absolute top-0 end-0 m-3'
              onClick={handleLogout}
            >
              Logout
            </button>
            <div className='row g-4 justify-content-center justify-content-md-start w-100'>
              <div className='col-12 col-md-auto d-flex justify-content-center'>
                <ProfilePictureUpload
                  user={user}
                  onUpdate={handleProfilePictureUpdate}
                />
              </div>
              <div className='col-12 col-md'>
                <div className='d-flex flex-column justify-content-center align-items-center align-items-md-start h-100'>
                  <h2 className='text-capitalize'>
                    {user?.username || 'User Name'}
                  </h2>
                  <h4>{user?.email || 'email@address.com'}</h4>
                  <p className='text-secondary fs-5 m-0'>
                    {user?.created_at
                      ? `Joined on ${new Date(
                          user.created_at
                        ).toLocaleDateString()}`
                      : 'Joined on 10/12/2024'}
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
                    {section.items.length === 0 ? (
                      <div className='text-center py-5'>
                        <p className='text-muted fs-5'>
                          No {section.title.toLowerCase()} yet
                        </p>
                      </div>
                    ) : (
                      <div className='row row-cols-1 g-3'>
                        {section.items.map(item => (
                          <div
                            className='col'
                            key={item.id}
                          >
                            <div className='position-relative'>
                              {/* card */}
                              <Link
                                className='card border-0 bg-secondary-subtle text-decoration-none rounded-4 shadow'
                                to={item.linkPath}
                              >
                                <div className='row g-0'>
                                  <div className='col-auto'>
                                    <img
                                      src={item.imgUrl}
                                      className='img-fluid rounded-start-4'
                                      style={{
                                        width: '200px',
                                        height: '200px',
                                        objectFit: 'cover'
                                      }}
                                      alt={item.imgAlt}
                                    />
                                  </div>
                                  <div className='col'>
                                    <div className='card-body h-100 align-content-center py-3 d-flex flex-column justify-content-between'>
                                      <h5 className='card-title'>
                                        {item.title}
                                      </h5>
                                      <p className='card-text m-0'>
                                        {item.description}
                                      </p>
                                      {item.tags && item.tags.length > 0 && (
                                        <div className='d-flex gap-1 mt-2'>
                                          {item.tags.map((tag, tagIndex) => (
                                            <span
                                              className='badge text-capitalize'
                                              style={{
                                                backgroundColor: tag.color
                                              }}
                                              key={`${item.title}-${tag.label}-${tagIndex}`}
                                            >
                                              {tag.label}
                                            </span>
                                          ))}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </Link>

                              {/* show delete button only for favourited / saved */}
                              {item.removable && item.type === 'course' && (
                                <DeleteSavedItemButton
                                  itemId={item.id}
                                  itemType='course'
                                  onRemove={id =>
                                    setFavCoursesState(prev =>
                                      prev.filter(c => c.id !== id)
                                    )
                                  }
                                />
                              )}
                              {item.removable && item.type === 'blog' && (
                                <DeleteSavedItemButton
                                  itemId={item.id}
                                  itemType='blog'
                                  onRemove={id =>
                                    setSavedBlogsState(prev =>
                                      prev.filter(b => b.id !== id)
                                    )
                                  }
                                />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
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
