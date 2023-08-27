import { useState } from "react";
import "./App.css";

import { Route, Routes } from "react-router-dom";

import Navbar from "./Navbar";
import Landing from "./pages/Landing";
import About from "./pages/About";
import Events from "./pages/Events";

import MobilePage from "./pages/MobilePage";

import Footer from "./Footer";
import Gallery from "./pages/Gallery";

function App() {
    const [landing, setLanding] = useState(true);

    const [login, setLogin] = useState(false);

    return (
        <div className="App">
            <Navbar landing={landing} login={login} setLogin={setLogin} />

            <Routes>
                <Route
                    path="/pages/Gallery"
                    element={<Gallery setLanding={setLanding} login={login} />}
                />

                <Route
                    path="/pages/About"
                    element={<About setLanding={setLanding} login={login} />}
                />

                <Route
                    path="/pages/Events"
                    element={<Events setLanding={setLanding} />}
                />

                <Route path="/" element={<Landing setLanding={setLanding} />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
