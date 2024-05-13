import axios from "axios";

interface Request<BodyType, ParamsType> {
  endpoint: string;
  body?: BodyType;
  params?: ParamsType;
}

const api = axios.create({
  baseURL: "https://some-domain.com/api/",
  timeout: 30000,
});

export const httpGet = async <ResponseType = any, ParamsType = any>({
  endpoint,
  params,
}: Request<any, ParamsType>) => {
  const { data } = await api.get<ResponseType>(endpoint, { params });
  return data;
};

export const httpPost = async <ResponseType = any, BodyType = any>({
  endpoint,
  body,
  params,
}: Request<BodyType, any>) => {
  const { data } = await api.post<ResponseType>(endpoint, body, { params });
  return data;
};

export const httpPut = async <ResponseType = any, BodyType = any>({
  endpoint,
  body,
  params,
}: Request<BodyType, any>) => {
  const { data } = await api.put<ResponseType>(endpoint, body, { params });
  return data;
};

export const httpDelete = async <BodyType = any>({
  endpoint,
  body,
  params,
}: Request<BodyType, any>) => {
  await api.delete<ResponseType>(endpoint, { params, data: body });
};
