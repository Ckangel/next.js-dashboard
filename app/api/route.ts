import { cookies } from 'next/headers'
import { headers } from 'next/headers'
import { type NextRequest } from 'next/server'
 
export async function GET(request: Request) {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')
  const headersList = await headers()
  const referer = headersList.get('referer')
 
  const responseHeaders: Record<string, string> = {
    'Set-Cookie': `token=${token?.value ?? ''}`,
  }
  
  if (referer) {
    responseHeaders['referer'] = referer
  }
  
  return new Response('Hello, Next.js!', {
    status: 200,
    headers: responseHeaders,
  })
}