import { useMutation, useQuery } from "@apollo/client";
import { queryCountries } from "../api/Countries";
import Card from "../components/Card";
import { Continent, Country } from "../gql/graphql";
import { createCountry } from "../api/CreateCountry";
import { queryContinents } from "../api/Continents";
import { useState } from "react";

export function HomePage() {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [emoji, setEmoji] = useState("");
  const [continentId, setContinentId] = useState(1);

  const { data: continentDatas } = useQuery(queryContinents, {
    fetchPolicy: "cache-and-network",
  });
  const continents = continentDatas?.continents;

  const { data } = useQuery(queryCountries, {
    fetchPolicy: "cache-and-network",
  });
  const countries = data?.countries;

  const [doCreateCountry] = useMutation(createCountry, {
    refetchQueries: [{ query: queryCountries }],
  });

  async function doCreate() {
    try {
      const { data } = await doCreateCountry({
        variables: {
          data: {
            name: name,
            code: code,
            emoji: emoji,
            continent: {
              id: continentId,
            },
          },
        },
      });
      setName("");
      setCode("");
      setEmoji("");
      setContinentId(1);
      console.log("Continent created:", continentId);

      console.log("Country created:", data);
    } catch (error) {
      console.error("Error creating country:", error);
    }
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center my-8 bg-gray-100">
        <form className="flex items-center flex-col lg:flex-row justify-between gap-4 w-full max-w-2xl mb-4 border bg-white border-gray-300 p-4 rounded">
          <input
            minLength={2}
            maxLength={50}
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border w-full border-gray-300 p-2 rounded"
          />
          <input
            minLength={2}
            maxLength={3}
            type="text"
            placeholder="Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="border w-full border-gray-300 p-2 rounded"
          />
          <input
            maxLength={4}
            type="text"
            placeholder="Emoji"
            value={emoji}
            onChange={(e) => setEmoji(e.target.value)}
            className="border w-full border-gray-300 p-2 rounded"
          />
          <select
            value={continentId}
            onChange={(e) => setContinentId(parseInt(e.target.value))}
            className="border w-full border-gray-300 p-2 rounded"
          >
            {continents?.map((continent: Continent) => (
              <option key={continent.id} value={continent.id}>
                {continent.name}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={doCreate}
            className="bg-primary text-white p-2 rounded cursor-pointer hover:bg-primary-hover"
          >
            Create Country
          </button>
        </form>
        <div className="flex flex-wrap gap-4 justify-center">
          {countries?.map((country: Country) => (
            <Card key={country.id} country={country} />
          ))}
        </div>
      </div>
    </>
  );
}
