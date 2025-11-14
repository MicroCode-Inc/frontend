import { useCallback } from 'react'
import { apiDownload } from '../utils/api'
import AsyncButton from './AsyncButton'

export default function PDFDownloadButton({
  courseId,
  courseName,
  className = 'btn btn-primary',
  label = 'Download as PDF',
  stopPropagation = false
}) {
  const handleButtonClick = useCallback((e) => {
    if (stopPropagation) {
      e.preventDefault()
      e.stopPropagation()
    }
  }, [stopPropagation])

  return (
    <div className='btn-group dropup'>
      <button
        type='button'
        className={`${className} dropdown-toggle`}
        data-bs-toggle='dropdown'
        aria-expanded='false'
        onClick={handleButtonClick}
      >
        {label}
      </button>
      <ul className='dropdown-menu'>
        <li>
          <AsyncButton
            onClick={async (e) => {
              e.preventDefault()
              if (stopPropagation) {
                e.stopPropagation()
              }
              const fileName = `${courseName.replace(/\s+/g, '_')}_light.pdf`
              await apiDownload(`/courses/${courseId}/download-pdf?theme=light`, fileName)
            }}
            className='dropdown-item text-start border-0'
            loadingText='Downloading...'
          >
            Light Mode
          </AsyncButton>
        </li>
        <li>
          <AsyncButton
            onClick={async (e) => {
              e.preventDefault()
              if (stopPropagation) {
                e.stopPropagation()
              }
              const fileName = `${courseName.replace(/\s+/g, '_')}_dark.pdf`
              await apiDownload(`/courses/${courseId}/download-pdf?theme=dark`, fileName)
            }}
            className='dropdown-item text-start border-0'
            loadingText='Downloading...'
          >
            Dark Mode
          </AsyncButton>
        </li>
      </ul>
    </div>
  )
}
