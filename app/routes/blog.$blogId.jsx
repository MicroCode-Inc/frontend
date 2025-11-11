import { useLoaderData } from 'react-router'
import { useAuth } from '../context/AuthContext'
import { apiRequest } from '../utils/api'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons'
import ReactMarkdown from 'react-markdown'

export async function loader({ params }) {
  const { blogId } = params
  const response = await apiRequest(`/blogs/${blogId}`)
  const json = await response.json()
  return json
}

export default function BlogPage() {
  const data = useLoaderData()
  const { user, isLoggedIn } = useAuth()
  const [isFavorited, setIsFavorited] = useState(
    user?.saved_blogs?.includes(data.id) || false
  )

  const handleFavoriteToggle = async () => {
    const endpoint = `/users/${user.id}/saved-blogs${
      isFavorited ? `/${data.id}` : ''
    }`
    const method = isFavorited ? 'DELETE' : 'POST'
    const body = !isFavorited ? JSON.stringify({ blog_id: data.id }) : undefined

    try {
      const response = await apiRequest(endpoint, { method, body })
      const updatedUser = await response.json()
      const token = localStorage.getItem('token')
      if (token) {
        localStorage.setItem('user', JSON.stringify(updatedUser))
      }
      setIsFavorited(!isFavorited)
    } catch (error) {
      console.error('Error toggling favorite:', error)
    }
  }

  return (
    <div className='container page-transition'>
      <div className='bg-body d-grid gap-3 mt-3'>
        <img
          className='img-fluid rounded-4'
          src={data.image_url || 'https://placehold.co/1920x420'}
          alt={data.image_alt || data.title}
        />
        <div className='d-flex align-items-start gap-3 px-5 pt-5'>
          <div className='flex-grow-1'>
            <h1 className='display-4'>{data.title}</h1>
            <p className='fs-5 text-muted'>
              <span className='fw-light'>Written by</span> {data.author_name}
              {data.publication_date && (
                <span className='ms-3 text-secondary'>
                  {new Date(data.publication_date).toLocaleDateString()}
                </span>
              )}
            </p>
            {data.description && (
              <p className='fs-5 text-muted'>{data.description}</p>
            )}
          </div>
          <div className='flex-shrink-0'>
            {isLoggedIn && (
              <button
                className={`btn btn-lg ${
                  isFavorited ? 'btn-danger' : 'btn-outline-danger'
                }`}
                onClick={handleFavoriteToggle}
              >
                <FontAwesomeIcon
                  icon={isFavorited ? faHeartSolid : faHeartRegular}
                />
              </button>
            )}
          </div>
        </div>
        <div className='fs-4 fw-light d-flex flex-column gap-4 px-5 mt-3 pb-5'>
          {data.content && <ReactMarkdown>{data.content}</ReactMarkdown>}
        </div>
      </div>
    </div>
  )
}
