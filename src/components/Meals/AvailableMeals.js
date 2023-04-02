import React, { useEffect, useState } from "react";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";

// const DUMMY_MEALS = [
//   {
//     id: "m1",
//     name: "Sushi",
//     description: "Finest fish and veggies",
//     price: 22.99,
//   },
//   {
//     id: "m2",
//     name: "Schnitzel",
//     description: "A german specialty!",
//     price: 16.5,
//   },
//   {
//     id: "m3",
//     name: "Barbecue Burger",
//     description: "American, raw, meaty",
//     price: 12.99,
//   },
//   {
//     id: "m4",
//     name: "Green Bowl",
//     description: "Healthy...and green...",
//     price: 18.99,
//   },
// ];

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMeals = async () => {
      setError(null);
      setIsLoading(true);

      try {
        const response = await fetch(
          "https://moviesapi-f5c45-default-rtdb.firebaseio.com/meals.json"
        );

        if(!response.ok){
          
          throw new Error(`something went wrong, ${response.statusText}`)
        }
        const data = await response.json();

        const loadedMealsList = [];

        for (const key in data) {
          loadedMealsList.push({
            id: key,
            name: data[key].name,
            description: data[key].description,
            price: data[key].price,
          });
        }

        setMeals(loadedMealsList);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error.message);
        setError(error.message);
      }
    };

    fetchMeals()
  }, []);

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
  return (
    <section className={classes.meals}>
      {!isLoading && error && <p className={classes.error}>{error}</p>}
      {isLoading && <p className={classes.loading}>loading ...</p>}
      {!isLoading && !error && meals.length===0 && <p>Data not found</p>}
      {!isLoading && !error && (
        <Card>
          <ul>{mealsList}</ul>
        </Card>
      )}
    </section>
  );
};

export default AvailableMeals;
