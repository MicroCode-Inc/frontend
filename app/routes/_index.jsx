import CardGroup from "../components/CardGroup"
import Carousel from "../components/Carousel"

export default function Home() {
  return (
    <>
      <div>
        <h1>Bienvenido a Micro Code Inc</h1>
      </div>
      <div>
        <h2 className='text-capitalize mt-3'>cursos</h2>
        <div className='card-group'>

          <CardGroup
            imgUrl='https://placehold.co/150'
            imgAlt='img'
            title='Html Basics'
            description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam cursus mi vel laoreet aliquet. In hac habitasse platea dictumst. '
            footerText='Last updated ago'
          />
          <CardGroup
            imgUrl='https://placehold.co/150'
            imgAlt='img'
            title='Css Basics'
            description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam cursus mi vel laoreet aliquet. In hac habitasse platea dictumst. '
            footerText='Last updated ago'
          />
          <CardGroup
            imgUrl='https://placehold.co/150'
            imgAlt='img'
            title='javascript Basics'
            description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam cursus mi vel laoreet aliquet. In hac habitasse platea dictumst. '
            footerText='Last updated ago'
          />
          <CardGroup
            imgUrl='https://placehold.co/150'
            imgAlt='img'
            title='React Basics'
            description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam cursus mi vel laoreet aliquet. In hac habitasse platea dictumst. '
            footerText='Last updated ago'
          />
        </div>
      </div>
      <div>
        <h2 className='text-capitalize mt-5'>blog</h2>
        <Carousel />
      </div>
    </>
  )
}
