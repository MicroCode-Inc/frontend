import CardGroup from "../components/CardGroup";
import Carousel from "../components/Carousel";
import { useLoaderData } from "react-router";

export async function loader() {
  const response = await fetch("http://127.0.0.1:5000/home");
  const json = await response.json();

  return json;
}

export default function Home() {
  const data = useLoaderData();
  console.log(data);

  return (
    <>
      <div>
        <h1>Bienvenido a Micro Code Inc</h1>
      </div>
      <div>
        <h2 className="text-capitalize mt-3">cursos</h2>
        <div className="card-group">
          {data.courses.map((course) => (
          <CardGroup
              key={course.id ?? course.name}
              imgUrl={course.image_url || "https://placehold.co/150"}
              imgAlt={course.name || "curso"}
              title={course.name}
              description={`${course.topic ?? ""}${course.topic && course.level ? " · " : ""}${course.level ?? ""}`}
              footerText={
                course.updated_at
                  ? `Actualizado ${new Date(course.updated_at).toLocaleDateString()}`
                  : "Última actualización desconocida"
              }
            />
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-capitalize mt-5">blog</h2>
        <Carousel />
      </div>
    </>
  );
}
