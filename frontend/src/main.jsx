import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "bootstrap/dist/css/bootstrap.css";

import Home from "./components/Home.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import App from "./App.jsx";
import store, { persistor } from "./redux/store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <BrowserRouter>
                    <Routes>
                        <Route path={"/"} element={<App />}>
                            <Route index element={<Home />}></Route>
                            <Route path="/login" element={<Login />}></Route>
                            <Route
                                path="/register"
                                element={<Register />}
                            ></Route>
                        </Route>
                    </Routes>
                </BrowserRouter>
            </PersistGate>
        </Provider>
    </React.StrictMode>
);

// import React from "react";
// import ReactDOM from "react-dom/client";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { Provider } from "react-redux";
// import "bootstrap/dist/css/bootstrap.css";

// import Home from "./components/Home.jsx";
// import Login from "./components/Login.jsx";
// import Register from "./components/Register.jsx";
// import App from "./App.jsx";
// import store from "./redux/store.js";

// ReactDOM.createRoot(document.getElementById("root")).render(
//     <React.StrictMode>
//         <Provider store={store}>
//                 <BrowserRouter>
//                     <Routes>
//                         <Route path={"/"} element={<App />}>
//                             <Route index element={<Home />}></Route>
//                             <Route path="/login" element={<Login />}></Route>
//                             <Route
//                                 path="/register"
//                                 element={<Register />}
//                             ></Route>
//                         </Route>
//                     </Routes>
//                 </BrowserRouter>
//         </Provider>
//     </React.StrictMode>
// );
