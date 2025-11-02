import CityWeather from "./pages/CityWeather";
import Home from "./Home";
import Navbar from "./Navbar";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="bg-zinc-800 min-h-screen text-white">
      <div className="m-10">
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route
            path="/"
            element={
              <>
                <Navbar />
                <Home />
              </>
            }
          />

          <Route
            path="/weather/:cityId"
            element={
              <ProtectedRoute>
                <CityWeather />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
