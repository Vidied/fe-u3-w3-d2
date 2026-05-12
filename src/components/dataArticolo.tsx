const dataArticolo = (data: string) => {
  const date = new Date(data);
  return new Intl.DateTimeFormat("it-IT", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
};

export default dataArticolo;
