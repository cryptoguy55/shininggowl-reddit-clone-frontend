import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { loadCart, removeProduct, changeProductQuantity, updateCart, formatPrice } from '../../actions/cart';
import CartProduct from './CartProduct';
import {  PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import './style.scss';
import { SUCCESS } from '../../constants/actionTypes';
class FloatCart extends Component {
  static propTypes = {
    // loadCart: PropTypes.func.isRequired,
    updateCart: PropTypes.func.isRequired,
    cartProducts: PropTypes.array.isRequired,
    newProduct: PropTypes.object,
    removeProduct: PropTypes.func,
    productToRemove: PropTypes.object,
    changeProductQuantity: PropTypes.func,
    productToChange: PropTypes.object,
  };

  state = {
    isOpen: false
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.newProduct !== this.props.newProduct) {
      this.addProduct(nextProps.newProduct);
    }

    if (nextProps.productToRemove !== this.props.productToRemove) {
      this.removeProduct(nextProps.productToRemove);
    }

    if (nextProps.productToChange !== this.props.productToChange) {
      this.changeProductQuantity(nextProps.productToChange);
    }
  }

  openFloatCart = () => {
    this.setState({ isOpen: true });
  };

  closeFloatCart = () => {
    this.setState({ isOpen: false });
  };

  addProduct = product => {
    const { cartProducts, updateCart } = this.props;
    let productAlreadyInCart = false;

    cartProducts.forEach(cp => {
      if (cp.id === product.id) {
        cp.quantity += product.quantity;
        productAlreadyInCart = true;
      }
    });

    if (!productAlreadyInCart) {
      cartProducts.push(product);
    }

    updateCart(cartProducts);
    this.openFloatCart();
  };

  removeProduct = product => {
    const { cartProducts, updateCart } = this.props;

    const index = cartProducts.findIndex(p => p.id === product.id);
    if (index >= 0) {
      cartProducts.splice(index, 1);
      updateCart(cartProducts);
    }
  };

  proceedToCheckout = () => {
    const {
      totalPrice,
      productQuantity,
      currencyFormat,
      currencyId
    } = this.props.cartTotal;

    if (!productQuantity) {
      alert('Add some product in the cart!');
    } else {
      alert(
        `Checkout - Subtotal: ${currencyFormat} ${formatPrice(
          totalPrice,
          currencyId
        )}`
      );
    }
  };

  changeProductQuantity = changedProduct => {
    const { cartProducts, updateCart } = this.props;

    const product = cartProducts.find(p => p.id === changedProduct.id);
    product.quantity = changedProduct.quantity;
    if (product.quantity <= 0) {
      this.removeProduct(product);
    }
    updateCart(cartProducts);
  }

  render() {
    const { cartTotal, cartProducts, removeProduct, changeProductQuantity, erase_all, success } = this.props;

    const products = cartProducts.map(p => {
      return (
        <CartProduct product={p} removeProduct={removeProduct} changeProductQuantity={changeProductQuantity} key={p.id} />
      );
    });

    let classes = ['float-cart'];

    if (!!this.state.isOpen) {
      classes.push('float-cart--open');
    }

    return (
      <div className={classes.join(' ')}>
        {/* If cart open, show close (x) button */}
        {this.state.isOpen && (
          <div
            onClick={() => this.closeFloatCart()}
            className="float-cart__close-btn"
          >
            X
          </div>
        )}

        {/* If cart is closed, show bag with quantity of product and open cart action */}
        {!this.state.isOpen && (
          <span
            onClick={() => this.openFloatCart()}
            className="bag bag--float-cart-closed"
          >
            <span className="bag__quantity">{cartTotal.productQuantity}</span>
          </span>
        )}

        <div className="float-cart__content">
          <div className="float-cart__header">
            <span className="bag">
              <span className="bag__quantity">{cartTotal.productQuantity}</span>
            </span>
            <span className="header-title">Cart</span>
          </div>

          <div className="float-cart__shelf-container">
            {products}
            {!products.length && (
              <p className="shelf-empty">
                Add some products in the cart <br />
                :)
              </p>
            )}
          </div>

          <div className="float-cart__footer">
            <div className="sub">SUBTOTAL</div>
            <div className="sub-price">
              <p className="sub-price__val">
                {`${cartTotal.currencyFormat} ${formatPrice(
                  cartTotal.totalPrice,
                  cartTotal.currencyId
                )}`}
              </p>
              <small className="sub-price__installment">
                {!!cartTotal.installments && (
                  <span>
                    {`OR UP TO ${cartTotal.installments} x ${
                      cartTotal.currencyFormat
                    } ${formatPrice(
                      cartTotal.totalPrice / cartTotal.installments,
                      cartTotal.currencyId
                    )}`}
                  </span>
                )}
              </small>
            </div>
            <PayPalScriptProvider options={{ "client-id": "Ab7JnnlcHrVjAWnXnf6URiMFDNidp4LL0Om_fJTgCBfzI8286JNKP65gf2sD1CKA3DpVzh28CDFYqAhp" ,
             currency: "USD",
             intent: "capture"
          }}>
            <PayPalButtons  
            createOrder = {(data, actions) => {
              return actions.order.create({
              purchase_units: [
              {
               amount: {
              value: Number.parseFloat(this.props.cartTotal.totalPrice).toFixed(2)
              }, 
              },
              ],});}}
              onApprove = {(data, actions)=> {
                // This function captures the funds from the transaction.
                return actions.order.capture().then(function(details) {
                  // This function shows a transaction success message to your buyer.
                 erase_all();
                 success();
                });
              }} />
        </PayPalScriptProvider>
            <div onClick={() => this.proceedToCheckout()} className="buy-btn">
              Checkout
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  cartProducts: state.cart.products,
  newProduct: state.cart.productToAdd,
  productToRemove: state.cart.productToRemove,
  productToChange: state.cart.productToChange,
  cartTotal: state.cart.data
});
const mapDispatchToProps = dispatch => ({
  updateCart: cartProducts => dispatch(updateCart(cartProducts)),
  removeProduct: cartProducts => dispatch(removeProduct(cartProducts)),
  changeProductQuantity: cartProducts => dispatch(changeProductQuantity(cartProducts)),
  erase_all: () => dispatch({type: "Erase_all", payload: ""}),
  success: () => dispatch({type: SUCCESS, payload: {message: `checkout is done successfully!`}})
});
export default connect(mapStateToProps, mapDispatchToProps)(FloatCart);
