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
import api from "../services/api";
import { useParams } from "react-router-dom";

interface Food {
  id: string;
  description: string;
  energy_kcal: string;
  protein_g: string;
  lipid_g: string;
  carbohydrate_g: string;
  fiber_g: string;
  category: string;
}

export function FoodList() {
  const { category } = useParams<{ category: string }>();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [foods, setFoods] = useState<Food[]>([]);

  const totalPages = Math.ceil(total / 10);

  useEffect(() => {
    api
      .get(`/foods`, { params: { category, page, search } })
      .then((response) => {
        setFoods(response.data.foods);
        setTotal(response.data.total);
      })
      .catch((error) => {
        console.error("Error fetching foods:", error);
      });
  }, [category, page, search]);

  function setCurrentSearch(search: string) {
    setSearch(search);
    setPage(1);
  }

  function setCurrentPage(page: number) {
    setPage(page);
  }

  function onSearchInputChanged(event: ChangeEvent<HTMLInputElement>) {
    setCurrentSearch(event.target.value);
  }

  function goToFirstPage() {
    setCurrentPage(1);
  }

  function goToLastPage() {
    setCurrentPage(totalPages);
  }

  function goToPreviousPage() {
    setCurrentPage(page - 1);
  }

  function goToNextPage() {
    setCurrentPage(page + 1);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-3 items-center">
        <h1 className="text-2xl font-bold">Cereais e derivados</h1>
        <div className="px-3 w-72 py-1.5 border border-white/10 rounded-lg flex items-center gap-3">
          <Search className="size-4 text-emerald-300" />
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
            <TableHeader className="py-3 px-2 text-sm font-semibold text-start">
              Descrição dos alimentos
            </TableHeader>
            <TableHeader>Kcal</TableHeader>
            <TableHeader>Proteína (g)</TableHeader>
            <TableHeader>Lipídeos (g)</TableHeader>
            <TableHeader>Carboidrato (g)</TableHeader>
            <TableHeader>Fibra alimentar (g)</TableHeader>
          </tr>
        </thead>
        <tbody>
          {foods.map((food) => {
            return (
              <TableRow key={food.id}>
                <TableCell>{food.id}</TableCell>
                <TableCell className="text-start">{food.description}</TableCell>
                <TableCell>{Number(food.energy_kcal).toFixed(2)}</TableCell>
                <TableCell>{Number(food.protein_g).toFixed(1)}</TableCell>
                <TableCell>{Number(food.lipid_g).toFixed(1)}</TableCell>
                <TableCell>{Number(food.carbohydrate_g).toFixed(1)}</TableCell>
                <TableCell>{Number(food.fiber_g).toFixed(1)}</TableCell>
              </TableRow>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <TableCell colSpan={3}>
              Mostrando {foods.length} de {total} itens
            </TableCell>
            <TableCell className="text-right" colSpan={3}>
              <div className="inline-flex items-center gap-8">
                <span>
                  Página {page} de {totalPages}
                </span>
                <div className="flex gap-1.5">
                  <IconButton onClick={goToFirstPage} disabled={page === 1}>
                    <ChevronsLeft className="size-4" />
                  </IconButton>
                  <IconButton onClick={goToPreviousPage} disabled={page === 1}>
                    <ChevronLeft className="size-4" />
                  </IconButton>
                  <IconButton
                    onClick={goToNextPage}
                    disabled={page === totalPages}
                  >
                    <ChevronRight className="size-4" />
                  </IconButton>
                  <IconButton
                    onClick={goToLastPage}
                    disabled={page === totalPages}
                  >
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
