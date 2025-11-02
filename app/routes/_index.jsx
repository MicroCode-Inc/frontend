import CardHome from '../components/CardHome'
import Carousel from '../components/Carousel'
import { useLoaderData } from 'react-router'
import Jumbotron from '../components/Jumbotron'

export async function loader() {
  const response = await fetch('http://127.0.0.1:5000/home')
  const json = await response.json()

  return json
}

export default function Home() {
  const { courses, blogs } = useLoaderData()

  return (
    <div className='container'>
      <Jumbotron />
      <h2 className='text-capitalize mt-3'>cursos</h2>
      <div className='row row-cols-2 row-cols-lg-4 g-2'>
        {courses.map(course => (
          <CardHome
            key={course.id}
            imgUrl={course.image_url}
            imgAlt={course.name}
            title={course.name}
            tags={course.tags}
          />
        ))}
      </div>
      <div className='row mt-3'>
        <h2 className='text-capitalize mt-5'>blogs</h2>
        <Carousel items={blogs} />
      </div>
    </div>
  )
}
