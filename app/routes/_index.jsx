import CardHome from '../components/CardHome'
import Carousel from '../components/Carousel'
import { useLoaderData } from 'react-router'
import Jumbotron from '../components/Jumbotron'
import { apiRequest } from '../utils/api'

export async function loader() {
  const response = await apiRequest('/home')
  const json = await response.json()

  return json
}

export default function Home() {
  const { courses, blogs } = useLoaderData()

  return (
    <div className='container d-grid gap-4 my-4 page-transition'>
      <Jumbotron />
      <div className='container-fluid p-5 bg-secondary bg-opacity-75 rounded-4 bg-opacity-90'>
        <h1 className='text-capitalize mb-3'>cursos</h1>
        <div className='row row-cols-2 row-cols-lg-4 g-2 stagger-animation'>
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
      </div>
      <div className='container-fluid bg-secondary bg-opacity-90 rounded-4 shadow p-0 pt-5 pb-4'>
        <span className='text-capitalize h1 ps-5'>blogs</span>
        <Carousel items={blogs} />
      </div>
    </div>
  )
}
