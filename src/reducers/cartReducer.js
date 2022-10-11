export const cartInitialState = {
  cart: []
}

export const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return {...state, cart: addToCart(action.payload,state.cart)};

    default:
      return state;
  }

}

const addToCart = (product, cart) => {
  const productToAdd = {
    id: product.id,
    title: product.title,
    image: product.image,
    price: product.price,
    quantity: 1,
  }
  const index = cart.findIndex(prod => prod.id === product.id);
  if (index > -1) {
    let newCart = [...cart];
    newCart[index].quantity++;
    return newCart
  } else {
    return [...cart, productToAdd];
  }
}