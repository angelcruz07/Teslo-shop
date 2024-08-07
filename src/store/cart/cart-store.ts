import type { CartProduct } from "@/interfaces";
import { create } from "zustand";

interface State {
  cart: CartProduct[];

  addProductToCart: (product: CartProduct) => void;
}

export const useCartStore = create<State>((set, get) => ({
  cart: [],

  //Methods
  addProductToCart: (product: CartProduct) => {
    const { cart } = get();

    const productInCart = cart.some(
      (item) => item.id === product.id && item.size === product.size,
    );

    if (!productInCart) {
      set({ cart: [...cart, product] });
      return;
    }

    // 2. Incrementar la cantidad
    const updatedCartProducts = cart.map((item) => {
      if (item.id === product.id && item.size === product.size) {
        return { ...item, quantity: item.quantity + product.quantity };
      }

      return item;
    });
    set({ cart: updatedCartProducts });
  },
}));
