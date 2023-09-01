import { NextResponse } from "next/server";
import { getRows } from '../(services)/googleSheets';

export async function GET() {
  try {
    const data = await getRows();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}

export const dynamic = 'force-dynamic'
