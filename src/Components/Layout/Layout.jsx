import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Loader } from "../Loader/Loader";
import { useAuth } from "../../hooks/useAuth";
import { Logo } from "../Logo/Logo";
import { Navigation } from "../Navigation/Navigation";
import { UserMenu } from "../UserMenu/UserMenu";
import { AuthNav } from "../AuthNav/AuthNav";
import css from "./Layout.module.css";

export const Layout = () => {
  const { isLoggedIn } = useAuth();
  return (
    <>
      <header className={css.header}>
        <div className={`${css.wrapper} container`}>
          <div className={css.logoAndNavigationWrapper}>
            <Logo />
            <Navigation />
          </div>
          {isLoggedIn ? <UserMenu /> : <AuthNav />}
        </div>
      </header>
      <main>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>
      <footer></footer>
    </>
  );
};
