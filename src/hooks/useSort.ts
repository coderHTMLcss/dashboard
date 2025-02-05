import { useCallback, useState } from "react";
import { TableProps } from "../types";

export const useSort = (data: TableProps[]) => {
  const [sortedData, setSortedData] = useState<TableProps[]>(data);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof TableProps;
    direction: string;
  } | null>(null);

  const sortProjects = useCallback(
    (key: keyof TableProps) => {
      setSortedData((prevProjects) => {
        const sortedData = [...prevProjects].sort(
          (a, b) =>
            a[key].toLocaleString().localeCompare(b[key].toLocaleString()) *
            (sortConfig?.key === key && sortConfig.direction === "ascending"
              ? -1
              : 1)
        );
        setSortConfig({
          key,
          direction:
            sortConfig?.direction === "ascending" ? "descending" : "ascending",
        });
        return sortedData;
      });
    },
    [sortConfig]
  );

  return { sortedData, sortProjects };
};
