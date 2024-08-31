import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { Send } from 'react-feather';
import { sendMessage } from '../../../api/actions/messages';
import { IChatFooter } from '../interfaces';

export default function ChatAreaFooter({ conversation }: IChatFooter) {
  const { data: session, status } = useSession();
  const [messageText, setMessageText] = useState(''); // Estado para almacenar el texto del mensaje
  const handleSendMessage = async () => {
    try {
      // Llamar a la función sendMessage con la sesión y el texto del mensaje
      await sendMessage(session, messageText, conversation?.id || '');
      console.log('Mensaje enviado');
      setMessageText(''); // Limpiar el texto del textarea después de enviar el mensaje
    } catch (error) {
      console.error('Error al enviar el mensaje:', error);
    }
  };

  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Evitar el comportamiento predeterminado del textarea al presionar Enter
      handleSendMessage(); // Llamar a la función para enviar el mensaje
    }
  };

  return (
    <div className="chat-area-footer flex items-center justify-between border-t border-gray-300 p-2">
      <textarea
        placeholder="Type something here..."
        className="flex-1 mr-2 border rounded-lg px-1 bg-gray text-white"
        rows={3}
        value={messageText} // Valor del textarea vinculado al estado
        onChange={(e) => setMessageText(e.target.value)} // Actualizar el estado con el valor del textarea
        onKeyDown={handleKeyDown} // Llamar a handleKeyDown cuando se presiona una tecla en el textarea
      />
      <button
        className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded"
        onClick={handleSendMessage} // Llamar a handleSendMessage cuando se hace clic en el botón
      >
        <Send size={20} />
      </button>
    </div>
  );
}
