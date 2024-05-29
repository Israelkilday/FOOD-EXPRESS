"use client";

import { SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { FormEventHandler, useState } from "react";
import { useRouter } from "next/navigation";

const Search = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (!search) {
      return;
    }
    router.push(`/restaurants?search=${search}`);
  };

  return (
    <form
      className="flex min-w-full gap-2 md:px-5"
      onSubmit={handleSearchSubmit}
    >
      <Input
        placeholder="Buscar Restaurantes"
        className="border-none md:bg-slate-200"
        onChange={handleChange}
        value={search}
      />
      <Button size="icon" type="submit" className="md:bg-yellow-500">
        <SearchIcon size={20} />
      </Button>
    </form>
  );
};

export default Search;
