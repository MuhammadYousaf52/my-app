import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import Note from '../../../../model/Note';
import connectMongoDB from '../../../../lib/mongodb';
import { authOptions } from '../../../../lib/auth';

export async function GET(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectMongoDB();
    const note = await Note.findOne({ _id: params.id, userId: session.user.id });
    
    if (!note) {
      return NextResponse.json({ error: 'Note not found' }, { status: 404 });
    }
    
    return NextResponse.json({ note });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch note' }, { status: 500 });
  }
}