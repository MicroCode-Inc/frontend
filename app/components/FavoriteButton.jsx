// app/components/FavoriteButton.jsx
import { useState, memo, useCallback } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeartSolid, faHeartRegular } from '../utils/faIcons'
import { useAuth } from '../context/AuthContext'
import { apiRequest } from '../utils/api'
import { updateUserInStorage } from '../utils/helpers'

function FavoriteButton({
  itemId,
  itemType,
  isFavorited,
  onToggle
}) {
  const [isLoading, setIsLoading] = useState(false)
  const { user, login } = useAuth()

  const handleClick = useCallback(async (e) => {
    e.preventDefault()
    e.stopPropagation()

    if (!user) return

    setIsLoading(true)

    try {
      const endpoint =
        itemType === 'course'
          ? `/users/${user.id}/favourite-courses${
              isFavorited ? `/${itemId}` : ''
            }`
          : `/users/${user.id}/saved-blogs${isFavorited ? `/${itemId}` : ''}`

      const method = isFavorited ? 'DELETE' : 'POST'
      const body = !isFavorited
        ? JSON.stringify({
            [itemType === 'course' ? 'course_id' : 'blog_id']: itemId
          })
        : undefined

      const response = await apiRequest(endpoint, {
        method,
        body
      })

      if (!response.ok) {
        throw new Error('Failed to update favorite')
      }

      const updatedUser = await response.json()

      const token = localStorage.getItem('token')
      if (token) {
        updateUserInStorage(updatedUser)
        login(token, updatedUser)
      }

      if (onToggle) {
        onToggle(!isFavorited)
      }
    } catch (error) {
      console.error('Error toggling favorite:', error)
    } finally {
      setIsLoading(false)
    }
  }, [user, itemType, isFavorited, itemId, login, onToggle])

  return (
    <button
      className={`btn btn-sm ${
        isFavorited ? 'btn-danger' : 'btn-outline-danger'
      } position-absolute bottom-0 start-0 m-2 z-3 border-0`}
      onClick={handleClick}
      disabled={isLoading}
      title={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
      style={{
        opacity: isLoading ? 0.6 : 1,
        transition: 'all 0.2s ease',
        borderRadius: '12px'
      }}
    >
      <FontAwesomeIcon
        icon={isFavorited ? faHeartSolid : faHeartRegular}
        className={isLoading ? 'animate-pulse' : ''}
      />
    </button>
  )
}

export default memo(FavoriteButton)
