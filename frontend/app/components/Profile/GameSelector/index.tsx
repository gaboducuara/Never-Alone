import React from 'react';

interface Props {
  onSelectGame: (game: any) => void;
  selectedGames: any;
}
export const GameSelector = ({ onSelectGame, selectedGames }: Props) => {
  const gamesList = [
    {
      nameGame: 'The Legend of Zelda: Breath of the Wild',
      categoryGame: 'Action',
      image:
        'https://upload.wikimedia.org/wikipedia/en/c/c6/The_Legend_of_Zelda_Breath_of_the_Wild.jpg',
      skill: 3,
    },
    {
      nameGame: 'Cyberpunk 2077',
      categoryGame: 'Adventure',
      image:
        'https://upload.wikimedia.org/wikipedia/en/9/9f/Cyberpunk_2077_box_art.jpg',
      skill: 3,
    },
    {
      nameGame: 'Red Dead Redemption 2',
      categoryGame: 'Action',
      image:
        'https://upload.wikimedia.org/wikipedia/en/4/44/Red_Dead_Redemption_II.jpg',
      skill: 3,
    },
    {
      nameGame: 'Super Mario Odyssey',
      categoryGame: 'Platform',
      image:
        'https://upload.wikimedia.org/wikipedia/en/8/8d/Super_Mario_Odyssey.jpg',
      skill: 3,
    },
    {
      nameGame: 'Minecraft',
      categoryGame: 'Sandbox',
      image:
        'https://upload.wikimedia.org/wikipedia/en/5/51/Minecraft_cover.png',
      skill: 3,
    },
    {
      nameGame: 'The Witcher 3: Wild Hunt',
      categoryGame: 'RPG',
      image:
        'https://upload.wikimedia.org/wikipedia/en/0/0c/Witcher_3_cover_art.jpg',
      skill: 3,
    },
    {
      nameGame: 'Overwatch',
      categoryGame: 'FPS',
      image:
        'https://upload.wikimedia.org/wikipedia/en/5/51/Overwatch_cover_art.jpg',
      skill: 3,
    },
    {
      nameGame: 'Stardew Valley',
      categoryGame: 'Simulation',
      image:
        'https://upload.wikimedia.org/wikipedia/en/6/67/Stardew_Valley.jpg',
      skill: 3,
    },
  ];

  const handleAddGame = (selectedGame: any) => {
    if (selectedGame) {
      onSelectGame([...selectedGames, selectedGame]);
    }
  };
  return (
    <div className="game-selector">
      <select
        onChange={(e) =>
          handleAddGame(
            gamesList.find((game) => game.nameGame === e.target.value)
          )
        }
        className="game-select text-black"
      >
        <option value="" className="text-black">
          Seleccione un juego...
        </option>
        {gamesList.map((game, index) => (
          <option key={index} value={game.nameGame} className="text-black">
            {game.nameGame} ({game.categoryGame})
          </option>
        ))}
      </select>
    </div>
  );
};
