import Image from 'next/image';
import { getProfile } from '../../api/actions/messages';
import { useSession } from 'next-auth/react';
import { TbCameraPlus } from 'react-icons/tb';
import { useRef, useEffect, useState } from 'react';
import { IoPhonePortraitOutline } from 'react-icons/io5';
import { RiComputerLine } from 'react-icons/ri';
import { GiConsoleController } from 'react-icons/gi';
import { platform } from 'os';

const ProfileDer = ({
  username,
  description,
  selectedDate,
  selectedGenre,
  selectedGames,
  selectedPlatforms,
}: any) => {
  const { data: session, status } = useSession();
  const [userGet, setUserGet] = useState<any>();

  useEffect(() => {
    const fetchProfile = async () => {
      if (session) {
        try {
          const convos = await getProfile(session);
          setUserGet(convos.data);
          // console.log(userGet);
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchProfile();
  }, [session, userGet]);

  const fileInputRef: any = useRef(null); // Crea una referencia para el input de carga de archivos

  const handleImageUpload = async () => {
    const file = fileInputRef.current.files[0]; // Accede al archivo seleccionado
    console.log(file);
    if (file) {
      const formData = new FormData();
      formData.append('imageProfile', file);

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/updateProfilePhoto`,
          {
            method: 'PUT',
            headers: {
              authorization: `Bearer ${session?.user.meta.token}`,
            },
            body: formData,
          }
        );

        const info = await res.json();

        if (res.ok) {
          console.log('Imagen subida con éxito:', info);
        } else {
          throw new Error(info.message || 'Error al subir la imagen');
        }
      } catch (error) {
        console.error('Error en la subida de la imagen:', error);
      }
    }
  };

  return (
    <>
      <div className="mt-[80px]">
        <div className="w-full max-w-md mx-auto my-auto sticky top-[30px]">
          <h4 className="pb-[41px] font-[700] text-4xl">Mi Perfil</h4>
          <div className="rounded-lg min-w-[360px] overflow-hidden shadow-lg">
            {/* Imagen de fondo con información del usuario */}
            <div
              className="bg-cover bg-center h-[400px] relative flex items-end"
              style={{
                backgroundImage: `url(${userGet && userGet.image})`,
              }}
            >
              <div>
                <button
                  onClick={() => fileInputRef.current.click()}
                  className="absolute top-[20px] right-[20px] rounded-[50%] text-black bg-[#d9f04c] cursor-pointer" // Estilo para el botón con ícono
                >
                  <TbCameraPlus className="size-11 p-2" />
                </button>

                {/* Input oculto para la carga de archivos */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </div>
              <div className="bg-gradient-to-t p-5 from-[#000000dc] to-[#00000000] w-full">
                <h2 className="text-xl font-bold mb-2">
                  {username || (userGet && userGet.username)}
                </h2>
                <p className="text-sm font-light">
                  {/* {selectedDate && selectedDate.toLocaleDateString()} */}
                  {selectedDate > 0 && `${selectedDate} años`}
                </p>
                <p className="text-sm font-light">
                  {description || (userGet && userGet.bio) || 'Descripción'}
                </p>
              </div>
            </div>

            {/* Sección de tecnologías y habilidades */}
            <div className="px-4 py-2">
              <h3 className="text-lg font-semibold mb-2">{selectedGenre}</h3>
              <div className="flex flex-wrap gap-2">
                {/* Iconos o etiquetas de tecnologías */}
              </div>
            </div>

            {/* Sección de plataformas */}
            <div className="px-4 py-2">
              <div className="flex flex-wrap gap-2">
                {selectedPlatforms.map((platform: any) => (
                  <div key={platform}>
                    {platform === 'pc' && (
                      <RiComputerLine className="h-8 w-8" />
                    )}
                    {platform === 'console' && (
                      <GiConsoleController className="h-8 w-8" />
                    )}
                    {platform === 'mobile' && (
                      <IoPhonePortraitOutline className="h-8 w-8" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Sección de juegos favoritos */}
            <div className="px-4 py-2">
              <h3 className="text-lg font-semibold mb-2">Juegos favoritos</h3>
              <div className="flex overflow-x-auto pb-2">
                {/* Iterar sobre los juegos */}
                <div className="w-[100%]">
                  <div className="px-2  flex flex-row items-center gap-9">
                    {selectedGames.map((game: any) => (
                      <div
                        key={game.nameGame}
                        className="bg-[#414141] shadow-[#000] shadow-lg rounded p-2"
                      >
                        <Image
                          src={game.image} // Utiliza la imagen del juego del interés
                          alt={game.nameGame} // Usa el nombre del juego como alt
                          className="w-16 h-16 object-center object-cover"
                          width={100}
                          height={100}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileDer;
