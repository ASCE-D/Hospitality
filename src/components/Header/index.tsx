"use client";
import { signOut, useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const Header = () => {
  const { data: session } = useSession();
  const pathUrl = usePathname();
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [sticky, setSticky] = useState(false);

  const navbarToggleHandler = () => {
    setNavbarOpen(!navbarOpen);
  };

  // const handleStickyNavbar = () => {
  //   if (window.scrollY >= 80) {
  //     setSticky(true);
  //   } else {
  //     setSticky(false);
  //   }
  // };

  // useEffect(() => {
  //   window.addEventListener("scroll", handleStickyNavbar);
  // });

  const { theme, setTheme } = useTheme();

  return (
    <header
      className={`ud-header left-0 top-0 z-40 flex w-full items-center ${
        sticky
          ? "shadow-nav fixed z-[999] border-b border-stroke bg-white/80 backdrop-blur-[5px] dark:border-dark-3/20 dark:bg-dark/10"
          : "absolute bg-transparent"
      }`}
    >
      <div className="container">
        <div className="relative -mx-4 flex items-center justify-between">
          <div className="w-60 max-w-full px-4">
            <Link
              href="/"
              className={`navbar-logo block w-full ${
                sticky ? "py-2" : "py-5"
              } `}
            >
              <Image
                src={
                  sticky
                    ? "/images/logo/logo.svg"
                    : "/images/logo/logo-white.svg"
                }
                alt="logo"
                width={140}
                height={30}
                className="header-logo w-full dark:hidden"
              />

            </Link>
          </div>
          <div className="flex w-full items-center justify-end px-4">
            <button
              onClick={navbarToggleHandler}
              id="navbarToggler"
              aria-label="Mobile Menu"
              className="absolute right-4 top-1/2 block -translate-y-1/2 rounded-lg px-3 py-[6px] ring-primary focus:ring-2 lg:hidden"
            >
              <span
                className={`relative my-1.5 block h-0.5 w-[30px] transition-all duration-300 ${
                  navbarOpen ? " top-[7px] rotate-45" : " "
                } ${pathUrl !== "/" && "!bg-dark dark:!bg-white"} ${
                  pathUrl === "/" && sticky
                    ? "bg-dark dark:bg-white"
                    : "bg-white"
                }`}
              />
              <span
                className={`relative my-1.5 block h-0.5 w-[30px] transition-all duration-300 ${
                  navbarOpen ? "opacity-0 " : " "
                } ${pathUrl !== "/" && "!bg-dark dark:!bg-white"} ${
                  pathUrl === "/" && sticky
                    ? "bg-dark dark:bg-white"
                    : "bg-white"
                }`}
              />
              <span
                className={`relative my-1.5 block h-0.5 w-[30px] transition-all duration-300 ${
                  navbarOpen ? " top-[-8px] -rotate-45" : " "
                } ${pathUrl !== "/" && "!bg-dark dark:!bg-white"} ${
                  pathUrl === "/" && sticky
                    ? "bg-dark dark:bg-white dark:text-black"
                    : "bg-white"
                }`}
              />
            </button>
            <nav
              id="navbarCollapse"
              className={`navbar absolute right-0 z-30 w-[250px] rounded border-[.5px] border-body-color/50 bg-white px-6 py-4 duration-300 dark:border-body-color/20 dark:bg-dark-2 lg:visible lg:static lg:w-auto lg:border-none lg:!bg-transparent lg:p-0 lg:opacity-100 lg:dark:bg-transparent ${
                navbarOpen
                  ? "visibility top-full opacity-100"
                  : "invisible top-[120%] opacity-0"
              }`}
            >
              <ul className="block lg:flex lg:gap-x-8">
                {session?.user ? (
                  <>
                    <li className="group relative">
                      <Link
                        href="/dashboard/restaurant"
                        className={`flex py-2 text-base lg:inline-flex lg:px-0 lg:py-6 ${
                          sticky || pathUrl !== "/"
                            ? "text-dark group-hover:text-primary dark:text-white dark:group-hover:text-primary"
                            : "text-black"
                        }`}
                      >
                        Dashboard
                      </Link>
                    </li>
                    <li className="group relative">
                      <Link
                        href="/dashboard/settings"
                        className={`flex py-2 text-base lg:inline-flex lg:px-0 lg:py-6 ${
                          sticky || pathUrl !== "/"
                            ? "text-dark group-hover:text-primary dark:text-white dark:group-hover:text-primary"
                            : "text-black"
                        }`}
                      >
                        Settings
                      </Link>
                    </li>
                    <li className="group relative">
                      <button
                        onClick={() => signOut()}
                        className={`flex py-2 text-base lg:inline-flex lg:px-0 lg:py-6 ${
                          sticky || pathUrl !== "/"
                            ? "text-dark group-hover:text-primary dark:text-white dark:group-hover:text-primary"
                            : "text-black"
                        }`}
                      >
                        Sign Out
                      </button>
                    </li>
                  </>
                ) : (
                  <li className="group relative">
                    <Link
                      href="/signin"
                      className={`flex py-2 text-base lg:inline-flex lg:px-0 lg:py-6 ${
                        sticky || pathUrl !== "/"
                          ? "text-dark group-hover:text-primary dark:text-white dark:group-hover:text-primary"
                          : "text-black"
                      }`}
                    >
                      Sign In
                    </Link>
                  </li>
                )}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
