import { Link } from "react-router-dom";
import { Country } from "../gql/graphql";

interface CardProps {
  country: Country;
}

const Card = ({ country }: CardProps) => {
  return (
    <Link
      to={`/${country.code}`}
      className="bg-white shadow-md rounded-lg min-w-40 p-4 border border-gray-300"
    >
      <h2 className="text-xl font-bold mb-2 text-center">{country.name}</h2>
      <div className="flex items-center justify-center">
        <span className="text-4xl">{country.emoji}</span>
      </div>
    </Link>
  );
};

export default Card;
