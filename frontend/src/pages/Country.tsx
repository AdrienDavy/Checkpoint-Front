import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { queryCountry } from "../api/Country";

const Country = () => {
  const { code } = useParams();
  const { data } = useQuery(queryCountry, {
    variables: { code: code || "" },
    fetchPolicy: "cache-and-network",
  });
  const country = data?.country;

  return (
    <div className="flex flex-col items-center justify-center font-bold min-h-screen gap-4 bg-gray-100">
      <span className="text-4xl">{country?.emoji}</span>

      <h2 className="text-xl ">
        Name : {country?.name}({country?.code})
      </h2>
      <p>Continent : {country?.continent?.name} </p>
    </div>
  );
};

export default Country;
