import { createInterestGame, getAllInterestGames, getOneInterestGame } from './model.js';

const controller = {
  async create(req, res) {
    try {
      const { userData } = req.body;
      const { nameGame, categoryGame, skill, userId } = userData;
      
      if (!nameGame || !categoryGame || !skill) {
        return res.status(400).json({ error: 'nameGame, skill y categoryGame son requeridos.' });
      }
      
      const nuevoInteres = await createInterestGame(nameGame, categoryGame, skill, userId);
      res.status(201).json(nuevoInteres);
    } catch (error) {
      console.error('Error al crear el interés de juego:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  async getAll(req, res) {
    try {
      const intereses = await getAllInterestGames();
      res.json(intereses);
    } catch (error) {
      console.error('Error al obtener los intereses de juegos:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  async getOne(req, res) {
    try {
      const { nameGame, categoryGame, skill } = req.body.userData; // Asegúrate de que userData está definido en el cuerpo de la solicitud
      const intereses = await getOneInterestGame({ nameGame, categoryGame, skill }); // Pasar un objeto userData con las propiedades requeridas
      res.json(intereses);
    } catch (error) {
      console.error('Error al obtener el interés de juego:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },  
};

export default controller;

