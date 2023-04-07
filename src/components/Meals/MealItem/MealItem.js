import { useContext } from "react";

import MealItemForm from "./MealItemForm";
import classes from "./MealItem.module.css";
import CartContext from "../../../store/cart-context";

const MealItem = (props) => {
  const cartCtx = useContext(CartContext);
  // console.log(props.img_url);
  // console.log(props);

  const price = props.price;

  const addToCartHandler = (amount, size) => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      size: size,
      price: props.price,
    });
  };

  return (
    <>
      <li className={classes.meal}>
        <div className={classes.meal_image}>
          <img src={props.img_url} alt="pizza" />
        </div>
        <div className={classes.ctr}>
          <div className={classes.ctr1}>
            <div className={classes.ctr1_5}>
              <h3>{props.name}</h3>

              <div className={classes.description}>{props.description}</div>
            </div>
            <div className={classes.ctr1_5}>
              <div className={classes.price}>Price: ${price}</div>
              <div className={classes.rating}>Rating: {props.rating}</div>
              <div
                className={
                  props.isVeg === true ? `${classes.green}` : `${classes.red}`
                }
              >
                {props.isVeg === true ? "Veg" : "Non-veg"}
              </div>
            </div>
          </div>
          <div className={classes.ctr2}>
            <MealItemForm onAddToCart={addToCartHandler} />
          </div>
        </div>
      </li>
    </>
  );
};

export default MealItem;
