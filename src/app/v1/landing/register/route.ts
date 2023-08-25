import { NextResponse } from "next/server";
import { addRow } from '../(services)/googleSheets';


export async function POST(request: Request) {
  const body = await request.json();

  try {
    addRow(body);
    return NextResponse.json({ status: 'SUCCESS', message: 'New entry successfully added' }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ status: 'ERROR', message: 'Internal Server Error' }, { status: 500 })    
  }
}
