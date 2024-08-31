import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './styles.css';
import { useSession } from 'next-auth/react';
import { AccountCircleIcon } from '../../assets';
import { IoPhonePortraitOutline } from 'react-icons/io5';
import { RiComputerLine } from 'react-icons/ri';
import { GiConsoleController } from 'react-icons/gi';
import { PiUserListBold } from 'react-icons/pi';

import { GameSelector } from './GameSelector';
import GenreSelector from './GenreSelector';
import ProfileDer from './ProfileDer';
import { useRouter } from 'next/navigation';

const ProfileForm = () => {
  // Estados para guardar las selecciones del usuario
  const { data: session, status } = useSession();
  const [selectedDate, setSelectedDate] = useState<any>(null);
  const [profilePic, setProfilePic] = useState<any>(null);
  const [selectedPlatforms, setSelectedPlatforms] = useState<any>([]);
  const [selectedGames, setSelectedGames] = useState<any>([]);
  const [selectedGenre, setSelectedGenre] = useState<any>(null);
  const [username, setUsername] = useState<any>('');
  const [description, setDescription] = useState<any>('');
  const [age, setAge] = useState<any>();
  const router = useRouter();

  const platforms = [
    { value: 'mobile', Icon: IoPhonePortraitOutline, label: 'Mobile' },
    { value: 'pc', Icon: RiComputerLine, label: 'PC' },
    { value: 'console', Icon: GiConsoleController, label: 'Console' },
  ];

  useEffect(() => {
    console.log(selectedGames);
  }, [selectedGames]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
    console.log('Form data:', data);
    console.log('Local state data:', {
      username,
      description,
      selectedDate,
      selectedGenre,
      selectedGames,
      selectedPlatforms,
    });
    // Lógica para enviar los datos del formulario al backend
  };

  const handleProfilePicChange = (e: {
    target: { files: (Blob | MediaSource)[] };
  }) => {
    setProfilePic(URL.createObjectURL(e.target.files[0]));
  };

  const handlePlatformChange = (value: string) => {
    setSelectedPlatforms((prevSelectedPlatforms: any) =>
      prevSelectedPlatforms.includes(value)
        ? prevSelectedPlatforms.filter((platform: any) => platform !== value)
        : [...prevSelectedPlatforms, value]
    );
  };

  const calculateAge = (birthDate: Date) => {
    const today = new Date();
    const birthDateCopy = new Date(birthDate);
    let age = today.getFullYear() - birthDateCopy.getFullYear();
    const monthDiff = today.getMonth() - birthDateCopy.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDateCopy.getDate())
    ) {
      age--;
    }
    return age;
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    // Si se selecciona una fecha, calcula la edad y actualiza el estado
    if (date) {
      const age = calculateAge(date);
      setAge(age);
    } else {
      // Si no se selecciona ninguna fecha, establece la edad en null
      setAge(null);
    }
  };

  const handleDataUpload = async (event: any) => {
    event.preventDefault();
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/updateProfile`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${session?.user.meta.token}`,
          },
          body: JSON.stringify({
            username,
            favoritePlatform: selectedPlatforms,
            interests: selectedGames,
            bio: description,
            age: selectedDate,
            gender: selectedGenre,
          }),
        }
      );
      const info = await res.json();
      console.log(info);

      if (res.ok) {
        console.log('PUT con éxito:', info);
        router.push('/filteruser');
      } else {
        throw new Error(info.message);
      }
    } catch (error) {
      console.error('Error al subir los datos:', error);
    }
  };

  return (
    <div className="w-full flex">
      {/* Sección del formulario a la izquierda */}
      <div className="flex-1 px-4 sm:pl-[82px] py-[104px] text-[#FFFFFF]">
        <h4 className="pb-[41px] font-[700] text-4xl">Completá tu Perfil</h4>
        <form
          onSubmit={handleDataUpload}
          className="space-y-8 sm:w-[80%] text-white"
        >
          {/* Inputs y controles del formulario aquí */}
          <label htmlFor="username" className="block sm:text-xs opacity-90">
            Nombre de usuario
            <div
              style={{ transform: 'skewX(-10deg)' }}
              className="border-[1.6px] border-[#FFFFFF] mb-2 py-2 sm:mb-10 flex sm:text-base items-center w-[80%] mt-2"
            >
              <AccountCircleIcon classNames="pl-2" />
              <input
                type="text"
                placeholder="Nombre de Usuario"
                {...register('username', { required: true })}
                onChange={(e) => setUsername(e.target.value)}
                className="input polygon pl-2 py-2 focus:border-none block w-full bg-transparent focus:outline-none sm:text-base"
              />
              {errors.username && (
                <span className="text-red-500">Este campo es requerido</span>
              )}
            </div>
          </label>

          <div className="flex w-[100%] z-[100]">
            <label htmlFor="date" className="w-[60%] text-xs">
              Fecha
              <div
                className="h-12 border-[1.6px] border-[#FFFFFF]  items-start justify-start text-base mt-2"
                style={{ transform: 'skewX(-10deg)' }}
              >
                <div className="">
                  <DatePicker
                    id="date"
                    className="polygon  h-12 pl-3 text-md"
                    selected={selectedDate}
                    // onChange={(date) => setSelectedDate(date)}¨
                    onChange={handleDateChange}
                    placeholderText="mm/dd/aa"
                  />
                </div>
              </div>
            </label>
            <label htmlFor="genre" className="w-[100%] ml-[7.5rem] text-xs">
              Género
              <div
                className="h-12  border-[1.6px] border-[#FFFFFF] w-[100%] mt-2"
                style={{ transform: 'skewX(-10deg)' }}
              >
                <GenreSelector
                  selectedGenre={selectedGenre}
                  setSelectedGenre={setSelectedGenre}
                />

                {errors.username && (
                  <span className="text-red-500">Este campo es requerido</span>
                )}
              </div>
            </label>
          </div>

          <div>
            <label className="block sm:text-xs w-[628px]  opacity-90 ">
              <h5 className="font-[700] text-xl">Descripción</h5>
              <div
                style={{ transform: 'skewX(-10deg)' }}
                className=" border-[1.6px] border-[#FFFFFF] mb-2 py-2 sm:mb-10 flex sm:text-base items-center  w-[80%] mt-2"
              >
                <PiUserListBold className="pl-2 w-6" />
                <input
                  type="text"
                  placeholder="Estoy libre para jugar a las tardes"
                  onChange={(e) => setDescription(e.target.value)}
                  className="polygon pl-2 py-2 focus:border-none block w-full bg-transparent focus:outline-none sm:text-base"
                />
              </div>
            </label>
          </div>

          <div className="mt-10">
            <h5 className="pb-2 text-xl sm:mt-10 font-[700] mt-2">
              Plataformas preferidas
            </h5>
            <div className="flex gap-10 ">
              {platforms.map(({ value, Icon, label }) => (
                <label
                  key={value}
                  className={`w-fit flex flex-col items-center justify-center text-sm ${
                    selectedPlatforms.includes(value)
                      ? 'opacity-100'
                      : 'opacity-20'
                  }`}
                  htmlFor={value}
                >
                  <input
                    type="checkbox"
                    name="platform"
                    className="hidden"
                    value={value}
                    id={value}
                    checked={selectedPlatforms.includes(value)}
                    onChange={() => handlePlatformChange(value)}
                  />
                  <Icon />
                  {label}
                </label>
              ))}
            </div>
          </div>

          <div className="">
            <h4 className="font-[700] text-xl">
              Agrega los juegos que te gustan
            </h4>
            <div className="flex gap-1 pt-2">
              <GameSelector
                onSelectGame={setSelectedGames}
                selectedGames={selectedGames}
              />
            </div>
          </div>
          <button type="submit" className="btn yellowBtn">
            Guardar
          </button>
        </form>
      </div>

      <div className="flex-1 bg-[#3E3A3A] rounded-[12px] flex justify-center m-[25px]">
        <ProfileDer
          username={username}
          description={description}
          selectedDate={age}
          selectedGenre={selectedGenre}
          selectedGames={selectedGames}
          selectedPlatforms={selectedPlatforms}
        />
      </div>
    </div>
  );
};

export default ProfileForm;
