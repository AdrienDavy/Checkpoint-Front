import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="header bg-primary text-white flex flex-col items-center justify-between p-4">
      <h1 className=" font-bold text-2xl">Checkpoint : frontend</h1>
      <Link to="/" className=" text-xl">
        Countries
      </Link>
    </header>
  );
}
