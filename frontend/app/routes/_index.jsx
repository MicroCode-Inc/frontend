import { useLoaderData } from 'react-router'
import { API_URL } from '../config'

export async function loader() {
  const response = await fetch(`${API_URL}/api/`)

  if (!response.ok) {
    throw new Response('Failed to fetch data', { status: response.status })
  }

  return response.json()
}

export default function Home() {
  const data = useLoaderData()

  return (
    <>
      <h1>Home</h1>
      <p>{data.message}</p>
    </>
  )
}
