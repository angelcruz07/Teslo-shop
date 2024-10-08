import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  shippingAddress: {
    firstName: string;
    lastName: string;
    address: string;
    address2?: string;
    postalCode: string;
    city: string;
    country: string;
    phone: string;
  };

  //methods
  setAddress: (address: State["shippingAddress"]) => void;
}

export const useAddressStore = create<State>()(
  persist(
    (set, get) => ({
      shippingAddress: {
        firstName: "",
        lastName: "",
        address: "",
        address2: "",
        postalCode: "",
        city: "",
        country: "",
        phone: "",
      },

      setAddress: (shippingAddress) => {
        set({ shippingAddress });
      },
    }),
    {
      name: "address-storage",
    },
  ),
);
