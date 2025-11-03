export default function BlogPage() {
  return (
    <div className='container d-flex flex-column gap-5 page-transition'>
      <img
        className='img-fluid'
        src='https://placehold.co/1920x420'
      />
      <div>
        <h1 className='display-3 d-flex'>
          Article Title{' '}
          <span className='ms-auto fs-3 text-secondary'>12/10/2025</span>
        </h1>
        <h2 className='display-5'>Author Name</h2>
      </div>
      <div className='fs-4 fw-light d-flex flex-column gap-4'>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam natus
          fugit eaque accusantium laborum, recusandae, mollitia assumenda
          deleniti ex dolore nulla consequuntur distinctio suscipit inventore
          rerum libero fugiat magnam tenetur? Lorem, ipsum dolor sit amet
          consectetur adipisicing elit. Commodi, deleniti quos reprehenderit
          molestiae saepe tempora quasi expedita aut odio eius quibusdam,
          aperiam ipsum iste. Veritatis vitae commodi ea possimus nulla.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam natus
          fugit eaque accusantium laborum, recusandae, mollitia assumenda
          deleniti ex dolore nulla consequuntur distinctio suscipit inventore
          rerum libero fugiat magnam tenetur? Lorem, ipsum dolor sit amet
          consectetur adipisicing elit. Commodi, deleniti quos reprehenderit
          molestiae saepe tempora quasi expedita aut odio eius quibusdam,
          aperiam ipsum iste. Veritatis vitae commodi ea possimus nulla.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam natus
          fugit eaque accusantium laborum, recusandae, mollitia assumenda
          deleniti ex dolore nulla consequuntur distinctio suscipit inventore
          rerum libero fugiat magnam tenetur? Lorem, ipsum dolor sit amet
          consectetur adipisicing elit. Commodi, deleniti quos reprehenderit
          molestiae saepe tempora quasi expedita aut odio eius quibusdam,
          aperiam ipsum iste. Veritatis vitae commodi ea possimus nulla.
        </p>
      </div>
    </div>
  )
}
