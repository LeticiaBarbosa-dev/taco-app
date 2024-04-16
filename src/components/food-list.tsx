import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Search,
} from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";
import { Table } from "./table/table";
import { TableHeader } from "./table/table-header";
import { TableCell } from "./table/table-cell";
import { IconButton } from "./icon-button";
import { TableRow } from "./table/table-row";

interface Food {
  id: string;
  description: string;
  humidity_percents: string;
  energy_kcal: string;
  energy_kj: string;
  protein_g: string;
  lipid_g: string;
  cholesterol_mg: string;
  carbohydrate_g: string;
  fiber_g: string;
  ashes_g: string;
  calcium_mg: string;
  magnesium_mg: string;
}

export function FoodList() {
  const [search, setSearch] = useState(() => {
    const url = new URL(window.location.toString());

    if (url.searchParams.has("search")) {
      return url.searchParams.get("search") ?? "";
    }
  });

  const [page, setPage] = useState(() => {
    const url = new URL(window.location.toString());

    if (url.searchParams.has("page")) {
      return Number(url.searchParams.get("page"));
    }
    return 1;
  });

  const [foods, setFoods] = useState<Food[]>([]);

  useEffect(() => {
    fetch("./TACO.json", {
      headers: {
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setFoods(res);
      });
  });

  function setCurrentSearch(search: string) {
    const url = new URL(window.location.toString());

    url.searchParams.set("search", search);

    window.history.pushState({}, "", url);

    setSearch(search);
  }

  function setCurrentPage(page: number) {
    const url = new URL(window.location.toString());

    url.searchParams.set("page", String(page));

    window.history.pushState({}, "", url);

    setPage(page);
  }

  function onSearchInputChanged(event: ChangeEvent<HTMLInputElement>) {
    setCurrentSearch(event.target.value);
    setCurrentPage(1);
  }
  return (
    <div className=" flex flex-col gap-4">
      <div className="flex gap-3 items-center">
        <h1 className="text-2xl font-bold">Cereais e derivados</h1>
        <div className="px-3 w-72 py-1.5 border border-white/10 rounded-lg flex items-center gap-3">
          <Search className="size-4 text-custom-green-default" />
          <input
            onChange={onSearchInputChanged}
            value={search}
            className="bg-transparent flex-1 outline-none border-0 p-0 text-sm focus:ring-0"
            placeholder="Buscar alimento..."
          />
        </div>
      </div>

      <Table>
        <thead>
          <tr className="border-b border-white/10">
            <TableHeader>Número</TableHeader>
            <TableHeader>Descrição dos alimentos</TableHeader>
            <TableHeader>Umidade (%)</TableHeader>
            <TableHeader>Kcal</TableHeader>
            <TableHeader>Kj</TableHeader>
            <TableHeader>Proteína (g)</TableHeader>
            <TableHeader>Lipídeos (g)</TableHeader>
            <TableHeader>Colesterol (mg)</TableHeader>
            <TableHeader>Carboidrato (g)</TableHeader>
            <TableHeader>Fibra alimentar (g)</TableHeader>
            <TableHeader>Cinzas (g)</TableHeader>
            <TableHeader>Cálcio (mg)</TableHeader>
            <TableHeader>Magnésio (mg)</TableHeader>
          </tr>
        </thead>

        <tbody>
          {foods.map((food) => {
            return (
              <TableRow key={food.id}>
                <TableCell>{food.id}</TableCell>
                <TableCell>{food.description}</TableCell>
                <TableCell>{food.humidity_percents}</TableCell>
                <TableCell>{food.energy_kcal}</TableCell>
                <TableCell>{food.energy_kj}</TableCell>
                <TableCell>{food.protein_g}</TableCell>
                <TableCell>{food.lipid_g}</TableCell>
                <TableCell>{food.cholesterol_mg}</TableCell>
                <TableCell>{food.carbohydrate_g}</TableCell>
                <TableCell>{food.fiber_g}</TableCell>
                <TableCell>{food.ashes_g}</TableCell>
                <TableCell>{food.calcium_mg}</TableCell>
                <TableCell>{food.magnesium_mg}</TableCell>
              </TableRow>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <TableCell colSpan={3}>Mostrando 10 de 200 alimentos</TableCell>
            <TableCell className="text-right" colSpan={4}>
              <div className="inline-flex items-center gap-8">
                <span>Página 1 de 11</span>
                <div className="flex gap-1.5">
                  <IconButton>
                    <ChevronsLeft className="size-4" />
                  </IconButton>
                  <IconButton>
                    <ChevronLeft className="size-4" />
                  </IconButton>
                  <IconButton>
                    <ChevronRight className="size-4" />
                  </IconButton>
                  <IconButton>
                    <ChevronsRight className="size-4" />
                  </IconButton>
                </div>
              </div>
            </TableCell>
          </tr>
        </tfoot>
      </Table>
    </div>
  );
}
