import { Link, useLoaderData } from 'react-router'
import { useAuth } from '../context/AuthContext'
import FavoriteButton from '../components/FavoriteButton'
import { useState } from 'react'

export async function loader() {
  const response = await fetch('http://127.0.0.1:5000/blogs')
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
      <div className='row justify-content-center'>
        <div className='col-12 col-lg-8'>
          <h1 className='my-4'>Blogs</h1>
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
                  <div
                    key={id}
                    className='position-relative'
                  >
                    {isLoggedIn && (
                      <FavoriteButton
                        itemId={id}
                        itemType='blog'
                        isFavorited={isFavorited}
                        onToggle={newState =>
                          handleFavoriteToggle(id, newState)
                        }
                      />
                    )}

                    <Link
                      className='card border-0 bg-dark-subtle text-decoration-none rounded-4 shadow d-block'
                      to={`/blog/${id}`}
                    >
                      <div className='row g-0'>
                        <div className='col-auto'>
                          <img
                            src={image_url || 'https://placehold.co/400x300'}
                            className='img-fluid rounded-start-4'
                            style={{
                              width: '175px',
                              height: '175px',
                              objectFit: 'cover'
                            }}
                            alt={image_alt || title}
                          />
                        </div>
                        <div className='col'>
                          <div className='card-body h-100 align-content-center py-3 d-flex flex-column justify-content-between'>
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
                            <p className='card-text'>{description}</p>
                            {tags && tags.length > 0 && (
                              <div className='d-flex gap-1'>
                                {tags.map((tag, tagIndex) => (
                                  <span
                                    className='badge text-capitalize'
                                    style={{ backgroundColor: tag.color }}
                                    key={`${title}-${tag.label}-${tagIndex}`}
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
                  </div>
                )
              }
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
