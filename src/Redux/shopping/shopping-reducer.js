import * as actionType from "./shopping-type";
const INITIAL_STATE = {
  cart: [],
};
const shopReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionType.ADD_TO_CART:
      console.log(state.cart);
      const inCart = state.cart.find((item) =>
        item._id === action.payload._id ? true : false
      );

      return {
        ...state,
        cart: inCart
          ? state.cart.map((item) => {
            return item._id === action.payload._id
              ? { ...item, qty: item.qty + 1 }
              : {
                ...item,
              };
          })
          : [...state.cart, { ...action.payload, qty: 1 }],
      };

    case "REMOVE_CART":
      console.log("yao")
      return state.filter(({ id }) => id._id !== action.payload._id);
    default:
      return { ...state };
  }
};

export default shopReducer;
