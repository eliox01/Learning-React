import { useState } from "react";
import { Fragment } from "react";
import "./App.css";
import chef from "./images/chefLucia.png";

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

// ⭐ Main component receives state AND function to update it
function Main({ dishes, isOpen, setIsOpen }) {
  return (
    <Fragment>
      <div>
        {/* Button toggles the state */}
        <button onClick={() => setIsOpen(!isOpen)}>Toggle Restaurant</button>

        <h2>
          Welcome to this beautiful restaurant!
          {isOpen ? " We are open! 🎉" : " We are closed. 😴"}
        </h2>
      </div>

      <main>
        <img src={chef} alt="Chef Lucia" style={{ width: "500px" }} />
        {/* ⭐ Short-circuit evaluation goes HERE */}
        {isOpen && (
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
  // ⭐ State lives here (parent component)
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div>
      <h1>The restaurant is currently {isOpen ? "Open ✅" : "Closed ❌"}</h1>

      <button onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "Close" : "Open"} Restaurant
      </button>

      <Header name="Lucia" year={new Date().getFullYear()} />

      {/* ⭐ Pass BOTH the state value AND the setter function */}
      <Main
        dishes={dishObjects}
        isOpen={isOpen} // The current value
        setIsOpen={setIsOpen} // The function to change it
      />
    </div>
  );
}

export default App;
