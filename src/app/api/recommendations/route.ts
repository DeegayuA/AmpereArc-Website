import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'data', 'recommendations.json');

function readDB(): any[] {
  try {
    return JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
  } catch {
    return [];
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const db = readDB();

    const id = `AA-${Date.now()}-${Math.floor(Math.random() * 900 + 100)}`;
    const record = {
      id,
      timestamp: new Date().toISOString(),
      ...body,
    };

    db.push(record);
    fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
    fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2));

    return NextResponse.json({ id, success: true });
  } catch (err) {
    console.error('Recommendations API error:', err);
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json(readDB());
}
