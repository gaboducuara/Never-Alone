import { endpoint } from './endpoint';
export const getConversations = async (session: any) => {
  try {
    const response = await fetch(`${endpoint}/matches/myMatchesAccepted`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.user?.meta?.token}`, // Cambio en la clave 'authorization' a 'Authorization'
      },
    });
    const info = await response.json(); // Agregué el await para esperar la respuesta JSON
    const conversations = await info.data;
    console.log(conversations);
    console.log('Conversations from api: ', conversations);
    return conversations;
  } catch (error) {
    console.error('Error fetching conversations:', error); // Agregué la impresión del error para fines de depuración
    throw error; // Puedes manejar el error aquí o propagarlo hacia arriba
  }
};

export const getProfile = async (session: any) => {
  try {
    const response = await fetch(`${endpoint}/users/myprofile`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.user?.meta?.token}`, // Cambio en la clave 'authorization' a 'Authorization'
      },
    });
    const info = await response.json(); // Agregué el await para esperar la respuesta JSON
    // console.log(info);
    return info;
  } catch (error) {
    console.error(error); // Agregué la impresión del error para fines de depuración
    throw error; // Puedes manejar el error aquí o propagarlo hacia arriba
  }
};

export const getMessages = async (session: any, matchId: string) => {
  try {
    const response = await fetch(`${endpoint}/matches/${matchId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.user?.meta?.token}`, // Cambio en la clave 'authorization' a 'Authorization'
      },
    });
    const info = await response.json(); // Agregué el await para esperar la respuesta JSON
    const conversations = await info.data;
    console.log('Messages from api: ', conversations);
    return conversations.messages;
  } catch (error) {
    console.error('Error fetching Messages:', error); // Agregué la impresión del error para fines de depuración
    throw error; // Puedes manejar el error aquí o propagarlo hacia arriba
  }
};

export const sendMessage = async (
  session: any,
  text: string,
  matchId: string
) => {
  try {
    const response = await fetch(`${endpoint}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.user?.meta?.token}`,
      },
      body: JSON.stringify({
        text: text,
        matchId: matchId,
      }),
    });
    const info = await response.json();
    return info;
  } catch (error) {
    console.error('Error fetching conversations:', error);
    throw error;
  }
};

/*const user = await res.json();
console.log('match', user);
if (user.error) {
  alert(user.error.message);
  setInputValue('');
} else {
  alert('Esperando que el usuario reciba su mensaje...');
  setInputValue('');
}*/
