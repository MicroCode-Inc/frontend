import { useParams } from 'react-router'

export default function Name() {
  const params = useParams()

  return <h1>{params.name}</h1>
}
