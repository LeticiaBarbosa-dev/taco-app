import logoTacoApi from "../assets/taco-api-logo.svg";
import { NavLink } from "./nav-link";
import { useNavigate } from "react-router-dom";

export function Header() {
  const navigate = useNavigate();

  function handleCategoryClick(category: string) {
    navigate(`/foods/${category}`);
  }

  return (
    <div>
      <div className="flex items-center py-3">
        <img className="" src={logoTacoApi} alt="" />
      </div>
      <div>
        <nav className="flex items-center gap-3.5">
          <NavLink onClick={() => handleCategoryClick("Cereais e derivados")}>
            Cereais e derivados
          </NavLink>
          <NavLink
            onClick={() =>
              handleCategoryClick("Verduras, hortaliças e derivados")
            }
          >
            Verduras, hortaliças e derivados
          </NavLink>
          <NavLink onClick={() => handleCategoryClick("Frutas e derivados")}>
            Frutas e derivados
          </NavLink>
          <NavLink
            onClick={() => handleCategoryClick("Pescados e frutos do mar")}
          >
            Pescados e frutos do mar
          </NavLink>
          <NavLink onClick={() => handleCategoryClick("Carnes e derivados")}>
            Carnes e derivados
          </NavLink>
          <NavLink onClick={() => handleCategoryClick("Miscelâneas")}>
            Miscelâneas
          </NavLink>
          <NavLink
            onClick={() => handleCategoryClick("Leguminosas e derivados")}
          >
            Leguminosas e derivados
          </NavLink>
          <NavLink onClick={() => handleCategoryClick("Nozes e sementes")}>
            Nozes e sementes
          </NavLink>
        </nav>
      </div>
    </div>
  );
}
