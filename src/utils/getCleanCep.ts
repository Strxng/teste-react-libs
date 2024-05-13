export const getCleanCep = (cep: string) => {
  return cep.replace("-", "").replace(".", "").trim();
};
