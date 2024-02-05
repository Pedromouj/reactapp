import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AppProvider } from "./Components/context/appProvider.jsx";
import OverlaySpinner from "./Components/Spinner/OverlaySpinner.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppProvider>
        <Suspense fallback={<OverlaySpinner />}>
          <App />
        </Suspense>
      </AppProvider>
    </BrowserRouter>
  </React.StrictMode>
);
