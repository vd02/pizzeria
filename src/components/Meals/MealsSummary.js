import classes from "./MealsSummary.module.css";

const MealsSummary = () => {
  return (
    <section className={classes.summary}>
      <h2>Delicious Pizza, Delivered To You</h2>
      <p>
        Choose your favorite pizza from our broad selection of available pizza
        and enjoy a delicious lunch or dinner at home.
      </p>
      <p>
        All our pizzas are cooked with high-quality ingredients, just-in-time
        and of course by experienced chefs!
      </p>
    </section>
  );
};

export default MealsSummary;
