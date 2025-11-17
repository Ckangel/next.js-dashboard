import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
export const { handlers, auth } = NextAuth(req => {
 if (req) {
  console.log(req) // do something with the request
 }
 return { providers: [ GitHub ] }
})