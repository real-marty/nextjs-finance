"use client";

import { usePathname } from "next/navigation";

import { NavButton } from "@/components/nav-button";

const routes = [
  {
    href: "/",
    label: "Overwiev",
  },
  {
    href: "/transactions",
    label: "Transactions",
  },
  {
    href: "/accounts",
    label: "Accounts",
  },
  {
    href: "/categories",
    label: "Categories",
  },
  {
    href: "/settings",
    label: "Settings",
  },
];

type Props = {};

export const Navigation = ({}: Props) => {
  const pathname = usePathname();

  return (
    <nav className="hidded lg:flex items-center gap-x-2 overflow-x-auto">
      {routes.map((route) => (
        <NavButton
          key={route.href}
          href={route.href}
          label={route.label}
          isActive={pathname === route.href}
        />
      ))}
    </nav>
  );
};
