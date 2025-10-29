export default function CardHome({
  imgUrl = 'https://placehold.co/50',
  imgAlt = 'img',
  title = 'Card Title',
  description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam cursus mi vel laoreet aliquet. In hac habitasse platea dictumst. Pellentesque quis ultrices nulla. In hac habitasse platea dictumst. Ut ex magna, maximus a placerat vel, imperdiet eu neque.',
  footerText = 'Last updated ago',
  tags,
  getTagColor
}) {
  return (
    <div className='col'>
      <div className='card'>
        <div className='card-img-container'>
          <img
            src={imgUrl}
            alt={imgAlt}
            className='card-img'
          />
          <div className='card-img-overlay text-dark d-flex flex-column'>
            <span className='card-title text-capitalize h3'>{title}</span>
            <div className='mt-auto'>
              {tags.map(topic => (
                <span className={`me-1 badge text-bg-${getTagColor(topic)}`}>
                  {topic}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
