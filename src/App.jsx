import { useState, useEffect, Fragment } from "react";
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

function Main({ dishes, isOpen }) {
  return (
    <Fragment>
      <div>
        <h2>
          Welcome to this beautiful restaurant!
          {isOpen ? " We are open! 🎉" : " We are closed. 😴"}
        </h2>
      </div>

      <main>
        <img src={chef} alt="Chef Lucia" style={{ width: "500px" }} />

        {isOpen && (
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {dishes.map((dish) => (
              <li key={dish.id}>{dish.title}</li>
            ))}
          </ul>
        )}

        {!isOpen && (
          <p style={{ fontStyle: "italic", color: "#666" }}>
            Sorry, we're closed. Come back Tuesday-Sunday, 12 PM - 7 PM!
          </p>
        )}
      </main>
    </Fragment>
  );
}

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // ⭐ Check business hours every second
  useEffect(() => {
    const checkBusinessHours = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);

      const currentDay = now.getDay(); // 0-6 (Sunday-Saturday)
      const currentHour = now.getHours(); // 0-23
      const currentMinute = now.getMinutes();

      // ⭐ Debug logging
      console.log(
        `Day: ${currentDay} (${getDayName(currentDay)}), Hour: ${currentHour}:${currentMinute}`,
      );

      // Business logic:
      // - Closed: Monday (1)
      // - Open: Tuesday (2) - Sunday (0)
      // - Hours: 12 PM - 7 PM

      const isMonday = currentDay === 1;
      const isWithinHours = currentHour >= 12 && currentHour < 19;

      console.log(
        `Is Monday? ${isMonday}, Within hours (12-7)? ${isWithinHours}`,
      );

      if (isMonday) {
        console.log("❌ CLOSED - It's Monday");
        setIsOpen(false);
      } else if (isWithinHours) {
        console.log("✅ OPEN - It's a valid day and within business hours");
        setIsOpen(true);
      } else {
        console.log("❌ CLOSED - Outside business hours");
        setIsOpen(false);
      }
    }, 1000);

    return () => {
      clearInterval(checkBusinessHours);
    };
  }, []);

  // ⭐ Update document title when status changes
  useEffect(() => {
    document.title = isOpen
      ? "🟢 Lucia's Kitchen - OPEN NOW"
      : "🔴 Lucia's Kitchen - CLOSED";
  }, [isOpen]);

  // Helper function to get day name
  const getDayName = (dayNumber) => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return days[dayNumber];
  };

  // Helper to show next opening time
  const getNextOpeningTime = () => {
    const now = new Date();
    const currentDay = now.getDay();
    const currentHour = now.getHours();

    if (currentDay === 1) {
      // If Monday, opens Tuesday at 12 PM
      return "Tuesday at 12:00 PM";
    } else if (currentHour < 12) {
      // Same day but before 12 PM
      return "Today at 12:00 PM";
    } else if (currentHour >= 19) {
      // After 7 PM
      if (currentDay === 0) {
        // If Sunday night, opens Tuesday (skip Monday)
        return "Tuesday at 12:00 PM";
      } else {
        // Any other day, opens tomorrow
        return "Tomorrow at 12:00 PM";
      }
    }
    return "Now!";
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>The restaurant is currently {isOpen ? "Open ✅" : "Closed ❌"}</h1>

      <div
        style={{
          marginBottom: "20px",
          padding: "15px",
          backgroundColor: isOpen ? "#e8f5e9" : "#ffebee",
          borderRadius: "8px",
          border: isOpen ? "2px solid #4caf50" : "2px solid #f44336",
        }}
      >
        <p>
          <strong>📅 Current Day:</strong> {getDayName(currentTime.getDay())}
        </p>
        <p>
          <strong>🕐 Current Time:</strong> {currentTime.toLocaleTimeString()}
        </p>
        <p>
          <strong>⏰ Business Hours:</strong> Tuesday - Sunday, 12:00 PM - 7:00
          PM
        </p>
        <p>
          <strong>🚫 Closed:</strong> Mondays & outside business hours
        </p>
        {!isOpen && (
          <p style={{ color: "#f44336", fontWeight: "bold" }}>
            <strong>Next Opening:</strong> {getNextOpeningTime()}
          </p>
        )}
      </div>

      <Header name="Lucia" year={new Date().getFullYear()} />
      <Main dishes={dishObjects} isOpen={isOpen} />
    </div>
  );
}

export default App;
