import { useCallback } from 'react'
import { apiDownload } from '../utils/api'

export default function PDFDownloadButton({
  courseId,
  courseName,
  className = 'btn btn-primary',
  label = 'Download as PDF',
  stopPropagation = false
}) {
  const handleDownload = useCallback(async (theme, e) => {
    e.preventDefault()
    if (stopPropagation) {
      e.stopPropagation()
    }
    try {
      const fileName = `${courseName.replace(/\s+/g, '_')}_${theme}.pdf`
      await apiDownload(`/courses/${courseId}/download-pdf?theme=${theme}`, fileName)
    } catch (error) {
      const errorMessage = error.message || 'Failed to download PDF. Please try again.'
      alert(errorMessage)
    }
  }, [courseId, courseName, stopPropagation])

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
          <a
            className='dropdown-item'
            href='#'
            onClick={(e) => handleDownload('light', e)}
          >
            Light Mode
          </a>
        </li>
        <li>
          <a
            className='dropdown-item'
            href='#'
            onClick={(e) => handleDownload('dark', e)}
          >
            Dark Mode
          </a>
        </li>
      </ul>
    </div>
  )
}
