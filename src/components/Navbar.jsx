import { NavLink } from "react-router-dom";
import "./style.css";
const Navbar = () => {
  return (
    <>
      <nav className="py-4 w-96 mx-auto">
        <ul className="flex">
          <NavLink
            className={(e) => {
              return e.isActive ? "bg-slate-200 text-slate-800 py-3 hover:text-slate-900" : "text-white py-3";
            }}
            to="/"
          >
            <li className="mx-10 text-xl">Home</li>
          </NavLink>
          <NavLink
            className={(e) => {
              return e.isActive ? "bg-slate-200 text-slate-800 py-3 hover:text-slate-900" : "text-white py-3";
            }}
            to="/login"
          >
            <li className="mx-10 text-xl">Login</li>
          </NavLink>
          <NavLink
            className={(e) => {
              return e.isActive ? "bg-slate-200 text-slate-800 py-3 hover:text-slate-900" : "text-white py-3";
            }}
            to="/register"
          >
            <li className="mx-10  text-xl">Register</li>
          </NavLink>
        </ul>
      </nav>
    </>
  );
};
export default Navbar;
