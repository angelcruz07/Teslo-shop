export const generatePaginationNumbers = (
  currentPage: number,
  totalPages: number,
) => {
  //Si el numero total de paginas es 7 o menos mostramos todas las paginas sin ...
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  //Si la pagina actual esta entres las primeras 3 paginas
  //mostrar las primeras 3 ... y las ultimas 2

  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages]; //[1,2,3, '...', 49,50]
  }

  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  //Si la pagina actual esta en otro lugrar medio entonces
  //mostrar la primera pagina ..., puntos supensivos y vecinos

  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
};
