export default function About() {
  return (
    <div className='container page-transition mt-3 p-0'>
      <div className='bg-body d-flex flex-column rounded-4'>
        <img
          src='https://placehold.co/1920x420'
          className='img-fluid rounded-4'
          alt='MicroCode Inc Banner'
        />
        <h1 className='display-4 px-5 mt-5 mb-4'>About Us</h1>

        <div className='fs-4 fw-light d-flex flex-column gap-4 px-5 pb-5'>
          <div>
            <h3 className='fw-semibold mt-3 mb-2 text-primary'>
              Empowering learners beyond connectivity
            </h3>
            <p>
              MicroCode Inc was born from a simple belief: learning to code
              should not depend on where you live or the strength of your
              internet connection. We create small, complete, and affordable web
              development courses designed for regions with limited digital
              infrastructure — places where online education platforms rarely
              reach.
            </p>
          </div>

          <div>
            <h3 className='fw-semibold mt-3 mb-2 text-primary'>
              Education that fits real-world conditions
            </h3>
            <p>
              Our micro-courses are self-contained, multilingual, and always
              available as downloadable PDFs. Each one costs no more than $5 and
              focuses on a single, practical topic — from frontend design to
              backend logic, databases, and version control. This model ensures
              that anyone, anywhere, can build real skills even when power or
              internet access is unreliable.
            </p>
          </div>

          <div>
            <h3 className='fw-semibold mt-3 mb-2 text-primary'>
              Built by developers, for developers
            </h3>
            <p>
              MicroCode Inc is crafted by people who understand both code and
              context — developers who’ve experienced the challenges of learning
              with limited resources. Our approach combines modern full-stack
              technology (React, Flask, PostgreSQL, JWT, WeasyPrint) with a
              commitment to accessibility and simplicity.
            </p>
          </div>

          <div>
            <h3 className='fw-semibold mt-3 mb-2 text-primary'>Our vision</h3>
            <p>
              We imagine a world where quality technical education transcends
              infrastructure barriers — where a student in Bogotá, Nairobi, or
              Kathmandu can access the same foundational knowledge as one in New
              York or Berlin. One PDF at a time, MicroCode Inc is making that
              vision a reality.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
