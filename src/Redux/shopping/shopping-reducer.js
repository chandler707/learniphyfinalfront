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

    case actionType.EMPTY_CART:
      return {
        ...state,
        cart: [],
      };

    case actionType.REMOVE_FROM_CART:
      const itemData = state.cart.find((item) => {
        if (item._id === action.payload) {
          return item;
        }
      });

      state.cart.splice(state.cart.indexOf(itemData), 1);

      return {
        ...state,
        cart: state.cart,
      };
    case actionType.INC_CART_ITEM:
      const check = state.cart.find((item) =>
        item._id === action.payload._id ? { ...item, qty: item.qty + 1 } : false
      );
      if (check) {
        return { ...state, cart: [...state.cart, check] };
      }

    default:
      return { ...state };
  }
};

export default shopReducer;
