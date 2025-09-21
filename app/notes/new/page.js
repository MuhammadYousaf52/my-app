"use client";
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
export default function NoteEditor() {
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const editor = useEditor({
        extensions: [
            StarterKit,
            TextAlign.configure({
                types: ['heading', 'paragraph']
            })
        ],
        content: '<p>Start writing your note...</p>',
        immediatelyRender: false
    })
    const saveNote = async () => {
        if (!title.trim()) {
            setError('Title is required');
            return;
        }
        if (!editor?.getHTML() || editor.getHTML() === '<p></p>') {
            setError('Content is required');
            return;
        }
        setSaving(true);
        setError('');
        try {
            const response = await fetch("/api/notes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: title.trim(),
                    content: editor.getHTML()
                })
            });
            if (response.ok) {
                router.push("/notes");
            } else {
                setError('Failed to save note');
            }
        } catch (error) {
            setError('Network error. Please try again.');
        } finally {
            setSaving(false);
        }
    };
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0F172A] to-[#1E293B] p-4">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-white">Create New Note</h1>
                    <div className="flex gap-3">
                        <button onClick={() => router.back()} className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors cursor-pointer">
                            Cancel
                        </button>
                        <button onClick={saveNote} disabled={saving} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
                            {saving ? 'Saving...' : 'Save Note'}
                        </button>
                    </div>
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-600 text-white rounded-lg">
                        {error}
                    </div>
                )}

                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Enter note title..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-800 text-white text-xl font-semibold rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none transition-colors"
                    />
                </div>
                
                <div className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
                    <div className="bg-gray-700 border-b border-gray-600 p-3 flex items-center gap-2">
                        <button 
                            onClick={() => editor?.chain().focus().toggleBold().run()}
                            className={`p-2 rounded-lg transition-colors text-white cursor-pointer ${
                                editor?.isActive('bold') ? 'bg-blue-600 text-white' : 'hover:bg-gray-600'
                            }`}
                        >
                            <strong>B</strong>
                        </button>
                        <button 
                            onClick={() => editor?.chain().focus().toggleItalic().run()}
                            className={`p-2 rounded-lg transition-colors text-white cursor-pointer ${
                                editor?.isActive('italic') ? 'bg-blue-600 text-white' : 'hover:bg-gray-600'
                            }`}
                        >
                            <em>I</em>
                        </button>
                        <button 
                            onClick={() => editor?.chain().focus().toggleBulletList().run()}
                            className={`p-2 rounded-lg transition-colors text-white cursor-pointer ${
                                editor?.isActive('bulletList') ? 'bg-blue-600 text-white' : 'hover:bg-gray-600'
                            }`}
                        >
                            •
                        </button>
                        <button 
                            onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
                            className={`p-2 rounded-lg font-bold transition-colors text-white cursor-pointer ${
                                editor?.isActive('heading', { level: 1 }) ? 'bg-blue-600 text-white' : 'hover:bg-gray-600'
                            }`}
                        >
                            h1
                        </button>
                        <button 
                            onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
                            className={`p-2 rounded-lg font-bold transition-colors text-white cursor-pointer ${
                                editor?.isActive('heading', { level: 2 }) ? 'bg-blue-600 text-white' : 'hover:bg-gray-600'
                            }`}
                        >
                            h2
                        </button>
                        <button
                        onClick={()=>{editor?.chain().focus().toggleUnderline().run()}}
                        className='p-2 rounded-lg transition-colors text-white font-bold cursor-pointer'>
                            U
                        </button>
                        <button
                        onClick={()=>{editor?.chain().focus().toggleOrderedList().run()}}
                        className='p-2 rounded-lg transition-colors text-white font-bold cursor-pointer'>
                            i
                        </button>
                        <button 
                            onClick={() => {
                                if (editor?.isActive({ textAlign: 'center' })) {
                                    editor?.chain().focus().setTextAlign('left').run()
                                } else {
                                    editor?.chain().focus().setTextAlign('center').run()
                                }
                            }}
                            className={`p-2 rounded-lg transition-colors text-white cursor-pointer ${
                                editor?.isActive({ textAlign: 'center' }) ? 'bg-blue-600 text-white' : 'hover:bg-gray-600'
                            }`}
                        >
                            <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 24 24'>
                                <path d='M7 15v2h10v-2H7zm-4 6h18v-2H3v2zm0-8h18v-2H3v2zm4-6v2h10V7H7zM3 3v2h18V3H3z'/>
                            </svg>
                        </button>
                    </div>

                    <div className="p-6">
                        <EditorContent 
                            editor={editor} 
                            className="max-w-none outline-none focus:outline-none min-h-[400px] text-white"
                        />
                        <style jsx global>{`
                            .ProseMirror ul {
                                list-style-type: disc;
                                margin-left: 1rem;
                                padding-left: 1rem;
                            }
                            .ProseMirror ol {
                                list-style-type: decimal;
                                margin-left: 1rem;
                                padding-left: 1rem;
                            }
                            .ProseMirror li {
                                display: list-item;
                            }
                            .ProseMirror h1 {
                                font-size: 3rem !important;
                                font-weight: bold !important;
                                margin: 1rem 0 0.5rem 0 !important;
                                line-height: 1.2 !important;
                            }
                            .ProseMirror h2 {
                                font-size: 2rem !important;
                                font-weight: bold !important;
                                margin: 0.8rem 0 0.4rem 0 !important;
                            }
                        `}</style>
                    </div>
                </div>
            </div>
        </div>
    )
}