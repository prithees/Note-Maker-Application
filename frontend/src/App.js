import react from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import ListNotes from "./components/home";
import AddNotes from "./components/AddNotes";
//import UpdateNotes from "./components/UpdateNotes";
import Navigation from "./components/Navigation";

function App() {
  return (
    <div>
      <Navigation />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ListNotes />} />
          <Route path="/add" element={<AddNotes />} />
          {/* <Route path="/update" element={<UpdateNotes />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
