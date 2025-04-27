"use client";

import { usePathname } from "next/navigation";
import { ListMagnifyingGlass, MonitorPlay } from "@phosphor-icons/react";
import Link from "next/link";

const BottomBar = () => {
  const pathname = usePathname();

  const isHomePage = pathname === "/";
  const isVideoPage = pathname === "/play";

  return (
    <div className="fixed bottom-0 p-4 w-full shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-10 bg-white">
      <div className="flex justify-around">
        <div>
          <Link href="/">
            <ListMagnifyingGlass
              size={40}
              color={isHomePage ? "#d336a0" : "#7869aa"}
              weight="duotone"
            />
          </Link>
        </div>
        <div>
          <Link href="/play">
            <MonitorPlay
              size={40}
              color={isVideoPage ? "#d336a0" : "#7869aa"}
              weight="duotone"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BottomBar;
