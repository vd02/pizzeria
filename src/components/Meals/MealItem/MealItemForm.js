import { useRef, useState } from "react";

import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";

const MealItemForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const amountInputRef = useRef();
  // const sizeInputRef = useRef();
  // const toppingInputRef = useRef();

  console.log(props);

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setAmountIsValid(false);
      return;
    }

    props.onAddToCart(enteredAmountNumber);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: "amount",
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      {/* <select
              defaultValue="default"
              // onChange={(e) => setSortType(e.target.value)}
              className={classes.select}
            >
              <option disabled value="default">
                Filter
              </option>
              <option value="rating">Sort on Rating</option>
              <option value="price">Sort on Price</option>
              <option value="veg">Show Veg Pizzas</option>
              <option value="nonveg">Show Non-Veg Pizzas</option>
            </select>
            <select
              defaultValue="default"
              onChange={(e) => setSortType(e.target.value)}
              className={classes.select}
            >
              <option disabled value="default">
                Filter
              </option>
              <option value="rating">Sort on Rating</option>
              <option value="price">Sort on Price</option>
              <option value="veg">Show Veg Pizzas</option>
              <option value="nonveg">Show Non-Veg Pizzas</option>
            </select> */}

      <button>+ Add</button>
      {!amountIsValid && <p>Please enter a valid amount (1-5).</p>}
    </form>
  );
};

export default MealItemForm;
