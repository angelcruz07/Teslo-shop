export const currencyFormat = (value: number) => {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 2,
    maximumSignificantDigits: 2,
  }).format(value);
};
