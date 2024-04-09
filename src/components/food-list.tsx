import { Search } from "lucide-react";
import { ChangeEvent, useState } from "react";

export function FoodList() {
  const [search, setSearch] = useState(() => {
    const url = new URL(window.location.toString());

    if (url.searchParams.has("search")) {
      return url.searchParams.get("search") ?? "";
    }
  });

  const [page, setPage] = useState(() => {
    const url = new URL(window.location.toString());

    if(url.searchParams.has("page")) {
        return Number(url.searchParams.get("page"));
    }
  })

  function setCurrentSearch(search: string) {
    const url = new URL(window.location.toString());

    url.searchParams.set("search", search);

    setCurrentSearch(search);
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
        {search}
      </div>
    </div>
  );
}
