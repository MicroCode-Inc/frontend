export default function Jumbotron({
  title = "Bienvenido a MicroCode Inc",
  text = "Nos gusta tenerte aqui y disfruta de nuestros cursos.",
}) {
  return (
    <div className="jumbotron">
      <h1 className="display-4">{title}</h1>
      <p className="lead">{text}</p>
      <hr className="my-4" />
    </div>
  );
}
