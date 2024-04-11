import { FoodList } from "./components/food-list";
import { Header } from "./components/header";

export function App() {
  return (
    <div className="max-w-[1448px] mx-auto px-4 py-3 flex flex-col gap-5">
      <Header />
      <FoodList />
    </div>
  );
}
