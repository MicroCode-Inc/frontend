import { Link } from 'react-router'

export default function Blog() {
  const blogs = [
    {
      title: 'Title Goes Here',
      author: 'First Middle Last',
      date: '12/10/2025',
      summary:
        'A small blurb show a short summary of the article to entice the user to click on it.',
      tags: ['frontend', 'backend', 'sql']
    },
    {
      title: 'Title Goes Here',
      author: 'First Middle Last',
      date: '12/10/2025',
      summary:
        'A small blurb show a short summary of the article to entice the user to click on it.',
      tags: ['frontend', 'backend', 'sql']
    },
    {
      title: 'Title Goes Here',
      author: 'First Middle Last',
      date: '12/10/2025',
      summary:
        'A small blurb show a short summary of the article to entice the user to click on it.',
      tags: ['frontend', 'backend', 'sql']
    },
    {
      title: 'Title Goes Here',
      author: 'First Middle Last',
      date: '12/10/2025',
      summary:
        'A small blurb show a short summary of the article to entice the user to click on it.',
      tags: ['frontend', 'backend', 'sql']
    },
    {
      title: 'Title Goes Here',
      author: 'First Middle Last',
      date: '12/10/2025',
      summary:
        'A small blurb show a short summary of the article to entice the user to click on it.',
      tags: ['frontend', 'backend', 'sql']
    },
    {
      title: 'Title Goes Here',
      author: 'First Middle Last',
      date: '12/10/2025',
      summary:
        'A small blurb show a short summary of the article to entice the user to click on it.',
      tags: ['frontend', 'backend', 'sql']
    },
    {
      title: 'Title Goes Here',
      author: 'First Middle Last',
      date: '12/10/2025',
      summary:
        'A small blurb show a short summary of the article to entice the user to click on it.',
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
      <div className='container d-grid gap-4 justify-content-center bg-secondary-subtle p-4 rounded-4'>
        {blogs.map(({ title, author, date, summary, tags }, i) => (
          <Link
            className='card border-0 bg-dark-subtle text-decoration-none rounded-4'
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
                <div className='card-title px-3 pt-2'>
                  <div className='d-flex'>
                    <h5>{title}</h5>
                    <span className='ms-auto text-secondary'>{date}</span>
                  </div>
                  <h6>{author}</h6>
                </div>
                <div className='card-body pt-2'>
                  <span>{summary}</span>
                </div>
                <div className='card-footer bg-transparent border-0 py-0'>
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
  )
}
