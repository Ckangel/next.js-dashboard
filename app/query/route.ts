import postgres from 'postgres';

import type { NextRequest } from 'next/server'
 
export async function GET(request: NextRequest) {
  const url = request.nextUrl
}

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function listInvoices() {
 	const data = await sql`
     SELECT invoices.amount, customers.name
     FROM invoices
     JOIN customers ON invoices.customer_id = customers.id
     WHERE invoices.amount = 666;
   `;

 	return data;
} 

export async function GET() {
  try {
    return Response.json(await listInvoices());
  } catch (error) {
  }
}

export async function GET(request: Request) {}
 
export async function HEAD(request: Request) {}
 
export async function POST(request: Request) {}
 
export async function PUT(request: Request) {}
 
export async function DELETE(request: Request) {}
 
export async function PATCH(request: Request) {}
 
// If `OPTIONS` is not defined, Next.js will automatically implement `OPTIONS` and set the appropriate Response `Allow` header depending on the other methods defined in the Route Handler.
export async function OPTIONS(request: Request) {}
