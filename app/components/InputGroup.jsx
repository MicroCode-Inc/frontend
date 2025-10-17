import { useState } from 'react'
import { Link } from 'react-router'

export default function InputGroup({ label, btnText, color }) {
  const [text, setText] = useState()

  const changeText = e => {
    setText(e.target.value)
  }

  return (
    <div className='container-fluid mb-3 text-center col col-md-6'>
      <div className='input-group'>
        <div className='form-floating'>
          <input
            type='text'
            className='form-control'
            id='floatingInput'
            placeholder=''
            onChange={changeText}
          />
          <label
            for='floatingInput'
            className='text-capitalize'
          >
            {label}
          </label>
        </div>
        <Link
          className={`btn btn-${color} text-capitalize align-content-center`}
          to={`/${text}`}
        >
          {btnText}
        </Link>
      </div>
    </div>
  )
}
