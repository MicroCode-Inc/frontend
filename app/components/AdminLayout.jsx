import React, { useState, useEffect, useRef } from 'react'
import { NavLink, useLocation, Outlet } from 'react-router'
import routes from '../routes'
import CourseForm from './CourseForm'
import BlogForm from './BlogForm'
import UserForm from './UserForm'
import {
  createCourse,
  updateCourse,
  createBlog,
  updateBlog,
  createUser
} from '../services/adminApi'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '../utils/faIcons'

export default function AdminLayout() {
  const location = useLocation()
  const adminRoute = routes.find(r => r.path === '/admin')
  const tabs = adminRoute?.children ?? []
  const [showDropdown, setShowDropdown] = useState(false)
  const [showCourseModal, setShowCourseModal] = useState(false)
  const [showBlogModal, setShowBlogModal] = useState(false)
  const [showUserModal, setShowUserModal] = useState(false)
  const [reloadTrigger, setReloadTrigger] = useState(0)
  const dropdownRef = useRef(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false)
      }
    }

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }
  }, [showDropdown])

  const handleAddNew = () => {
    setShowDropdown(!showDropdown)
  }

  const handleDropdownSelect = type => {
    setShowDropdown(false)
    if (type === 'course') setShowCourseModal(true)
    else if (type === 'blog') setShowBlogModal(true)
    else if (type === 'user') setShowUserModal(true)
  }

  const handleCourseSave = async payload => {
    await createCourse(payload)
    setShowCourseModal(false)
    setReloadTrigger(prev => prev + 1)
  }

  const handleBlogSave = async payload => {
    await createBlog(payload)
    setShowBlogModal(false)
    setReloadTrigger(prev => prev + 1)
  }

  const handleUserSave = async payload => {
    await createUser(payload)
    setShowUserModal(false)
    setReloadTrigger(prev => prev + 1)
  }

  return (
    <div className='container page-transition'>
      <div className='row justify-content-center mt-3'>
        <div className='col-12 col-lg-8 rounded-4 px-4 py-4 d-flex flex-column bg-secondary bg-opacity-90'>
          {/* Tab navigation */}
          <div
            className='flex-shrink-0 z-2'
            style={{ width: '102%', transform: 'translateX(-1%)' }}
          >
            <ul className='nav nav-pills bg-light flex-shrink-0 rounded-3 p-2 d-flex gap-1 shadow'>
              {tabs.map(tab => (
                <li
                  className='nav-item'
                  key={tab.path}
                >
                  <NavLink
                    to={tab.path}
                    className='nav-link text-capitalize'
                  >
                    {tab.label}
                  </NavLink>
                </li>
              ))}
              <li
                className='nav-item ms-auto position-relative'
                ref={dropdownRef}
              >
                <button
                  className='btn btn-primary'
                  onClick={handleAddNew}
                  title='Agregar nuevo'
                >
                  <FontAwesomeIcon icon={faPlus} />
                </button>
                {showDropdown && (
                  <div
                    className='dropdown-menu show position-absolute'
                    style={{ top: '100%', right: 0, marginTop: '0.5rem' }}
                  >
                    <button
                      className='dropdown-item'
                      onClick={() => handleDropdownSelect('course')}
                    >
                      Curso
                    </button>
                    <button
                      className='dropdown-item'
                      onClick={() => handleDropdownSelect('blog')}
                    >
                      Publicación
                    </button>
                    <button
                      className='dropdown-item'
                      onClick={() => handleDropdownSelect('user')}
                    >
                      Usuario
                    </button>
                  </div>
                )}
              </li>
            </ul>
          </div>

          {/* Content container */}
          <div
            className='flex-grow-1'
            style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 200px)' }}
          >
            <Outlet context={{ reloadTrigger }} />
          </div>
        </div>
      </div>

      {/* Course Modal */}
      {showCourseModal && (
        <div
          className='modal show d-block'
          tabIndex='-1'
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
        >
          <div className='modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h5 className='modal-title'>Nuevo Curso</h5>
                <button
                  type='button'
                  className='btn-close'
                  onClick={() => setShowCourseModal(false)}
                ></button>
              </div>
              <div className='modal-body'>
                <CourseForm
                  initial={{}}
                  onSave={handleCourseSave}
                  onCancel={() => setShowCourseModal(false)}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Blog Modal */}
      {showBlogModal && (
        <div
          className='modal show d-block'
          tabIndex='-1'
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
        >
          <div className='modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h5 className='modal-title'>Nueva Publicación</h5>
                <button
                  type='button'
                  className='btn-close'
                  onClick={() => setShowBlogModal(false)}
                ></button>
              </div>
              <div className='modal-body'>
                <BlogForm
                  initial={{}}
                  onSave={handleBlogSave}
                  onCancel={() => setShowBlogModal(false)}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* User Modal */}
      {showUserModal && (
        <div
          className='modal show d-block'
          tabIndex='-1'
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
        >
          <div className='modal-dialog modal-dialog-centered'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h5 className='modal-title'>Nuevo Usuario</h5>
                <button
                  type='button'
                  className='btn-close'
                  onClick={() => setShowUserModal(false)}
                ></button>
              </div>
              <div className='modal-body'>
                <UserForm
                  onSave={handleUserSave}
                  onCancel={() => setShowUserModal(false)}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
