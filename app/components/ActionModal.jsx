// src/components/ActionModal.jsx
import { createPortal } from 'react-dom'

export default function ActionModal({
  id,
  title,
  children,
  confirmText = 'Confirm',
  confirmVariant = 'success',
  onConfirm
}) {
  const modalContent = (
    <div
      className='modal fade'
      id={id}
      tabIndex='-1'
      aria-labelledby={id + 'Label'}
      aria-hidden='true'
    >
      <div className='modal-dialog modal-dialog-centered'>
        <div className='modal-content border-0 bg-dark-subtle rounded-4 p-4 pb-3'>
          <div className='modal-header border-0 bg-transparent pt-0'>
            <h5
              className='modal-title fs-4'
              id={id + 'Label'}
            >
              {title}
            </h5>
            <button
              type='button'
              className='btn-close'
              data-bs-dismiss='modal'
              aria-label='Close'
            ></button>
          </div>

          <div className='modal-body bg-secondary-subtle rounded-4 p-4 mb-2'>
            {children}
          </div>

          <div className='modal-footer border-0 bg-transparent p-0'>
            <button
              type='button'
              className='btn btn-secondary me-2'
              data-bs-dismiss='modal'
            >
              Cancel
            </button>
            <button
              type='button'
              className={`btn btn-${confirmVariant} m-0`}
              onClick={onConfirm}
              data-bs-dismiss='modal'
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  return typeof document !== 'undefined'
    ? createPortal(modalContent, document.body)
    : null
}
