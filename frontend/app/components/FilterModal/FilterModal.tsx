import React, { useState } from 'react';
import './FilterModal.Module.css';

interface ModalProps {
  setIsOpen?:any
  setFiltroActivo?:any
  isOpen: boolean;
  filtroActivo?:any
  resetFilters?:any
  toggleModal: () => void;
  setFilteredUsers: React.Dispatch<React.SetStateAction<any[]>>;
}

const FilterModal: React.FC<ModalProps> = ({
  isOpen,
  toggleModal,
  setFilteredUsers,
  filtroActivo,
  setFiltroActivo,
  resetFilters,
}) => {
  const [gameType, setGameType] = useState<string>('');
  const [skillLevel, setSkillLevel] = useState<string>('');
  let filteredUsers: any[] = [];

  const handleGameTypeChange = (type: string) => {
    setGameType(type === gameType ? '' : type);
  };

  const handleSkillLevelChange = (level: string) => {
    setSkillLevel(level === skillLevel ? '' : level);
  };

  const handleFilterUsers = () => {
    const filters = [];
    if (gameType) filters.push(`gameType=${gameType}`);
    if (skillLevel) filters.push(`skill=${skillLevel}`);

    const queryString = filters.join('&');
    const apiUrl = `https://api-tinder-games.onrender.com/api/v1/users/filter?${queryString}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log('Filtered users:', data);
        filteredUsers = data;
        setFilteredUsers(data);
        toggleModal();
        setFiltroActivo(true);
      })
      .catch((error) => {
        console.error('Error fetching filtered users:', error);
      });
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={toggleModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="ml-[95%]" onClick={toggleModal}>
          ✖
        </button>
        <hr className="divider" />

        <div className="modal-columns">
          <div className="modal-column">
            <h2>Tipos de juego</h2>
            <label className="checkbox-container">
              <input
                type="checkbox"
                className="checkbox-input"
                checked={gameType === 'Action'}
                onChange={() => handleGameTypeChange('Action')}
              />
              <span className="checkbox-custom"></span>
              Action
            </label>
            <label className="checkbox-container">
              <input
                type="checkbox"
                className="checkbox-input"
                checked={gameType === 'Sport'}
                onChange={() => handleGameTypeChange('Sport')}
              />
              <span className="checkbox-custom"></span>
              Sport
            </label>
            <label className="checkbox-container">
              <input
                type="checkbox"
                className="checkbox-input"
                checked={gameType === 'Strategy'}
                onChange={() => handleGameTypeChange('Strategy')}
              />
              <span className="checkbox-custom"></span>
              Strategy
            </label>
            <label className="checkbox-container">
              <input
                type="checkbox"
                className="checkbox-input"
                checked={gameType === 'Simulation'}
                onChange={() => handleGameTypeChange('Simulation')}
              />
              <span className="checkbox-custom"></span>
              Simulation
            </label>
          </div>
          <div className="modal-column">
            <h2>Nivel de habilidad</h2>
            <label className="checkbox-container">
              <input
                type="checkbox"
                className="checkbox-input"
                checked={skillLevel === '1'}
                onChange={() => handleSkillLevelChange('1')}
              />
              <span className="checkbox-custom"></span>1 estrella
            </label>
            <label className="checkbox-container">
              <input
                type="checkbox"
                className="checkbox-input"
                checked={skillLevel === '2'}
                onChange={() => handleSkillLevelChange('2')}
              />
              <span className="checkbox-custom"></span>2 estrellas
            </label>
            <label className="checkbox-container">
              <input
                type="checkbox"
                className="checkbox-input"
                checked={skillLevel === '3'}
                onChange={() => handleSkillLevelChange('3')}
              />
              <span className="checkbox-custom"></span>3 estrellas
            </label>
          </div>
        </div>
        <div className='mt-4'>
          <button
            className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            onClick={handleFilterUsers}
          >
            Filtrar Usuarios
          </button>
          <button
            onClick={resetFilters}
            className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Resetear Filtros
          </button>
        </div>
      </div>
    </div>
  );
};

export { FilterModal };

