import React, { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router'
import CourseForm from '../../components/CourseForm'
import AsyncButton from '../../components/AsyncButton'
import {
  fetchCourses,
  updateCourse,
  deleteCourse
} from '../../services/adminApi'

export default function AdminCourses() {
  const tabs = ['frontend', 'backend', 'database', 'git']
  const [courses, setCourses] = useState([])
  const [error, setError] = useState(null)
  const [editing, setEditing] = useState(null)
  const [activeTab, setActiveTab] = useState('frontend')
  const { reloadTrigger } = useOutletContext()

  const loadCourses = () => {
    fetchCourses()
      .then(d => setCourses(d.courses ?? d))
      .catch(e => setError(e?.error || 'Error'))
  }

  useEffect(() => {
    loadCourses()
  }, [])

  useEffect(() => {
    if (reloadTrigger > 0) {
      loadCourses()
    }
  }, [reloadTrigger])

  const handleUpdate = async (id, payload) => {
    try {
      const updated = await updateCourse(id, payload)
      setCourses(prev => prev.map(c => (c.id === id ? updated : c)))
    } catch (e) {
      setError(e?.error || 'Error actualizando curso')
    }
  }

  const handleDelete = async id => {
    if (!confirm('Eliminar curso?')) return
    try {
      await deleteCourse(id)
      setCourses(prev => prev.filter(c => c.id !== id))
    } catch (e) {
      setError(e?.error || 'Error eliminando curso')
    }
  }

  const renderSummary = summary => {
    if (!summary) return null

    return (
      <div className='container-fluid p-0 d-grid gap-4'>
        <div className='card bg-secondary-subtle rounded-4 border-0 shadow'>
          <div className='card-header h4 border-0 rounded-top-4 p-3'>Goal</div>
          <div className='card-body shadow rounded-bottom-4 p-3'>
            {summary.goal}
          </div>
        </div>
        <div className='card bg-secondary-subtle rounded-4 border-0 shadow'>
          <div className='card-header border-0 h4 rounded-top-4 shadow p-3'>
            Syllabus
          </div>
          <div className='card-body p-0'>
            <ol className='list-group list-group-numbered rounded-4'>
              {summary.syllabus?.map((item, idx) => (
                <li
                  className='list-group-item bg-secondary-subtle py-3 border-0 rounded-top-0 shadow'
                  key={idx}
                >
                  {item}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    )
  }

  // Filter courses by active tab (topic-based)
  const filteredCourses = courses.filter(
    c => c.topic?.toLowerCase() === activeTab.toLowerCase()
  )

  return (
    <div
      className='d-flex flex-column'
      style={{ height: '100%' }}
    >
      {/* Tab navigation */}
      <div
        className='flex-shrink-0 z-2 pt-3'
        style={{ width: '102%', transform: 'translateX(-1%)' }}
      >
        <ul className='nav nav-pills bg-light flex-shrink-0 rounded-4 p-2 d-flex gap-1 shadow'>
          {tabs.map(tab => (
            <li
              className='nav-item'
              key={tab}
            >
              <button
                className={`nav-link text-capitalize${
                  activeTab === tab ? ' active' : ''
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Scrollable content */}
      <div
        className='flex-grow-1'
        style={{ overflowY: 'auto' }}
      >
        {error && <div className='alert alert-danger mt-3'>{error}</div>}
        <div className='accordion d-grid gap-3 tab-stagger pt-3 px-2' id='accordionAdminCourses'>
          {filteredCourses.length === 0 && (
            <div className='alert alert-info text-center mb-0 mt-3'>
              No hay cursos para {activeTab}.
            </div>
          )}
          {filteredCourses.map(c => {
            const anchorId = `admin-course-${c.id}`
            return (
              <div
                id={anchorId}
                className='accordion-item border-0 bg-light rounded-4 overflow-hidden position-relative'
                key={c.id}
              >
                <span className='accordion-header'>
                  <div className='d-flex align-items-stretch'>
                    <div className='card border-0 bg-transparent flex-grow-1'>
                      <div
                        className='row g-0'
                        style={{ minHeight: '200px' }}
                      >
                        <div className='col-auto align-self-stretch d-flex'>
                          <img
                            src={c.image_url || 'https://placehold.co/200x200'}
                            className='rounded-start-4'
                            style={{
                              width: '200px',
                              height: '100%',
                              objectFit: 'cover'
                            }}
                            alt={c.name}
                          />
                        </div>
                        <div className='col'>
                          <div className='card-body h-100 py-2 px-3 d-flex flex-column justify-content-between'>
                            <div>
                              <h5 className='card-title mb-2'>{c.name}</h5>
                              <p
                                className='card-text mb-2'
                                style={{
                                  display: '-webkit-box',
                                  WebkitLineClamp: '2',
                                  WebkitBoxOrient: 'vertical',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis'
                                }}
                              >
                                {c.description}
                              </p>
                            </div>
                            <div className='d-flex flex-column gap-1'>
                              {c.tags && c.tags.length > 0 && (
                                <div className='d-flex gap-1 flex-wrap mb-3 mt-2'>
                                  {c.tags.map((tag, i) => (
                                    <span
                                      key={i}
                                      className='badge'
                                      style={{
                                        backgroundColor: tag.color || '#6c757d'
                                      }}
                                    >
                                      {tag.label || tag.name}
                                    </span>
                                  ))}
                                </div>
                              )}
                              <div
                                className='d-flex align-items-center gap-2 justify-content-start flex-shrink-0'
                                style={{ pointerEvents: 'auto' }}
                              >
                                <button
                                  className='btn btn-outline-primary'
                                  onClick={e => {
                                    e.preventDefault()
                                    e.stopPropagation()
                                    setEditing(c)
                                  }}
                                >
                                  Editar
                                </button>
                                <AsyncButton
                                  onClick={async e => {
                                    e.preventDefault()
                                    e.stopPropagation()
                                    await handleDelete(c.id)
                                  }}
                                  className='btn btn-outline-danger'
                                  loadingText='Eliminando...'
                                >
                                  Eliminar
                                </AsyncButton>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button
                      className='accordion-button collapsed bg-transparent border-0 shadow-none ps-0'
                      type='button'
                      data-bs-toggle='collapse'
                      data-bs-target={`#${anchorId}-collapse`}
                      aria-expanded='false'
                      aria-controls={`${anchorId}-collapse`}
                      style={{ width: '48px', flexShrink: 0 }}
                    ></button>
                  </div>
                </span>

                {/* Collapsible content that expands below */}
                <div
                  id={`${anchorId}-collapse`}
                  className='accordion-collapse collapse'
                  data-bs-parent='#accordionAdminCourses'
                >
                  <div className='accordion-body p-5'>
                    {renderSummary(c.summary)}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Modal for editing course */}
      {editing !== null && (
        <div
          className='modal show d-block'
          tabIndex='-1'
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
        >
          <div className='modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h5 className='modal-title'>Editar Curso</h5>
                <button
                  type='button'
                  className='btn-close'
                  onClick={() => setEditing(null)}
                ></button>
              </div>
              <div className='modal-body'>
                <CourseForm
                  initial={editing}
                  onSave={async p => {
                    await handleUpdate(editing.id, p)
                    setEditing(null)
                  }}
                  onCancel={() => setEditing(null)}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
