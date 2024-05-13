import { ICep } from "../interfaces/Cep";
import { httpGet } from "../providers/http";
import { getCleanCep } from "../utils/getCleanCep";

export const getCep = async (cep: string) => {
  const cleanCep = getCleanCep(cep);

  return await httpGet<ICep>({
    endpoint: `https://brasilapi.com.br/api/cep/v1/${cleanCep}`,
  });
};
