import React, { useContext, useState } from "react";
import CartContext from "../store/cart-context";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [err, setErr] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const [isCheckout, setIsCheckout] = useState(false);
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItems(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItems({ ...item, amount: 1 });
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const checkoutHandler = () => {
    setIsCheckout(true);
  };

  const confirmOrderHandler = async (inp) => {
    // console.log(cartCtx.items,'inside cart ccccccc',cartCtx.totalAmount)
    console.log(inp,'insided edge of cart.js')

    try {
      setIsSubmitting(true);
      setDidSubmit(false);
      setErr(null);
      const response = await fetch(
        "https://moviesapi-f5c45-default-rtdb.firebaseio.com/orders.json",
        {
          method: "POST",
          body: JSON.stringify({
            userDetails: inp,
            orderDetails: cartCtx.items,
            totalPrice: cartCtx.totalAmount.toFixed(2),
          }),
        }
      );

      if (!response.ok) {
        throw new Error("something went wrong, try later");
      }

      const data = await response.json();
      cartCtx.clearCart();
    } catch (error) {
      console.log(error.message);
      setIsSubmitting(false);
      setErr(error.message);
    }

    setIsSubmitting(false);
    setDidSubmit(true);

    // props.onHideCart();
  };

  const modalContentBeforeSubmitting = (
    <>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout ? (
        <Checkout onCancel={props.onHideCart} onConfirm={confirmOrderHandler} />
      ) : (
        <div className={classes.actions}>
          <button className={classes["button__alt"]} onClick={props.onHideCart}>
            Close
          </button>
          {hasItems && (
            <button className={classes.button} onClick={checkoutHandler}>
              Order
            </button>
          )}
        </div>
      )}
    </>
  );

  const modalContentDuringSubmitting = <p>sending your request...</p>;

  const modalContentAfterSubmitting = (
    <>
      <p className={classes.success}>your order is successfully placed</p>

      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onHideCart}>
         
          close
        </button>
      </div>
    </>
  );

  return (
    <Modal onClose={props.onHideCart}>
      {!isSubmitting && !err && !didSubmit && modalContentBeforeSubmitting}
      {!isSubmitting && err && <p class={classes.error}>{err}</p>}
      {isSubmitting && modalContentDuringSubmitting}
      {!isSubmitting && !err && didSubmit && modalContentAfterSubmitting}
    </Modal>
  );
};

export default Cart;
