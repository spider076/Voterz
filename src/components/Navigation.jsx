import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="pb-1 border-bottom border-gray-200 !text-[white]">
      <ul className="flex space-x-6">
        <li className="text-white pr-10">
          <Link
            to="/"
            className="hover:underline !hover:text-blue-400 !text-[white] font-semibold text-[1.4rem]"
          >
            VOTERZZ
          </Link>
        </li>

        <li>
          <Link to="/register-voter" className="hover:underline">
            Register Voter
          </Link>
        </li>
        <li>
          <Link to="/register-candidate" className="hover:underline">
            Register Candidate
          </Link>
        </li>
        <li>
          <Link to="/voter-list" className="hover:underline">
            Voter List
          </Link>
        </li>
        <li>
          <Link to="/candidate-list" className="hover:underline">
            Candidate List
          </Link>
        </li>
        <li>
          <Link to="/electioncommision" className="hover:underline">
            Election Commission
          </Link>
        </li>
        <li>
          <Link to="/cast-vote" className="hover:underline">
            Cast Vote
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
