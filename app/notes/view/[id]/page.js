"use client";
import { useRouter, useParams } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function ViewNote() {
    const router = useRouter();
    const params = useParams();
    const [note, setNote] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchNote();
    }, [params.id]);

    const fetchNote = async () => {
        try {
            const response = await fetch(`/api/notes/${params.id}`);
            if (response.ok) {
                const data = await response.json();
                setNote(data.note);
            } else {
                setError('Note not found');
            }
        } catch (error) {
            setError('Failed to load note');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="min-h-screen bg-gradient-to-br from-[#0F172A] to-[#1E293B] flex items-center justify-center">
            <div className="text-white">Loading...</div>
        </div>;
    }

    if (error || !note) {
        return <div className="min-h-screen bg-gradient-to-br from-[#0F172A] to-[#1E293B] flex items-center justify-center">
            <div className="text-white">{error || 'Note not found'}</div>
        </div>;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0F172A] to-[#1E293B] p-4">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-white">View Note</h1>
                    <div className="flex gap-3">
                        <button onClick={() => router.back()} className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors cursor-pointer">
                            Back
                        </button>
                        <button onClick={() => router.push(`/notes/${params.id}`)} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer">
                            Edit Note
                        </button>
                    </div>
                </div>

                <div className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
                    <div className="p-6 border-b border-gray-700">
                        <h2 className="text-3xl font-bold text-white mb-2">{note.title}</h2>
                        <p className="text-gray-400 text-sm">
                            Created: {new Date(note.createdAt).toLocaleDateString()} 
                            {note.updatedAt !== note.createdAt && (
                                <span> • Updated: {new Date(note.updatedAt).toLocaleDateString()}</span>
                            )}
                        </p>
                    </div>
                    
                    <div className="p-6">
                        <div 
                            className="text-white prose prose-invert max-w-none"
                            dangerouslySetInnerHTML={{ __html: note.content }}
                        />
                        <style jsx global>{`
                            .prose h1 {
                                font-size: 3rem !important;
                                font-weight: bold !important;
                                margin: 1rem 0 0.5rem 0 !important;
                                line-height: 1.2 !important;
                                color: white !important;
                            }
                            .prose h2 {
                                font-size: 2rem !important;
                                font-weight: bold !important;
                                margin: 0.8rem 0 0.4rem 0 !important;
                                color: white !important;
                            }
                            .prose ul {
                                list-style-type: disc;
                                margin-left: 1rem;
                                padding-left: 1rem;
                            }
                            .prose ol {
                                list-style-type: decimal;
                                margin-left: 1rem;
                                padding-left: 1rem;
                            }
                            .prose li {
                                display: list-item;
                                color: white;
                            }
                            .prose p {
                                color: white;
                                margin: 0.5rem 0;
                            }
                        `}</style>
                    </div>
                </div>
            </div>
        </div>
    )
}