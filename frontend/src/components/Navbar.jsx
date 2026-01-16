import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/ContextProvider";

export const Navbar = ({setQuery}) => {
  const { user, logout } = useAuth();
  

  // 👇 PUT IT HERE
  console.log("Navbar user:", user);

  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between items-center">
      <div className="text-xl font-bold"
     >
        <Link to="/">NoteApp</Link>
      </div>

      <input
        type="text"
        placeholder="Search notes..."
        className="bg-gray-600 px-4 py-2 rounded outline-none"
         onChange={(e) => setQuery(e.target.value)}
      />

      <div>
        {user ? (
          <>
             <span className="mr-4">Hi, {user?.name?.name}</span>

            <button
              onClick={logout}
              className="bg-red-500 px-4 py-2 rounded"
              
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="bg-blue-500 px-4 py-2 rounded mr-4"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-green-500 px-4 py-2 rounded"
            >
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
