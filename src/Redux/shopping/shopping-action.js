import * as actionType from "./shopping-type";

export const addToCart = (item) => {
  console.log("hhh", item);
  return {
    type: actionType.ADD_TO_CART,
    payload: item,
  };
};
export const emptyCart = (itemId) => {
  console.log("hhh", itemId);
  return {
    type: actionType.EMPTY_CART,
    payload: itemId,
  };
};
export const removeFromCart = (info) => {
  console.log("thisnis adction", info);

  return {
    type: actionType.REMOVE_FROM_CART,
    payload: info,
  };
};
export const incrementCartItem = (item) => {
  return {
    type: actionType.INC_CART_ITEM,
    payload: item,
  };
};
export const decrementCartItem = (item) => {
  return {
    type: actionType.DEC_CART_ITEM,
    payload: item,
  };
};
