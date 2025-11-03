// app/components/DeleteSavedItemButton.jsx
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '../utils/faIcons'
import { useAuth } from '../context/AuthContext'
import { apiRequest } from '../utils/api'

export default function DeleteSavedItemButton({
  itemId,
  itemType, // 'course' | 'blog'
  onRemove
}) {
  const [isLoading, setIsLoading] = useState(false)
  const { user, login } = useAuth()

  const handleClick = async e => {
    e.preventDefault()
    e.stopPropagation()

    if (!user) return

    setIsLoading(true)

    try {
      // match your backend endpoints (same pattern as FavoriteButton)
      const endpoint =
        itemType === 'course'
          ? `/users/${user.id}/favourite-courses/${itemId}`
          : `/users/${user.id}/saved-blogs/${itemId}`

      const response = await apiRequest(endpoint, {
        method: 'DELETE'
      })

      if (!response.ok) {
        throw new Error('Failed to remove item')
      }

      const updatedUser = await response.json()

      // keep auth/localStorage in sync just like FavoriteButton does
      const token = localStorage.getItem('token')
      if (token) {
        localStorage.setItem('user', JSON.stringify(updatedUser))
        login(token, updatedUser)
      }

      if (onRemove) {
        onRemove(itemId)
      }
    } catch (error) {
      console.error('Error removing item:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button
      className='btn btn-sm btn-danger position-absolute bottom-0 start-0 m-2 z-3 border-0'
      onClick={handleClick}
      disabled={isLoading}
      title='Remove from list'
      style={{
        opacity: isLoading ? 0.6 : 1,
        transition: 'all 0.2s ease',
        borderRadius: '12px'
      }}
    >
      <FontAwesomeIcon icon={faTrash} />
    </button>
  )
}
