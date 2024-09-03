import { Fragment, useState } from "react";
import type { Place } from "../api/Place";
import { search } from "../api/search";

interface LocationSearchProps {
  onPlaceClick: (place: Place) => void;
}

export default function LocationSearch({ onPlaceClick }: LocationSearchProps) {
  const [term, setTerm] = useState("");
  const [places, setPlaces] = useState<Place[]>([]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const result = await search(term);
    setPlaces(result);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label className="font-bold" htmlFor="term">
          Search
        </label>
        <input
          className="w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-indigo-500"
          id="term"
          value={term}
          onChange={(event) => setTerm(event.target.value)}
        />
      </form>

      <h1 className="mt-6 font-bold">Found Locations</h1>
      <div className="mt-2 grid grid-cols-[1fr_40px] items-center gap-2">
        {places.map((place) => (
          <Fragment key={place.id}>
            <p className="text-sm">{place.name}</p>
            <button
              className="rounded bg-blue-500 px-1 py-1 text-xs font-bold text-white"
              onClick={() => onPlaceClick(place)}
            >
              Go
            </button>
            <div className="col-span-2 w-full border-b" />
          </Fragment>
        ))}
      </div>
    </div>
  );
}
