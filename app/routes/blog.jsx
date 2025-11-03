import { Link } from 'react-router'

export default function Blog() {
  const blogs = [
    {
      title: 'Title Goes Here',
      author: 'First Middle Last',
      date: '12/10/2025',
      summary: 'A small blurb of the article.',
      tags: ['frontend', 'backend', 'sql']
    },
    {
      title: 'Title Goes Here',
      author: 'First Middle Last',
      date: '12/10/2025',
      summary: 'A small blurb of the article.',
      tags: ['frontend', 'backend', 'sql']
    },
    {
      title: 'Title Goes Here',
      author: 'First Middle Last',
      date: '12/10/2025',
      summary: 'A small blurb of the article.',
      tags: ['frontend', 'backend', 'sql']
    },
    {
      title: 'Title Goes Here',
      author: 'First Middle Last',
      date: '12/10/2025',
      summary: 'A small blurb of the article.',
      tags: ['frontend', 'backend', 'sql']
    },
    {
      title: 'Title Goes Here',
      author: 'First Middle Last',
      date: '12/10/2025',
      summary: 'A small blurb of the article.',
      tags: ['frontend', 'backend', 'sql']
    },
    {
      title: 'Title Goes Here',
      author: 'First Middle Last',
      date: '12/10/2025',
      summary: 'A small blurb of the article.',
      tags: ['frontend', 'backend', 'sql']
    },
    {
      title: 'Title Goes Here',
      author: 'First Middle Last',
      date: '12/10/2025',
      summary: 'A small blurb of the article.',
      tags: ['frontend', 'backend', 'sql']
    }
  ]

  const getTagColor = label => {
    switch (label) {
      case 'backend':
        return 'warning'
      case 'frontend':
        return 'success'
      case 'sql':
        return 'primary'
      case 'html':
        return 'danger'
      case 'css':
        return 'info'
      default:
        return 'secondary'
    }
  }

  return (
    <div className='container'>
      <div className='row justify-content-center'>
        <div className='col-12 col-lg-8'>
          <div className='d-grid gap-3'>
            {blogs.map(({ title, author, date, summary, tags }, i) => (
              <Link
                className='card border-0 bg-dark-subtle text-decoration-none rounded-4 shadow'
                to={`/blog/${i}`}
                key={i}
              >
                <div className='row g-0'>
                  <div className='col-auto'>
                    <img
                      src='https://placehold.co/175'
                      className='img-fluid rounded-start-4 h-100'
                      alt={title}
                    />
                  </div>
                  <div className='col'>
                    <div className='card-body h-100 align-content-center py-3 d-flex flex-column justify-content-between'>
                      <div className='d-flex'>
                        <div className='d-grid'>
                          <h5 className='card-title mb-1'>{title}</h5>
                          <h6 className=''>
                            <span className='fw-light'>Written by</span>{' '}
                            {author}
                          </h6>
                        </div>
                        <span className='ms-auto text-secondary'>{date}</span>
                      </div>
                      <p className='card-text'>{summary}</p>
                      {tags && (
                        <div className='d-flex gap-1'>
                          {tags.map((label, tagIndex) => (
                            <span
                              className={`badge text-capitalize text-bg-${getTagColor(
                                label
                              )}`}
                              key={`${title}-${label}-${tagIndex}`}
                            >
                              {label}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
