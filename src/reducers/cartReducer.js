export const cartInitialState = {
  cart: []
}

export const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return { ...state, cart: addToCart(action.payload, state.cart, action.qty) };

    case 'REMOVE_FROM_CART':
      return { ...state, cart: removeFromCart(action.payload, state.cart) };

    case 'EMPTY_CART':
      return cartInitialState;

    case 'REMOVE_ALL':
      return { ...state, cart: removeAll(action.payload, state.cart) }

    default:
      return state;
  }

}

const addToCart = (product, cart, qty) => {
  if (product.stock < 1) {
    return cart
  }
  const stock = product.stock;
  const productToAdd = {
    fid: product.fid,
    id: product.id,
    title: product.title,
    image: product.image,
    price: product.price,
    stock: product.stock,
    quantity: qty ? qty : 1,
  }

  const index = cart.findIndex(prod => prod.id === product.id);
  if (index > -1 && cart[index].quantity < stock) {
    let newCart = [...cart];
    newCart[index].quantity++;
    return newCart
  } else if (index < 0) {
    return [...cart, productToAdd];
  } else return cart
}

const removeFromCart = (product, cart) => {
  const index = cart.findIndex(prod => prod.id === product.id);
  let newCart = [...cart];
  if (index < 0) {
    return cart
  }
  if (cart[index].quantity > 1) {
    newCart[index].quantity--;
    return newCart
  } else {
    newCart.splice(index, 1)
    return newCart
  }

}

const removeAll = (product, cart)=>{
  const newCart = cart.filter(prod => prod.fid !== product.fid)
  return newCart;
}