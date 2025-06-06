interface Message {
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

interface SavedMessage {
  text: string;
  sender: 'user' | 'assistant';
  timestamp: string;
}

class AssistantService {
  private messages: Message[] = [];

  // Almacenar mensajes en localStorage
  private saveMessages() {
    if (typeof window !== 'undefined') {
      localStorage.setItem('chat_messages', JSON.stringify(this.messages));
    }
  }

  // Cargar mensajes desde localStorage
  private loadMessages() {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('chat_messages');
      if (saved) {
        const parsedMessages: SavedMessage[] = JSON.parse(saved);
        this.messages = parsedMessages.map(msg => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
      }
    }
  }

  constructor() {
    this.loadMessages();
  }

  // Agregar un nuevo mensaje
  addMessage(text: string, sender: 'user' | 'assistant') {
    const message: Message = {
      text,
      sender,
      timestamp: new Date()
    };
    this.messages.push(message);
    this.saveMessages();
    return message;
  }

  // Obtener todos los mensajes
  getMessages() {
    return this.messages;
  }

  // Obtener mensajes de la última semana
  getLastWeekMessages() {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    
    return this.messages.filter(msg => msg.timestamp >= oneWeekAgo);
  }

  // Generar resumen semanal
  generateWeeklySummary() {
    const lastWeekMessages = this.getLastWeekMessages();
    const userMessages = lastWeekMessages.filter(msg => msg.sender === 'user');
    
    if (userMessages.length === 0) {
      return "No hay mensajes de la última semana para generar un resumen.";
    }

    // Aquí podrías implementar un análisis más sofisticado de los mensajes
    // Por ahora, simplemente devolvemos un resumen básico
    return `Durante la última semana, has compartido ${userMessages.length} mensajes. 
    He notado que has estado expresando tus emociones y pensamientos. 
    ¿Te gustaría que profundicemos en algún tema en particular?`;
  }

  // Limpiar el historial de mensajes
  clearHistory() {
    this.messages = [];
    this.saveMessages();
  }
}

export const assistantService = new AssistantService(); 