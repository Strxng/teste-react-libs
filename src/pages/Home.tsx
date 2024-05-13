import { useForm } from "react-hook-form";
import { IAddressForm } from "./types";
import { useCallback, useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getCep } from "../services/getCep";
import { getCleanCep } from "../utils/getCleanCep";
import { Input } from "../components/Input";
import { saveAddress } from "../services/saveAddress";

export const HomePage = () => {
  const [cepToFind, setCepToFind] = useState<string>("");

  const { control, handleSubmit, watch, setValue } = useForm<IAddressForm>({
    defaultValues: {
      cep: "",
      city: "",
      complement: "",
      neighborhood: "",
      number: "",
      state: "",
      street: "",
    },
  });

  const { data: cep } = useQuery({
    queryKey: ["cep", cepToFind],
    queryFn: () => getCep(cepToFind),
    enabled: Boolean(cepToFind),
  });

  const mutation = useMutation({
    mutationKey: ["save-address"],
    mutationFn: saveAddress,
  });

  const onSubmit = useCallback(
    (values: IAddressForm) => {
      mutation.mutate({
        city: values.city,
        state: values.state,
      });
    },
    [mutation]
  );

  useEffect(() => {
    if (cep) {
      setValue("city", cep.city);
      setValue("state", cep.state);
      setValue("street", cep.street);
      setValue("neighborhood", cep.neighborhood);
    }
  }, [cep, setValue]);

  useEffect(() => {
    const sub = watch(({ cep }) => {
      const cleanCep = getCleanCep(cep ?? "");
      if (cleanCep.length === 8) {
        setCepToFind(cleanCep);
      }
    });
    return () => sub.unsubscribe();
  }, [watch]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "20%",
        gap: 10,
      }}
    >
      <Input
        name="cep"
        control={control}
        placeholder="Cep"
        rules={{
          required: "O campo é obrigatório",
        }}
      />

      <Input
        name="state"
        control={control}
        placeholder="State"
        rules={{
          required: "O campo é obrigatório",
        }}
      />

      <Input
        name="city"
        control={control}
        placeholder="City"
        rules={{
          required: "O campo é obrigatório",
        }}
      />

      <Input
        name="neighborhood"
        control={control}
        placeholder="Neighborhood"
        rules={{
          required: "O campo é obrigatório",
        }}
      />

      <Input
        name="street"
        control={control}
        placeholder="Street"
        rules={{
          required: "O campo é obrigatório",
        }}
      />

      <Input
        name="number"
        control={control}
        placeholder="Number"
        rules={{
          required: "O campo é obrigatório",
        }}
      />

      <Input
        name="complement"
        control={control}
        placeholder="Complement"
        rules={{
          required: "O campo é obrigatório",
        }}
      />

      <button disabled={mutation.isPending} onClick={handleSubmit(onSubmit)}>
        Enviar
      </button>
    </div>
  );
};
