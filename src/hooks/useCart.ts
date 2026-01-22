import { useReducer, useMemo } from "react";

export type CartState = {
  [productId: number]: number;
};

type Action =
  | { type: "ADD"; id: number }
  | { type: "REMOVE"; id: number }
  | { type: "RESET" };

function cartReducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case "ADD":
      return {
        ...state,
        [action.id]: (state[action.id] || 0) + 1,
      };

    case "REMOVE": {
      if (!state[action.id]) return state;
      const next = { ...state };
      if (next[action.id] === 1) delete next[action.id];
      else next[action.id] -= 1;
      return next;
    }

    case "RESET":
      return {};

    default:
      return state;
  }
}

export function useCart(products: { id: number; price: number }[]) {
  const [cart, dispatch] = useReducer(cartReducer, {});

  const items = useMemo(() => {
    return Object.entries(cart).map(([id, qty]) => {
      const product = products.find((p) => p.id === Number(id));
      return {
        id: Number(id),
        qty,
        price: product?.price || 0,
        total: (product?.price || 0) * qty,
      };
    });
  }, [cart, products]);

  const totalPrice = useMemo(() => {
    return items.reduce((sum, item) => sum + item.total, 0);
  }, [items]);

  return {
    cart,
    items,
    totalPrice,
    add: (id: number) => dispatch({ type: "ADD", id }),
    remove: (id: number) => dispatch({ type: "REMOVE", id }),
    reset: () => dispatch({ type: "RESET" }),
  };
}