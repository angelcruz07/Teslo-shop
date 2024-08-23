"use client";
import { deleteUserAddress, setUserAddress } from "@/actions";
import { Country, UserAddress } from "@/interfaces";
import { useAddressStore } from "@/store";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { InputForm } from "./componets";
import { FormInputs } from "./models";

interface Props {
  countries: Country[];
  userDbAddress?: Partial<UserAddress>;
}

export const AddressForm = ({ countries, userDbAddress = {} }: Props) => {
  const {
    id, //Not use
    userId, // Not use
    countryId: country,
    ...restUserDbAddress
  } = userDbAddress;

  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { isValid },
    reset,
  } = useForm<FormInputs>({
    defaultValues: {
      ...restUserDbAddress,
      country,
      rememberAddress: true,
    },
  });

  const { data: session } = useSession({
    required: true,
  });

  const setAddress = useAddressStore((state) => state.setAddress);
  const shippingAddress = useAddressStore((state) => state.shippingAddress);

  useEffect(() => {
    if (shippingAddress.firstName) {
      reset(shippingAddress);
    }
  }, [reset, shippingAddress]);

  const onSubmit = async (data: FormInputs) => {
    const { rememberAddress, ...address } = data;
    setAddress(address);

    if (rememberAddress) {
      await setUserAddress(address, session!.user.id);
    } else {
      await deleteUserAddress(session!.user.id);
    }
    router.push("/checkout");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 gap-2 sm:gap-5 sm:grid-cols-2"
    >
      <InputForm label="Nombres" name="firstName" register={register} />
      <InputForm label="Apellidos" name="lastName" register={register} />
      <InputForm
        label="Calle, Numero exterior, Numero interior"
        name="address"
        register={register}
      />
      <InputForm
        label="Direccion 2"
        name="address2"
        register={register}
        required={false}
      />
      <InputForm label="Código postal" name="postalCode" register={register} />
      <InputForm label="Ciudad" name="city" register={register} />
      <InputForm label="Telefono" name="phone" register={register} />
      <div className="flex flex-col mb-2">
        <label>País</label>
        <select
          className="p-2 border rounded-md bg-gray-200"
          {...register("country", { required: true })}
        >
          <option value="">[ Seleccione ]</option>
          {countries.map((country) => (
            <option key={country.id} value={country.id}>
              {country.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col mb-2 sm:mt-1">
        <div className="inline-flex items-center mb-10">
          <label
            className="relative flex cursor-pointer items-center rounded-full p-3"
            htmlFor="checkbox"
            data-ripple-dark="true"
          >
            <input
              type="checkbox"
              className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-gray-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-pink-500 checked:bg-blue-500 checked:before:bg-blue-500 hover:before:opacity-10"
              id="checkbox"
              {...register("rememberAddress")}
            />
            <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5"
                viewBox="0 0 20 20"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth={1}
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </label>
          <span>Quieres recodar esta direccion para futuras compras?</span>
        </div>

        <button
          disabled={!isValid}
          type="submit"
          className={clsx({
            "btn-primary": isValid,
            "btn-disabled": !isValid,
          })}
        >
          Siguiente
        </button>
      </div>
    </form>
  );
};
