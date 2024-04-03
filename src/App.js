import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";
//import Alert from "./components/Alert";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Notes from "./components/Notes";

function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          {/* <Alert message="Alert" /> */}
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/yournotes" element={<Notes />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
