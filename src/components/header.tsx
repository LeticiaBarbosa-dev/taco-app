import logoTacoApi from "../assets/taco-api-logo.svg";
import { NavLink } from "./nav-link";
export function Header() {
  return (
    <div>
      <div className="flex items-center py-3">
        <img className="" src={logoTacoApi} alt="" />
      </div>
      <div>
        <nav className="flex items-center gap-3.5">
          <NavLink href="/cereais-derivados">Cereais e derivados</NavLink>
          <NavLink href="/verduras-hortalicas-derivados">
            Verduras, hortaliças e derivados
          </NavLink>
          <NavLink href="/frutas-derivados">Frutas e derivados</NavLink>
          <NavLink href="/pescados-frutos-do-mar">
            Pescados e frutos do mar
          </NavLink>
          <NavLink href="/carnes-derivados">Carnes e derivados</NavLink>
          <NavLink href="/miscelaneas">Miscelâneas</NavLink>
          <NavLink href="/leguminosas-derivados">
            Leguminosas e derivados
          </NavLink>
          <NavLink href="/nozes-sementes">Nozes e sementes</NavLink>
        </nav>
      </div>
    </div>
  );
}
