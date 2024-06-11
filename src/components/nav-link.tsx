import { ReactNode } from "react";

interface NavLinkProps {
  onClick: () => void;
  children: ReactNode;
}
export function NavLink({ onClick, children }: NavLinkProps) {
  return (
    <button
      onClick={onClick}
      className="font-medium text-base text-custom-green-disabled"
    >
      {children}
    </button>
  );
}
