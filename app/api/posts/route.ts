import { redirect } from 'next/navigation'

export const revalidate = 60
 
export async function GET(request: Request) {
  const data = await fetch('https://api.vercel.app/blog')
  const posts = await data.json()
 
  return Response.json(posts)
}