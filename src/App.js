import { useState } from "react";
import "./App.css";

import { Route, Routes } from "react-router-dom";

import Navbar from "./Navbar";
import Landing from "./pages/Landing";
import About from "./pages/About";
import Events from "./pages/Events";

import Footer from "./Footer";
import Gallery from "./pages/Gallery";
import NotFound from "./NotFound";

function App() {
    const [landing, setLanding] = useState(true);

    const [login, setLogin] = useState(false);

    return (
        <div className="App">
            <Navbar landing={landing} login={login} setLogin={setLogin} />

            <Routes>
                <Route
                    path="/Gallery"
                    element={<Gallery setLanding={setLanding} login={login} />}
                />

                <Route
                    path="/About"
                    element={<About setLanding={setLanding} login={login} />}
                />

                <Route
                    path="/Events"
                    element={<Events setLanding={setLanding} />}
                />

                <Route path="/" element={<Landing setLanding={setLanding} />} />
                <Route
                    path={"*"}
                    element={<NotFound setLanding={setLanding} />}
                />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
