'use client';

import { useEffect, useState } from 'react';

type Expression = 'neutral' | 'happy' | 'concerned' | 'listening';

const Avatar = () => {
  const [isTalking, setIsTalking] = useState(false);
  const [expression, setExpression] = useState<Expression>('neutral');
  const [isBlinking, setIsBlinking] = useState(false);

  // Animación de parpadeo
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 200);
    }, 3000);

    return () => clearInterval(blinkInterval);
  }, []);

  // Animación de habla
  useEffect(() => {
    const talkInterval = setInterval(() => {
      setIsTalking(prev => !prev);
    }, 1000);

    return () => clearInterval(talkInterval);
  }, []);

  // Cambiar expresión basado en el estado de la conversación
  useEffect(() => {
    const expressions: Expression[] = ['neutral', 'happy', 'concerned', 'listening'];
    const expressionInterval = setInterval(() => {
      setExpression(expressions[Math.floor(Math.random() * expressions.length)]);
    }, 5000);

    return () => clearInterval(expressionInterval);
  }, []);

  const getExpressionEmoji = () => {
    switch (expression) {
      case 'happy':
        return '😊';
      case 'concerned':
        return '🤔';
      case 'listening':
        return '👂';
      default:
        return '👤';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="relative w-64 h-64">
        <div 
          className={`absolute inset-0 rounded-full bg-blue-200 transition-all duration-300 ${
            isTalking ? 'scale-105' : 'scale-100'
          } ${isBlinking ? 'opacity-50' : 'opacity-100'}`}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div 
              className={`w-32 h-32 rounded-full bg-blue-300 flex items-center justify-center transition-transform duration-300 ${
                isTalking ? 'animate-bounce' : ''
              }`}
            >
              <div className="text-4xl transform transition-transform duration-300 hover:scale-110">
                {getExpressionEmoji()}
              </div>
            </div>
          </div>
        </div>
        {/* Efecto de brillo */}
        <div 
          className={`absolute inset-0 rounded-full bg-white opacity-0 transition-opacity duration-300 ${
            isTalking ? 'opacity-20' : ''
          }`}
        />
      </div>
      <h2 className="mt-4 text-xl font-semibold text-blue-800">Tu Asistente</h2>
      <p className="text-sm text-gray-600 mt-2">Estoy aquí para escucharte</p>
      <div className="mt-4 text-sm text-gray-500">
        {expression === 'listening' && 'Te estoy escuchando...'}
        {expression === 'happy' && 'Me alegra que compartas conmigo'}
        {expression === 'concerned' && 'Entiendo cómo te sientes'}
      </div>
    </div>
  );
};

export default Avatar; 