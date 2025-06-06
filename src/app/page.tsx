'use client';

import { useState, useEffect } from 'react';
import ChatInterface from '@/components/ChatInterface';
import Avatar from '@/components/Avatar';
import Notes from '@/components/Notes';
import { assistantService } from '@/services/assistant';

interface Message {
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Cargar mensajes guardados al iniciar
    const savedMessages = assistantService.getMessages();
    setMessages(savedMessages);
  }, []);

  if (!isMounted) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-center text-blue-800 mb-8">
            Tu Asistente Emocional
          </h1>
          <div className="flex justify-center items-center h-[600px]">
            <div className="animate-pulse text-gray-500">Cargando...</div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-8">
          Tu Asistente Emocional
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <Avatar />
            <div className="mt-6">
              <Notes />
            </div>
          </div>
          <div className="md:col-span-3">
            <ChatInterface messages={messages} setMessages={setMessages} />
          </div>
        </div>
      </div>
    </main>
  );
}
