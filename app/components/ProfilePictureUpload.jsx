// src/components/ProfilePictureUpload.jsx
import { useState, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPlus,
  faRefresh,
  faTrash,
  faSpinner
} from '@fortawesome/free-solid-svg-icons'
import ActionModal from './ActionModal'
import { apiUpload, apiRequest, API_BASE_URL } from '../utils/api'

export default function ProfilePictureUpload({ user, onUpdate }) {
  const [uploading, setUploading] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [activeModal, setActiveModal] = useState(null) // 'upload' | 'delete' | null
  const fileInputRef = useRef(null)

  const handleFileSelect = e => {
    const file = e.target.files[0]
    if (!file) return

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

    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB')
      return
    }

    const reader = new FileReader()
    reader.onloadend = () => setPreviewUrl(reader.result)
    reader.readAsDataURL(file)
    handleUpload(file)
  }

  const handleUpload = async file => {
    setUploading(true)
    setError(null)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const data = await apiUpload(`/upload/profile-picture/${user.id}`, formData)

      const updatedUser = data.user
      localStorage.setItem('user', JSON.stringify(updatedUser))
      if (onUpdate) onUpdate(updatedUser)
      setPreviewUrl(null)
    } catch (err) {
      setError(err.message || 'Failed to upload image')
      setPreviewUrl(null)
    } finally {
      setUploading(false)
    }
  }

  const confirmDelete = async () => {
    setDeleting(true)
    setError(null)

    try {
      const response = await apiRequest(
        `/upload/profile-picture/${user.id}`,
        { method: 'DELETE' }
      )
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Delete failed')

      const updatedUser = data.user
      localStorage.setItem('user', JSON.stringify(updatedUser))
      if (onUpdate) onUpdate(updatedUser)
    } catch (err) {
      setError(err.message || 'Failed to delete image')
    } finally {
      setDeleting(false)
    }
  }

  const triggerFileInput = () => fileInputRef.current?.click()
  const handleConfirmUpload = () => triggerFileInput()

  const currentPicture =
    previewUrl ||
    (user?.profile_picture
      ? `${API_BASE_URL}${user.profile_picture}`
      : null)

  const hasPhoto = Boolean(user?.profile_picture || previewUrl)

  return (
    <>
      <div className='d-flex flex-column align-items-center gap-3'>
        <div
          className='position-relative rounded-circle overflow-hidden border'
          style={{ width: 200, height: 200 }}
        >
          <img
            src={currentPicture || 'https://placehold.co/200?text=No+Photo'}
            alt='User profile'
            className='w-100 h-100'
            style={{
              opacity: uploading || deleting ? 0.5 : 1,
              transition: 'opacity 0.2s ease'
            }}
          />

          {(uploading || deleting) && (
            <div className='position-absolute top-50 start-50 translate-middle'>
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

          {/* bottom overlay inside circle */}
          <div className='position-absolute bottom-0 start-0 w-100 d-flex justify-content-center align-items-center gap-3 bg-dark bg-opacity-75 py-1'>
            {/* Upload / Change -> open modal */}
            <button
              type='button'
              className='bg-transparent border-0 p-0 text-white'
              title={hasPhoto ? 'Change photo' : 'Add photo'}
              data-bs-toggle='modal'
              data-bs-target='#profilePictureActionModal'
              onClick={() => setActiveModal('upload')}
              disabled={uploading || deleting}
            >
              <FontAwesomeIcon icon={hasPhoto ? faRefresh : faPlus} />
            </button>

            {hasPhoto && (
              <button
                type='button'
                className='bg-transparent border-0 p-0 text-danger'
                title='Delete photo'
                data-bs-toggle='modal'
                data-bs-target='#profilePictureActionModal'
                onClick={() => setActiveModal('delete')}
                disabled={uploading || deleting}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            )}
          </div>
        </div>

        {error && (
          <div className='alert alert-danger mb-0 w-100 text-center'>
            {error}
          </div>
        )}
      </div>

      {/* Reusable modal, content depends on activeModal */}
      <ActionModal
        id='profilePictureActionModal'
        title={
          activeModal === 'delete'
            ? 'Delete Profile Picture'
            : 'Upload Profile Picture'
        }
        confirmText={activeModal === 'delete' ? 'Delete' : 'Confirm'}
        confirmVariant={activeModal === 'delete' ? 'danger' : 'success'}
        onConfirm={
          activeModal === 'delete' ? confirmDelete : handleConfirmUpload
        }
      >
        {activeModal === 'delete' ? (
          <>
            <p className='fs-5 mb-1'>
              Are you sure you want to delete your profile picture?
            </p>
            <p className='mb-0'>
              This action cannot be undone. You can upload a new one later.
            </p>
          </>
        ) : (
          <>
            <p className='fs-5 mb-1'>
              Please select an image that meets the following requirements:
            </p>
            <ul className='mb-0'>
              <li>Formats: PNG, JPG, JPEG, GIF, WebP</li>
              <li>Maximum size: 5MB</li>
              <li>Square / centered images look best</li>
            </ul>
          </>
        )}
      </ActionModal>
    </>
  )
}
