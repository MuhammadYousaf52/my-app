import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import Note from '../../../model/Note';
import connectMongoDB from '../../../lib/mongodb';
import { authOptions } from '../../../lib/auth';

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { title, content } = await request.json();
    
    if (!title?.trim() || !content?.trim()) {
      return NextResponse.json({ error: 'Title and content are required' }, { status: 400 });
    }
    
    await connectMongoDB();
    
    const note = await Note.create({
      title: title.trim(),
      content,
      userId: session.user.id
    });

    return NextResponse.json({ success: true, note });
  } catch (error) {
    console.error('POST /api/notes error:', error);
    return NextResponse.json({ error: 'Failed to save note' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectMongoDB();
    const notes = await Note.find({ userId: session.user.id }).sort({ createdAt: -1 });
    
    return NextResponse.json({ notes });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch notes' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const noteId = searchParams.get('id');
    
    if (!noteId) {
      return NextResponse.json({ error: 'Note ID is required' }, { status: 400 });
    }
    
    await connectMongoDB();
    const deletedNote = await Note.findOneAndDelete({ _id: noteId, userId: session.user.id });
    
    if (!deletedNote) {
      return NextResponse.json({ error: 'Note not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE /api/notes error:', error);
    return NextResponse.json({ error: 'Failed to delete note' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id, title, content } = await request.json();
    
    if (!id || !title?.trim() || !content?.trim()) {
      return NextResponse.json({ error: 'ID, title and content are required' }, { status: 400 });
    }
    
    await connectMongoDB();
    
    const note = await Note.findOneAndUpdate(
      { _id: id, userId: session.user.id },
      { title: title.trim(), content, updatedAt: new Date() },
      { new: true }
    );
    
    if (!note) {
      return NextResponse.json({ error: 'Note not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, note });
  } catch (error) {
    console.error('PUT /api/notes error:', error);
    return NextResponse.json({ error: 'Failed to update note' }, { status: 500 });
  }
}