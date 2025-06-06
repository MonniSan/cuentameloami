'use client';

import { useState, useEffect } from 'react';

interface Note {
  id: string;
  text: string;
  timestamp: Date;
  emotion?: string;
}

interface SavedNote {
  id: string;
  text: string;
  timestamp: string;
  emotion?: string;
}

const Notes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState('');
  const [selectedEmotion, setSelectedEmotion] = useState<string>('');
  const [isExpanded, setIsExpanded] = useState(false);

  const emotions = ['😊 Feliz', '😢 Triste', '😡 Enojado', '😰 Ansioso', '😌 Tranquilo'];

  useEffect(() => {
    // Cargar notas guardadas
    const savedNotes = localStorage.getItem('emotional_notes');
    if (savedNotes) {
      const parsedNotes: SavedNote[] = JSON.parse(savedNotes);
      setNotes(parsedNotes.map(note => ({
        ...note,
        timestamp: new Date(note.timestamp)
      })));
    }
  }, []);

  const saveNotes = (updatedNotes: Note[]) => {
    localStorage.setItem('emotional_notes', JSON.stringify(updatedNotes));
  };

  const handleAddNote = () => {
    if (!newNote.trim()) return;

    const note: Note = {
      id: Date.now().toString(),
      text: newNote,
      timestamp: new Date(),
      emotion: selectedEmotion
    };

    const updatedNotes = [note, ...notes];
    setNotes(updatedNotes);
    saveNotes(updatedNotes);
    setNewNote('');
    setSelectedEmotion('');
  };

  const handleDeleteNote = (id: string) => {
    const updatedNotes = notes.filter(note => note.id !== id);
    setNotes(updatedNotes);
    saveNotes(updatedNotes);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-blue-800">Notas Importantes</h2>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-blue-500 hover:text-blue-700"
        >
          {isExpanded ? '▼' : '▶'}
        </button>
      </div>

      {isExpanded && (
        <>
          <div className="mb-4">
            <textarea
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="Escribe una nota importante..."
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
            <div className="flex gap-2 mt-2 overflow-x-auto">
              {emotions.map((emotion) => (
                <button
                  key={emotion}
                  onClick={() => setSelectedEmotion(emotion)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    selectedEmotion === emotion
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {emotion}
                </button>
              ))}
            </div>
            <button
              onClick={handleAddNote}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Guardar Nota
            </button>
          </div>

          <div className="space-y-4 max-h-96 overflow-y-auto">
            {notes.map((note) => (
              <div
                key={note.id}
                className="bg-gray-50 rounded-lg p-3 relative group"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-800">{note.text}</p>
                    {note.emotion && (
                      <span className="text-sm text-gray-500 mt-1 block">
                        {note.emotion}
                      </span>
                    )}
                    <span className="text-xs text-gray-400 mt-1 block">
                      {note.timestamp.toLocaleString()}
                    </span>
                  </div>
                  <button
                    onClick={() => handleDeleteNote(note.id)}
                    className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 transition-opacity"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Notes; 