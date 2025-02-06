import { useCallback, useState } from "react";
import { TableProps } from "../types";
import { data } from "../utils/data";
export const useSort = () => {
  const [projects, setProjects] = useState<TableProps[]>(data);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof TableProps;
    direction: string;
  } | null>(null);

  const sortProjects = useCallback(
    (key: keyof TableProps) => {
      setProjects((prevProjects) => {
        const sortedProjects = [...prevProjects].sort(
          (a, b) =>
            a[key].toString().localeCompare(b[key].toString()) *
            (sortConfig?.key === key && sortConfig.direction === "ascending"
              ? -1
              : 1)
        );
        setSortConfig({
          key,
          direction:
            sortConfig?.direction === "ascending" ? "descending" : "ascending",
        });
        return sortedProjects;
      });
    },
    [sortConfig]
  );

  return { projects, sortProjects };
};
