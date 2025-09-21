"use client"
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
const Notes = () => {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (status === 'loading') return // Still loading
    if (!session) {
      router.push('/login')
    } else {
      fetchNotes()
    }
  }, [session, status, router])

  const fetchNotes = async () => {
    try {
      const response = await fetch('/api/notes')
      if (response.ok) {
        const data = await response.json()
        setNotes(data.notes)
      } else {
        setError('Failed to load notes')
      }
    } catch (error) {
      setError('Network error. Please refresh the page.')
    } finally {
      setLoading(false)
    }
  }

  const deleteNote = async (noteId, e) => {
    e.stopPropagation()
    if (!confirm('Are you sure you want to delete this note?')) return
    try {
      const response = await fetch(`/api/notes?id=${noteId}`, { method: 'DELETE' })
      if (response.ok) {
        setNotes(notes.filter(note => note._id !== noteId))
      } else {
        setError('Failed to delete note')
      }
    } catch (error) {
      setError('Network error. Please try again.')
    }
  }

  if (status === 'loading') {
    return <div className='text-white text-center mt-20'>Loading...</div>
  }

  if (!session) {
    return <div className='text-white text-center mt-20'>Redirecting to login...</div>
  }

  return (
    <div className='text-white min-h-screen px-4 py-8 my-[30px]'>
      <div className='max-w-6xl mx-auto'>
        <h1 className='text-3xl md:text-4xl font-bold text-center mb-12'>My Notes</h1>
        
        <div className='flex justify-center mb-8'>
          <Link href={'/notes/new'}>
          <div className='group cursor-pointer'>
            <div className="create-note bg-gradient-to-br from-[#363882] to-[#5357D2] hover:from-[#4c46a3] hover:to-[#6366F1] transition-all duration-300 hover:scale-105 shadow-2xl hover:shadow-3xl rounded-2xl p-8 border border-white/10 backdrop-blur-sm">
              <div className='text-center'>
                <div className='w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-white/30 transition-colors duration-300'>
                  <svg className='w-10 h-10 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 4v16m8-8H4' />
                  </svg>
                </div>
                <h3 className='text-xl font-semibold mb-2'>Create New Note</h3>
                <p className='text-white/70 text-sm'>Click to add a new note</p>
              </div>
            </div>
          </div>
          </Link>
        </div>
        
        {error && (
          <div className='mb-6 p-4 bg-red-600 text-white rounded-lg'>
            {error}
          </div>
        )}
        
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {loading ? (
            <div className='text-center text-white/50 col-span-full py-12'>
              <p>Loading notes...</p>
            </div>
          ) : error ? (
            <div className='text-center text-white/50 col-span-full py-12'>
              <p>Unable to load notes</p>
            </div>
          ) : notes.length === 0 ? (
            <div className='text-center text-white/50 col-span-full py-12'>
              <p>No notes yet. Create your first note!</p>
            </div>
          ) : (
            notes.map((note) => (
              <div key={note._id} onClick={() => router.push(`/notes/view/${note._id}`)} className='bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:scale-105 shadow-lg relative cursor-pointer'>
                <div className='absolute top-4 right-4'>
                  <button onClick={(e) => deleteNote(note._id, e)} className='p-2 text-gray-400 hover:text-red-400 transition-colors cursor-pointer'>
                    <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16' />
                    </svg>
                  </button>
                </div>
                <h3 className='text-xl font-semibold text-white mb-3 truncate pr-12'>{note.title}</h3>
                <div className='text-gray-300 text-sm mb-4 line-clamp-3' dangerouslySetInnerHTML={{ __html: note.content }} />
                <div className='text-gray-400 text-xs'>
                  {new Date(note.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default Notes
