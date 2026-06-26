"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { authClient } from "@/lib/auth-client";


import { MdDashboard } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { BiLogOut } from "react-icons/bi";
import { Avatar, Dropdown } from "@heroui/react";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Browse Recipes", href: "/recipes" },
  ];

  const { data: session } = authClient.useSession();
  const user = session?.user;
 

  const [profile, setProfile] = useState(null);
  //  console.log(profile)

  useEffect(() => {
    const fetchUser = async () => {
      if (!session?.user?.email) return;

      const { data: token } = await authClient.token();

      const res = await fetch(
        `http://localhost:5000/user/${session.user.email}`,
        {
          headers: {
            authorization: `Bearer ${token?.token}`,
          },
        }
      );

      const data = await res.json();
      setProfile(data);
    };

    fetchUser();
  }, [session]);



  const handleSignOut = async () => {
    await authClient.signOut();
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-white/20 dark:border-white/10 bg-white/70 dark:bg-slate-900/80 backdrop-blur-xl shadow-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 items-center h-16">

          {/* LOGO */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center text-xl shadow-md">
              🍳
            </div>
            <span className="text-xl font-bold group-hover:text-orange-500 dark:text-white dark:group-hover:text-orange-400 transition-colors">
              RecipeHub
            </span>
          </Link>

          {/* DESKTOP NAV LINKS */}
          <div className="hidden md:flex items-center justify-center gap-10">

            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="relative text-gray-700 dark:text-gray-300 font-medium transition-colors duration-300 hover:text-orange-500 dark:hover:text-orange-400 group"
              >
                {link.name}

                {/* underline */}
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}

            {/* Dashboard (logged in only) */}
            {user && (
              <Link
                href={`/dashboard/${user?.role || "user"}`}
                className="relative text-gray-700 dark:text-gray-300 font-medium transition-colors duration-300 hover:text-orange-500 dark:hover:text-orange-400 group"
              >
                Dashboard
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            )}
          </div>

          {/* RIGHT SIDE */}
          <div className="flex justify-end items-center gap-2">
            
            <ThemeToggle />

            {/* DESKTOP AUTH */}
            <div className="hidden md:flex items-center gap-3 ml-2">

              {!user ? (
                <>
                  <Link
                    href="/login"
                    className="px-5 py-2 rounded-lg border border-orange-400 text-orange-500 font-medium hover:bg-orange-50 transition-all duration-300"
                  >
                    Login
                  </Link>

                  <Link
                    href="/register"
                    className="px-5 py-2 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 text-white font-medium hover:opacity-90 transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    Register
                  </Link>
                </>
              ) : (
                /* PROFILE DROPDOWN */
                <Dropdown>
                  <Dropdown.Trigger className="rounded-full">
                    <Avatar size="lg">
                      <Avatar.Image
                        src={profile?.image || user?.image}
                        alt={profile?.name || user?.name}
                        referrerPolicy="no-referrer"
                      />
                      <Avatar.Fallback>
                        {profile?.name.charAt(0) || user?.name?.charAt(0)}
                      </Avatar.Fallback>
                    </Avatar>
                  </Dropdown.Trigger>

                  <Dropdown.Popover className="min-w-[220px]">

                    {/* USER INFO */}
                    <div className="px-3 pt-3 pb-2 border-b">
                      <p className="text-sm font-medium">{profile?.name || user?.name}</p>
                      <p className="text-xs text-gray-500 truncate">
                        {profile?.email || user?.email}
                      </p>
                    </div>

                    <Dropdown.Menu>

                      <Dropdown.Item id="dashboard">
                        <Link
                          href={`/dashboard/${user?.role || "user"}`}
                          className="flex items-center gap-2"
                        >
                          <MdDashboard />
                          Dashboard
                        </Link>
                      </Dropdown.Item>

                      <Dropdown.Item id="profile">
                        <Link
                          href="dashboard/profile"
                          className="flex items-center gap-2"
                        >
                          <CgProfile />
                          Profile
                        </Link>
                      </Dropdown.Item>

                      <Dropdown.Item
                        id="logout"
                        variant="danger"
                        onClick={handleSignOut}
                      >
                        <span className="flex items-center gap-2 text-red-500">
                          <BiLogOut />
                          Logout
                        </span>
                      </Dropdown.Item>

                    </Dropdown.Menu>
                  </Dropdown.Popover>
                </Dropdown>
              )}
            </div>

            {/* MOBILE MENU BUTTON */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X /> : <Menu />}
            </button>

          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="md:hidden border-t dark:border-white/10 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl px-4 py-4 space-y-4 shadow-lg transition-colors duration-300">

          {/* LINKS */}
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block text-gray-700 dark:text-gray-300 font-medium hover:text-orange-500 dark:hover:text-orange-400 transition"
            >
              {link.name}
            </Link>
          ))}

          {/* DASHBOARD */}
          {user && (
            <Link
              href={`/dashboard/${user?.role || "user"}`}
              onClick={() => setIsOpen(false)}
              className="block text-gray-700 dark:text-gray-300 font-medium hover:text-orange-500 dark:hover:text-orange-400 transition"
            >
              Dashboard
            </Link>
          )}

          {/* AUTH */}
          <div className="pt-3 border-t">

            {!user ? (
              <>
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="block py-2 text-orange-500"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  onClick={() => setIsOpen(false)}
                  className="block py-2 text-orange-500"
                >
                  Register
                </Link>
              </>
            ) : (
              <button
                onClick={handleSignOut}
                className="text-red-500"
              >
                Logout
              </button>
            )}

          </div>

        </div>
      )}
    </nav>
  );
}