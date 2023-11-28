import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  //   MY_ORDERS_REQUEST,
  //   MY_ORDERS_SUCCESS,
  //   MY_ORDERS_FAIL,
  //   ALL_ORDERS_REQUEST,
  //   ALL_ORDERS_SUCCESS,
  //   ALL_ORDERS_FAIL,
  //   UPDATE_ORDER_REQUEST,
  //   UPDATE_ORDER_SUCCESS,
  //   UPDATE_ORDER_FAIL,
  //   UPDATE_ORDER_RESET,
  //   DELETE_ORDER_REQUEST,
  //   DELETE_ORDER_SUCCESS,
  //   DELETE_ORDER_FAIL,
  //   DELETE_ORDER_RESET,
  //   ORDER_DETAILS_REQUEST,
  //   ORDER_DETAILS_SUCCESS,
  //   ORDER_DETAILS_FAIL,
  CLEAR_ERRORS,
} from "../constants/orderConstants";

export const newOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CREATE_ORDER_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      };

    case CREATE_ORDER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
