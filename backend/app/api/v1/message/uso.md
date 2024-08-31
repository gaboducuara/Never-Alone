# Uso de las Rutas de Messages en Postman

Este documento proporciona instrucciones sobre cómo utilizar las rutas de la API en Postman para realizar diversas acciones, como enviar mensajes y obtener mensajes entre usuarios.

## Enviar un Mensaje

### Ruta

POST localhost:3000/api/v1/messages/messages

### Cuerpo de la Solicitud (JSON)

```json
{
  "text": "Hola, ¿cómo estás?",
  "senderId": "497ad042-a0a1-4fe2-9903-bd5bd635b53d", //uuid del remitente
  "receiverId": "73fe1cd2-00c0-4c49-98e6-b1241cae1e8a" //uuid del destinatario
}
```

Envía un mensaje nuevo especificando el texto del mensaje, el ID del remitente y el ID del destinatario en el cuerpo de la solicitud.

## Obtener Mensajes entre Usuarios

### Ruta

GET localhost:3000/api/v1/messages/{userId1}/{userId2}

Sustituye {userId1} y {userId2} con los IDs de los usuarios entre los cuales deseas obtener los mensajes.

### Cuerpo de la Respuesta esperada (JSON)

```json
{
  "id": "bb58d24a-08a8-40ee-ad8b-44b443773edd",
  "text": "Hola, ¿cómo estás?",
  "createdAt": "fecha",
  "updatedAt": "fecha",
  "userId": "497ad042-a0a1-4fe2-9903-bd5bd635b53d",
  "conversationId": "515135d4-d04e-4b22-bd3e-975d6ec09bbc"
}
```
