import CardHome from "../components/CardHome";
import Carousel from "../components/Carousel";
import { useLoaderData } from "react-router";
import Jumbotron from "../components/Jumbotron";

export async function loader() {
  const response = await fetch("http://127.0.0.1:5000/home");
  const json = await response.json();

  return json;
}

export default function Home() {
  const data = useLoaderData();

  const courses = [
    {
      name: "react basics",
      tags: ["javascript", "jsx", "node"],
      description: "Soft intro to React using a simple template",
      summary: {
        goal: "You will be able to start building static one-pagers using a beginner-friendly template",
        syllabus: [
          "What is React & why do we need it?",
          "What is JSX?",
          "What are Components?",
          "Template Overview",
          "Create your first page!",
        ],
        requirements: ["HTML Basics", "CSS Basics", "Javascript Basics"],
      },
    },
    {
      name: "css basics",
      tags: ["css", "html", "javascript"],
      description: "Soft intro to CSS using a simple template",
    },
    {
      name: "html basics",
      tags: ["html", "css", "javascript"],
      description: "Soft intro to HTML using a simple template",
    },
    {
      name: "javascript basics",
      tags: ["javascript", "html", "css"],
      description: "Soft intro to Javascript using a simple template",
    },
  ];

  const getTagColor = (label) => {
    switch (label) {
      case "javascript":
        return "warning";
      case "node":
        return "success";
      case "jsx":
        return "primary";
      case "html":
        return "danger";
      case "css":
        return "info";
      default:
        return "secondary";
    }
  };

  return (
    <div className="container">
      <section className="row mt-3">
        <Jumbotron />
      </section>
      <section>
        <h2 className="text-capitalize mt-3">cursos</h2>
        <div className="row row-cols-2 row-cols-lg-4 g-2">
          {courses.map((course) => (
            <CardHome
              key={course.id ?? course.name}
              imgUrl={course.image_url || "https://placehold.co/150"}
              imgAlt={course.name || "curso"}
              title={course.name}
              tags={course.tags}
              getTagColor={getTagColor}
            />
          ))}
        </div>
      </section>
      <section>
        <div className="row mt-3">
          <h2 className="text-capitalize mt-5">blog</h2>
          <Carousel />
        </div>
      </section>
    </div>
  );
}
