export interface ISaveAddressParams {
  city: string;
  state: string;
}

export const saveAddress = async (values: ISaveAddressParams) => {
  console.log(values);
  // guarda no banco os values
};
