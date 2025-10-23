export default function Carousel() {
    return (
        <div
            id='carouselInterval'
            className='carousel slide'
            data-bs-ride='carousel'
        >
            <div className='carousel-inner'>
                <div
                    className='carousel-item active'
                    data-bs-interval='10000'
                >
                    <img
                        src='https://placehold.co/100'
                        className='d-block w-100'
                        alt='...'
                    />
                </div>
                <div
                    className='carousel-item'
                    data-bs-interval='2000'
                >
                    <img
                        src='https://placehold.co/150'
                        className='d-block w-100'
                        alt='...'
                    />
                </div>
                <div className='carousel-item'>
                    <img
                        src='https://placehold.co/120'
                        className='d-block w-100'
                        alt='...'
                    />
                </div>
            </div>
            <button
                className='carousel-control-prev'
                type='button'
                data-bs-target='#carouselInterval'
                data-bs-slide='prev'
            >
                <span
                    className='carousel-control-prev-icon'
                    aria-hidden='true'
                ></span>
                <span className='visually-hidden'>Previous</span>
            </button>
            <button
                className='carousel-control-next'
                type='button'
                data-bs-target='#carouselInterval'
                data-bs-slide='next'
            >
                <span
                    className='carousel-control-next-icon'
                    aria-hidden='true'
                ></span>
                <span className='visually-hidden'>Next</span>
            </button>
        </div>
    )
}