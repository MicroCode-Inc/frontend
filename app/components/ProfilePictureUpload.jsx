import { useState, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera, faTrash, faSpinner } from '@fortawesome/free-solid-svg-icons'

export default function ProfilePictureUpload({ user, onUpdate }) {
  const [uploading, setUploading] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const fileInputRef = useRef(null)

  const handleFileSelect = e => {
    const file = e.target.files[0]
    if (!file) return

    // Validate file type
    const allowedTypes = [
      'image/png',
      'image/jpeg',
      'image/jpg',
      'image/gif',
      'image/webp'
    ]
    if (!allowedTypes.includes(file.type)) {
      setError('Please select a valid image file (PNG, JPG, GIF, or WebP)')
      return
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB')
      return
    }

    // Show preview
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreviewUrl(reader.result)
    }
    reader.readAsDataURL(file)

    // Upload file
    handleUpload(file)
  }

  const handleUpload = async file => {
    setUploading(true)
    setError(null)

    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch(
        `http://127.0.0.1:5000/upload/profile-picture/${user.id}`,
        {
          method: 'POST',
          body: formData
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Upload failed')
      }

      // Update user in localStorage
      const updatedUser = data.user
      localStorage.setItem('user', JSON.stringify(updatedUser))

      // Call parent update callback
      if (onUpdate) {
        onUpdate(updatedUser)
      }

      setPreviewUrl(null)
    } catch (err) {
      setError(err.message || 'Failed to upload image')
      setPreviewUrl(null)
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async () => {
    if (
      !window.confirm('Are you sure you want to delete your profile picture?')
    ) {
      return
    }

    setDeleting(true)
    setError(null)

    try {
      const response = await fetch(
        `http://127.0.0.1:5000/upload/profile-picture/${user.id}`,
        {
          method: 'DELETE'
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Delete failed')
      }

      // Update user in localStorage
      const updatedUser = data.user
      localStorage.setItem('user', JSON.stringify(updatedUser))

      // Call parent update callback
      if (onUpdate) {
        onUpdate(updatedUser)
      }
    } catch (err) {
      setError(err.message || 'Failed to delete image')
    } finally {
      setDeleting(false)
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const currentPicture =
    previewUrl ||
    (user?.profile_picture
      ? `http://127.0.0.1:5000${user.profile_picture}`
      : 'https://placehold.co/200')

  return (
    <div className='d-flex flex-column align-items-center gap-3'>
      <div className='position-relative'>
        <img
          className='img-thumbnail rounded-circle'
          src={currentPicture}
          alt='User profile'
          style={{
            width: '200px',
            height: '200px',
            objectFit: 'cover',
            opacity: uploading || deleting ? 0.5 : 1
          }}
        />

        {(uploading || deleting) && (
          <div
            className='position-absolute top-50 start-50 translate-middle'
            style={{ zIndex: 10 }}
          >
            <FontAwesomeIcon
              icon={faSpinner}
              spin
              className='fs-1 text-primary'
            />
          </div>
        )}

        <input
          ref={fileInputRef}
          type='file'
          accept='image/png,image/jpeg,image/jpg,image/gif,image/webp'
          onChange={handleFileSelect}
          className='d-none'
        />
      </div>

      {error && (
        <div className='alert alert-danger mb-0 w-100 text-center animate-shake'>
          {error}
        </div>
      )}

      <div className='d-flex gap-2'>
        <button
          className='btn btn-primary'
          onClick={triggerFileInput}
          disabled={uploading || deleting}
        >
          <FontAwesomeIcon
            icon={faCamera}
            className='me-2'
          />
          {user?.profile_picture ? 'Change Picture' : 'Upload Picture'}
        </button>

        {user?.profile_picture && (
          <button
            className='btn btn-danger'
            onClick={handleDelete}
            disabled={uploading || deleting}
          >
            <FontAwesomeIcon
              icon={faTrash}
              className='me-2'
            />
            Delete
          </button>
        )}
      </div>

      <small className='text-muted text-center'>
        Accepted formats: PNG, JPG, GIF, WebP
        <br />
        Max size: 5MB
      </small>
    </div>
  )
}
