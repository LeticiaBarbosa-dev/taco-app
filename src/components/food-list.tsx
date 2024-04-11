import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Search } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { Table } from "./table/table";
import { TableHeader } from "./table/table-header";
import { TableRow } from "./table/table-row";
import { TableCell } from "./table/table-cell";
import { IconButton } from "./icon-button";

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
          <TableRow>
            <TableCell>1</TableCell>
            <TableCell>Arroz, integral, cozido</TableCell>
            <TableCell>70,1</TableCell>
            <TableCell>124</TableCell>
            <TableCell>517</TableCell>
            <TableCell>2,6</TableCell>
            <TableCell>1</TableCell>
            <TableCell>NA</TableCell>
            <TableCell>25,8</TableCell>
            <TableCell>2,7</TableCell>
            <TableCell>0,5</TableCell>
            <TableCell>5</TableCell>
            <TableCell>59</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>2</TableCell>
            <TableCell>Arroz, integral, cru</TableCell>
            <TableCell>12,2</TableCell>
            <TableCell>360</TableCell>
            <TableCell>1505</TableCell>
            <TableCell>1,9</TableCell>
            <TableCell>1,9</TableCell>
            <TableCell>NA</TableCell>
            <TableCell>77,5</TableCell>
            <TableCell>4,8</TableCell>
            <TableCell>1,2</TableCell>
            <TableCell>8</TableCell>
            <TableCell>110</TableCell>
          </TableRow>
        </tbody>
        <tfoot>
          <tr>
            <TableCell colSpan={5}>Mostrando 10 de 200 alimentos</TableCell>
            <TableCell className="text-right" colSpan={5}>
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
