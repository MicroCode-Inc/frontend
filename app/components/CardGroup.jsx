export default function CardGroup ({
    imgUrl = 'https://placehold.co/50',
    imgAlt = 'img',
    title = 'Card Title',
    description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam cursus mi vel laoreet aliquet. In hac habitasse platea dictumst. Pellentesque quis ultrices nulla. In hac habitasse platea dictumst. Ut ex magna, maximus a placerat vel, imperdiet eu neque.',
    footerText = 'Last updated ago'
}) {
    return (
        <div className='card col' >
            <div className='card-img-container'>
            <img src={imgUrl} alt={imgAlt} className='card-img-top' />
            </div>
            <div className='card-body'>
                <h2 className='card-title'>{title}</h2>
                <p className='card-description'>{description}</p>
            </div>
            <div className='card-footer'>
              <small className='text-body-secondary'>{footerText}</small>
            </div>
        </div>
    );
};
