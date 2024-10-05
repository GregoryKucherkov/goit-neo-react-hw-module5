import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";
import clsx from "clsx";

const generateActiveClass = ({ isActive }) => {
  return clsx(css.navLink, isActive && css.isActive);
};

function Navigation() {
  return (
    <nav className={css.navBlock}>
      <NavLink className={generateActiveClass} to="/">
        Home
      </NavLink>
      <NavLink className={generateActiveClass} to="/Movies">
        Movies
      </NavLink>
    </nav>
  );
}

export default Navigation;
