"use client";

import Link from "next/link";

import { GithubLogo } from "@phosphor-icons/react";

const NavBar = () => {
  return (
    <header className="fixed top-0 shadow-sm w-full p-4 z-10 backdrop-blur-lg">
      <div className="flex justify-around">
        <div>
          <Link href="/" className="text-4xl font-bold text-slate-700">
            TVID
          </Link>
        </div>
        <Link href="https://github.com/Rafikhalbi" target="_blank">
          <GithubLogo size={40} color="#336d9b" weight="light" />
        </Link>
      </div>
    </header>
  );
};

export default NavBar;
