import React, { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router'
import BlogForm from '../../components/BlogForm'
import AsyncButton from '../../components/AsyncButton'
import { fetchBlogs, updateBlog, deleteBlog } from '../../services/adminApi'

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState([])
  const [editing, setEditing] = useState(null)
  const [error, setError] = useState(null)
  const { reloadTrigger } = useOutletContext()

  const loadBlogs = () => {
    fetchBlogs()
      .then(d => setBlogs(d.blogs ?? d))
      .catch(e => setError(e?.error || 'Error'))
  }

  useEffect(() => {
    loadBlogs()
  }, [])

  useEffect(() => {
    if (reloadTrigger > 0) {
      loadBlogs()
    }
  }, [reloadTrigger])

  const handleUpdate = async (id, p) => {
    try {
      const updated = await updateBlog(id, p)
      setBlogs(prev => prev.map(b => (b.id === id ? updated : b)))
    } catch (e) {
      setError(e?.error || 'Error actualizando blog')
    }
  }
  const handleDelete = async id => {
    if (!confirm('Eliminar publicación?')) return
    try {
      await deleteBlog(id)
      setBlogs(prev => prev.filter(b => b.id !== id))
    } catch (e) {
      setError(e?.error || 'Error eliminando blog')
    }
  }

  return (
    <div>
      {error && <div className='alert alert-danger'>{error}</div>}
      <div className='d-grid gap-3 tab-stagger pt-3'>
        {blogs.length === 0 && (
          <div className='alert alert-info text-center mb-0'>
            No hay publicaciones.
          </div>
        )}
        {blogs.map(b => (
          <div
            key={b.id}
            className='border-0 bg-light rounded-4 overflow-hidden position-relative shadow'
          >
            <div className='card border-0 bg-transparent'>
              <div
                className='row g-0'
                style={{ minHeight: '200px' }}
              >
                <div className='col-auto align-self-stretch d-flex'>
                  <img
                    src={b.image_url || 'https://placehold.co/200x200'}
                    className='rounded-start-4'
                    style={{
                      width: '200px',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                    alt={b.title}
                  />
                </div>
                <div className='col'>
                  <div className='card-body h-100 py-2 px-3 d-flex flex-column justify-content-between'>
                    <div>
                      <h5 className='card-title mb-2'>{b.title}</h5>
                      <p className='card-text mb-2'>
                        {b.excerpt || b.description}
                      </p>
                      <div className='small text-muted'>
                        {b.published_at
                          ? new Date(b.published_at).toLocaleDateString()
                          : ''}{' '}
                        · {b.author_name}
                      </div>
                    </div>
                    <div className='d-flex flex-column gap-1'>
                      {b.tags && b.tags.length > 0 && (
                        <div className='d-flex gap-1 flex-wrap'>
                          {b.tags.map((tag, tagIndex) => (
                            <span
                              className='badge text-capitalize'
                              style={{
                                backgroundColor: tag.color || '#6c757d'
                              }}
                              key={`${b.title}-${
                                tag.label || tag.name
                              }-${tagIndex}`}
                            >
                              {tag.label || tag.name}
                            </span>
                          ))}
                        </div>
                      )}
                      <div className='d-flex align-items-center gap-2 justify-content-start flex-shrink-0 mt-2'>
                        <button
                          className='btn btn-outline-primary'
                          onClick={() => setEditing(b)}
                        >
                          Editar
                        </button>
                        <AsyncButton
                          onClick={async () => await handleDelete(b.id)}
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
          </div>
        ))}
      </div>

      {/* Modal for editing blog */}
      {editing !== null && (
        <div
          className='modal show d-block'
          tabIndex='-1'
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
        >
          <div className='modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h5 className='modal-title'>Editar Publicación</h5>
                <button
                  type='button'
                  className='btn-close'
                  onClick={() => setEditing(null)}
                ></button>
              </div>
              <div className='modal-body'>
                <BlogForm
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
