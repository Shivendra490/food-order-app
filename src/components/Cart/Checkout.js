import { useState } from 'react';
import classes from './Checkout.module.css';

const Checkout = (props) => {

  const [inputData,setInputData]=useState({name:'',street:'',postalCode:'',city:''})
  const [error,setError]=useState({isNameInvalid:false,isStreetInvalid:false,isPostalCodeInvalid:false,isCityInvalid:false})

  const isValid=(inp)=>{
   let check={isNameInvalid:false,isStreetInvalid:false,isPostalCodeInvalid:false,isCityInvalid:false}
   console.log('hello')
   if(inp.name.trim().length<1){
    
    check={...check,isNameInvalid:true}
   }
   if(inp.street.trim().length<3){
    check={...check,isStreetInvalid:true}
   }
   if(inp.postalCode.trim().length!==6){
    check={...check,isPostalCodeInvalid:true}
   }
   if(inp.city.trim().length<3){
    check={...check,isCityInvalid:true}
   }
   console.log(check,'25')
   return check

  }
  

  const inputChangeHandler=(e)=>{
    const name=e.target.name
    const value=e.target.value

    setInputData({...inputData,[name]:value})
  }
  console.log(inputData)

  const confirmHandler = (event) => {
    event.preventDefault();
    console.log('nhhhhhhh')
    const check=isValid(inputData)

    if(check.isNameInvalid || check.isCityInvalid || check.isPostalCodeInvalid || check.isStreetInvalid){
      setError(check)
      return
    }
    
    

    console.log('form submitted',inputData)//we will do form submitted
    props.onConfirm(inputData)
    setInputData({name:'',street:'',postalCode:'',city:''})
    
    
  };

  console.log(error)

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={classes.control}>
        
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' name='name' onChange={inputChangeHandler} value={inputData.name}/>
        {error.isNameInvalid && <p className={classes.invalidField}>Please enter valid name</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' name='street' onChange={inputChangeHandler} value={inputData.street}/>
        {error.isStreetInvalid && <p className={classes.invalidField}>Please enter valid street</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='number' id='postal' name='postalCode' onChange={inputChangeHandler} value={inputData.postalCode}/>
        {error.isPostalCodeInvalid && <p className={classes.invalidField}>Please enter valid 6 digit postal code</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' name='city' onChange={inputChangeHandler} value={inputData.city}/>
        {error.isCityInvalid && <p className={classes.invalidField}>Please enter valid city</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit} onClick={confirmHandler}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;