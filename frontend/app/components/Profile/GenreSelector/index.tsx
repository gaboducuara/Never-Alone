import React, { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/20/solid';
import { classNames } from '../../../utils';

const genres = ['Hombre', 'Mujer', 'Otros'];

interface GenreSelectorProps {
  selectedGenre: string | null;
  setSelectedGenre: (genre: string) => void;
}

export default function GenreSelector({
  selectedGenre,
  setSelectedGenre,
}: GenreSelectorProps) {
  return (
    <Listbox value={selectedGenre} onChange={setSelectedGenre}>
      {({ open }) => (
        <>
          <div className="relative">
            <Listbox.Button className="relative w-full cursor-default rounded-md bg-transparent pt-2 pb-3 pl-3 pr-10 text-left text-white h-full focus:outline-none  sm:text-base sm:leading-6">
              <span className="block truncate">
                {selectedGenre === null
                  ? 'Selecciona una opción'
                  : selectedGenre}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"></span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {genres.map((genre) => (
                  <Listbox.Option
                    key={genre}
                    className={({ active }) =>
                      classNames(
                        active ? ' text-black' : 'text-gray-900',
                        'relative cursor-default select-none py-2 pl-8 pr-4'
                      )
                    }
                    value={genre}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={classNames(
                            selected ? 'font-semibold' : 'font-normal',
                            'block truncate'
                          )}
                        >
                          {genre}
                        </span>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? 'text-black' : 'text-indigo-600',
                              'absolute inset-y-0 left-0 flex items-center pl-1.5'
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}
