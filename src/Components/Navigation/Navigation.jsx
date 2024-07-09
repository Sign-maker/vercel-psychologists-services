import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";
import { useAuth } from "../../hooks/useAuth";

export const Navigation = () => {
  const { isLoggedIn } = useAuth();
  return (
    <nav>
      <ul className={css.navList}>
        <li>
          <NavLink className={css.navLink} to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive ? `${css.navLink} ${css.navLinkActive}` : css.navLink
            }
            to="psychologists"
          >
            Psychologists
          </NavLink>
        </li>
        {isLoggedIn && (
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? `${css.navLink} ${css.navLinkActive}` : css.navLink
              }
              to="favorites"
            >
              Favorites
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};
