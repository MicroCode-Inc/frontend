import { Link, useLoaderData } from 'react-router'
import { useAuth } from '../context/AuthContext'
import { useState } from 'react'
import { apiRequest } from '../utils/api'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons'

export async function loader() {
  const response = await apiRequest('/blogs')
  const json = await response.json()
  return json
}

export default function Blog() {
  const blogs = useLoaderData()
  const { isLoggedIn, user } = useAuth()
  const [savedBlogs, setSavedBlogs] = useState(user?.saved_blogs || [])

  const handleFavoriteToggle = (blogId, isFavorited) => {
    setSavedBlogs(prev =>
      isFavorited ? [...prev, blogId] : prev.filter(id => id !== blogId)
    )
  }

  return (
    <div className='container page-transition'>
      <div className='row justify-content-center mt-3'>
        <div className='col-12 col-lg-8 bg-body rounded-4 p-4'>
          {/* <h1 className='my-4'>Blogs</h1> */}
          <div className='d-grid gap-3 tab-stagger'>
            {blogs.map(
              ({
                id,
                title,
                author_name,
                publication_date,
                description,
                tags,
                image_url,
                image_alt
              }) => {
                const isFavorited = savedBlogs.includes(id)

                return (
                  <Link
                    key={id}
                    className='card border-0 bg-dark-subtle text-decoration-none rounded-4 shadow d-block'
                    to={`/blog/${id}`}
                  >
                    <div
                      className='row g-0'
                      style={{ minHeight: '200px' }}
                    >
                      <div className='col-auto align-self-stretch d-flex'>
                        <img
                          src={image_url || 'https://placehold.co/200x200'}
                          className='rounded-start-4'
                          style={{
                            width: '200px',
                            height: '100%',
                            objectFit: 'cover'
                          }}
                          alt={image_alt || title}
                        />
                      </div>
                      <div className='col'>
                        <div className='card-body h-100 py-2 px-3 d-flex flex-column justify-content-between'>
                          <div>
                            <div className='d-flex'>
                              <div className='d-grid'>
                                <h5 className='card-title mb-1'>{title}</h5>
                                <h6 className=''>
                                  <span className='fw-light'>Written by</span>{' '}
                                  {author_name}
                                </h6>
                              </div>
                              <span className='ms-auto text-secondary'>
                                {new Date(
                                  publication_date
                                ).toLocaleDateString()}
                              </span>
                            </div>
                            <p className='card-text mb-2'>{description}</p>
                          </div>
                          <div className='d-flex align-items-center gap-2'>
                            {tags && tags.length > 0 && (
                              <div className='d-flex gap-1 flex-wrap'>
                                {tags.map((tag, tagIndex) => (
                                  <span
                                    className='badge text-capitalize'
                                    style={{
                                      backgroundColor: tag.color || '#6c757d'
                                    }}
                                    key={`${title}-${
                                      tag.label || tag.name
                                    }-${tagIndex}`}
                                  >
                                    {tag.label || tag.name}
                                  </span>
                                ))}
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
                                  const endpoint = `/users/${
                                    user.id
                                  }/saved-blogs${isFavorited ? `/${id}` : ''}`
                                  const method = isFavorited ? 'DELETE' : 'POST'
                                  const body = !isFavorited
                                    ? JSON.stringify({ blog_id: id })
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
                                      handleFavoriteToggle(id, !isFavorited)
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
                  </Link>
                )
              }
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
