import React, { useRef, useState } from "react";
import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";

const MealItemForm = (props) => {
  const [amountIsValid,setAmountIsValid]=useState(true)
  const amountInputRef=useRef()


  const submitHandler=(e)=>{
    e.preventDefault()
    const enteredAmount=amountInputRef.current.value;
    const enteredAmountNumber=+enteredAmount

    if(enteredAmount.trim().length===0 || enteredAmountNumber<1 || enteredAmount>5){
      setAmountIsValid(false)
      return
    }

    setAmountIsValid(true)
    props.onAddToCart(enteredAmountNumber)

  }
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="amount"
        input={{
          type: "number",
          id: `amount__${props.id}`,
          min: 1,
          max: 5,
          defaultValue: "1",
          step: "1",
        }}
      />
      <button>+ Add</button>
      {!amountIsValid && <p>Please enter a valid amount 1-5</p>}
    </form>
  );
};

export default MealItemForm;
