import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";
import { useEffect, useState, useMemo } from "react";

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
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();
  const [sortType, setSortType] = useState("default");

  const sortedMeals = useMemo(() => {
    let result = meals;
    // console.log(result);
    // console.log(sortType.toString());
    if (sortType === "price") {
      result = meals.sort((p1, p2) =>
        p2.price < p1.price ? 1 : p2.price > p1.price ? -1 : 0
      );
    } else if (sortType === "rating") {
      result = meals.sort((p1, p2) =>
        p1.rating < p2.rating ? 1 : p1.rating > p2.rating ? -1 : 0
      );
    }
    // console.log(result);
    return result;
  }, [meals, sortType]);

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://react-food-app-a6e49-default-rtdb.firebaseio.com/meals.json"
      );
      const response1 = await fetch(
        "https://run.mocky.io/v3/ec196a02-aaf4-4c91-8f54-21e72f241b68"
      );

      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      if (!response1.ok) {
        throw new Error("Something went wrong");
      }

      // const responseData = await response.json();
      const responseData1 = await response1.json();

      // console.log(responseData1);

      const loadedMeals = [];
      for (const key in responseData1) {
        loadedMeals.push({
          id: key,
          name: responseData1[key].name,
          description: responseData1[key].description,
          price: responseData1[key].price,
          img_url: responseData1[key].img_url,
          rating: responseData1[key].rating,
          isVeg: responseData1[key].isVeg,
        });
      }
      setMeals(loadedMeals);

      setIsLoading(false);
      // console.log(meals);
      // sortedMeals(loadedMeals);
    };

    fetchMeals().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if (isLoading) {
    return (
      <section className={classes.MealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={classes.MealsError}>
        <p>{httpError}</p>
      </section>
    );
  }

  // function sortData(meals) {
  //   let sortedMeals;
  //   console.log(meals);
  //   if (sortType === "price") {
  //     sortedMeals = meals.sort((p1, p2) =>
  //       p1.price < p2.price ? 1 : p2.price > p1.price ? -1 : 0
  //     );
  //   } else if (sortType === "rating") {
  //     sortedMeals = meals.sort((p1, p2) =>
  //       p1.price < p2.price ? 1 : p1.price > p2.price ? -1 : 0
  //     );
  //   } else {
  //     sortedMeals = meals;
  //   }
  //   console.log(sortedMeals);
  //   setMeals(sortedMeals);
  // }

  const mealsList = sortedMeals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
      img_url={meal.img_url}
      rating={meal.rating}
      isVeg={meal.isVeg}
    />
  ));

  // const sortOnRating = (e) => {
  //   e.preventDefault();
  //   mealsList.sort((a, b) => a.rating - b.rating);
  // };

  // const sortOnPrice = function () {
  //   // e.preventDefault();
  //   // if (sortOn)
  //   console.log(meals);
  //   let sortedMeals = meals.sort((p1, p2) =>
  //     p1.price < p2.price ? 1 : p1.price > p2.price ? -1 : 0
  //   );
  //   // console.log(meals.price);
  //   setMeals(sortedMeals);
  //   console.log(sortedMeals);
  // };

  return (
    <>
      <section>
        <div className={classes.buttons}>
          {/* <div className={classes.btn} onClick={sortOnPrice}>
            Sort by price
          </div> */}
          {/* <div className={classes.btn} onClick={sortOnRating}>
            Sort by rating
          </div> */}
          <div className={classes.wrapper_select}>
            <select
              defaultValue="default"
              onChange={(e) => setSortType(e.target.value)}
              className={classes.select}
            >
              <option disabled value="default">
                Sort by
              </option>
              <option value="rating">Rating</option>
              <option value="price">Price</option>
            </select>
          </div>
        </div>
      </section>
      <section className={classes.meals}>
        <Card>
          <ul>{mealsList}</ul>
        </Card>
      </section>
    </>
  );
};

export default AvailableMeals;
