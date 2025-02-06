import React, { ChangeEvent } from "react";
import { TableProps } from "../types";

export const useFilter = (data: TableProps[]) => {
  const [filters, setFilters] = React.useState<{
    [key in keyof Omit<
      TableProps,
      "id" | "progress" | "date" | "image"
    >]: string;
  }>({
    client: "",
    city: "",
    email: "",
    project: "",
    status: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const filteredProjects = React.useMemo(() => {
    return data.filter((project) => {
      return Object.keys(filters).every((key) => {
        const filterValue = filters[key as keyof typeof filters].toLowerCase();
        const projectValue = project[key as keyof TableProps]
          .toString()
          .toLowerCase();
        return projectValue.includes(filterValue);
      });
    });
  }, [data, filters]);

  return { filters, filteredProjects, handleInputChange };
};
