import { LOAD_CART, ADD_PRODUCT, REMOVE_PRODUCT, CHANGE_PRODUCT_QUANTITY, UPDATE_CART} from '../constants/actionTypes';
const initialState = {
  products: [],
  data: {
    productQuantity: 0,
    installments: 0,
    totalPrice: 0,
    currencyId: 'USD',
    currencyFormat: '$'
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOAD_CART:
      return {
        ...state,
        products: action.payload
      };
    case ADD_PRODUCT:
      return {
        ...state,
        productToAdd: Object.assign({}, action.payload)
      };
    case REMOVE_PRODUCT:
      return {
        ...state,
        productToRemove: Object.assign({}, action.payload)
      };
    case CHANGE_PRODUCT_QUANTITY:
      return {
        ...state,
        productToChange: Object.assign({}, action.payload)
      };
    case UPDATE_CART:
      return {
        ...state,
        data: action.payload
      };
    case "Erase_all":
      return {
        ...state,
        products: [],
        data: {
          productQuantity: 0,
          installments: 0,
          totalPrice: 0,
          currencyId: 'USD',
          currencyFormat: '$'
        }
      };
    default:
      return state;
  }
}
