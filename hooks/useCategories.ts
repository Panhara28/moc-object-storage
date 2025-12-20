import { useEffect, useState } from "react";

export function useCategories(categoryOf: string) {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const res = await fetch(
        `/api/categories/tree?categoryOf=${categoryOf ? categoryOf : "DEFAULT"}`
      );
      const data = await res.json();
      setCategories(data);
      setLoading(false);
    }
    load();
  }, []);

  return { categories, loading, setCategories };
}
