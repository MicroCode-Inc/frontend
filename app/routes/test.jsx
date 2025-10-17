import InputGroup from '../components/InputGroup'

export default function Test() {
  const images = new Array(21).fill('https://placehold.co/640')

  return (
    <>
      <InputGroup
        label='name'
        btnText='submit'
        color='secondary'
        navTo=''
      />
      <div className='row row-cols-2 row-cols-lg-3 row-cols-xl-4 g-3 justify-content-center mx-auto'>
        {images.map((e, i) => (
          <div className='col'>
            <img
              className='img-fluid'
              src={e}
              key={i}
            />
          </div>
        ))}
      </div>
    </>
  )
}
