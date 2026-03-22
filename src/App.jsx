import { useReducer } from "react";
import { Fragment } from "react";
import "./App.css";
import chef from "./images/chefLucia.png";

// ⭐ Step 1: Initial State
const initialState = {
  isOpen: true,
  reservationCount: 0,
  currentCapacity: 50,
  specialOfTheDay: "Lomo Saltado",
};

// ⭐ Step 2: Reducer Function
function restaurantReducer(state, action) {
  switch (action.type) {
    case "TOGGLE_RESTAURANT":
      return {
        ...state,
        isOpen: !state.isOpen,
        currentCapacity: state.isOpen ? 0 : 50,
      };

    case "ADD_RESERVATION":
      return {
        ...state,
        reservationCount: state.reservationCount + 1,
      };

    case "CHANGE_SPECIAL":
      return {
        ...state,
        specialOfTheDay: action.payload,
      };

    default:
      return state;
  }
}

function Header({ name, year }) {
  return (
    <header>
      <h1>{name}'s Kitchen!</h1>
      <p>Copyright {year}</p>
    </header>
  );
}

const items = [
  "Lomo Saltado",
  "Arroz con Pollo",
  "Ceviche",
  "Aji de Gallina",
  "Papa a la Huancaina",
];

const dishObjects = items.map((dish, i) => ({
  id: i,
  title: dish,
}));

function Main({ dishes, restaurantState, dispatch }) {
  return (
    <Fragment>
      <div>
        <button onClick={() => dispatch({ type: "TOGGLE_RESTAURANT" })}>
          Toggle Restaurant
        </button>

        <button onClick={() => dispatch({ type: "ADD_RESERVATION" })}>
          Add Reservation
        </button>

        <h2>
          Welcome to this beautiful restaurant!
          {restaurantState.isOpen ? " We are open! 🎉" : " We are closed. 😴"}
        </h2>

        <p>
          <strong>Today's Special:</strong> {restaurantState.specialOfTheDay}
        </p>
        <p>
          <strong>Reservations:</strong> {restaurantState.reservationCount}
        </p>
        <p>
          <strong>Current Capacity:</strong> {restaurantState.currentCapacity}
        </p>
      </div>

      <main>
        <img src={chef} alt="Chef Lucia" style={{ width: "500px" }} />

        {restaurantState.isOpen && (
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {dishes.map((dish) => (
              <li key={dish.id}>{dish.title}</li>
            ))}
          </ul>
        )}
      </main>
    </Fragment>
  );
}

function App() {
  // ⭐ Step 3: Use useReducer
  const [state, dispatch] = useReducer(restaurantReducer, initialState);

  return (
    <div>
      <h1>
        The restaurant is currently {state.isOpen ? "Open ✅" : "Closed ❌"}
      </h1>

      <button onClick={() => dispatch({ type: "TOGGLE_RESTAURANT" })}>
        {state.isOpen ? "Close" : "Open"} Restaurant
      </button>

      <button onClick={() => dispatch({ type: "ADD_RESERVATION" })}>
        Add Reservation ({state.reservationCount})
      </button>

      <button
        onClick={() =>
          dispatch({
            type: "CHANGE_SPECIAL",
            payload: items[Math.floor(Math.random() * items.length)],
          })
        }
      >
        Change Special
      </button>

      <Header name="Lucia" year={new Date().getFullYear()} />
      <Main dishes={dishObjects} restaurantState={state} dispatch={dispatch} />
    </div>
  );
}

export default App;
