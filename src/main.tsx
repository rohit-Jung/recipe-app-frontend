import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import {  RouterProvider } from "react-router-dom";
import ReactQueryClientProvider from "./providers/ReactQueryClientProvider.tsx";
import { Toaster } from "react-hot-toast";
import { router } from "./routes/index.tsx";
import { Provider } from "react-redux";
import store from "./redux/store.ts";


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ReactQueryClientProvider>
        <Toaster position="top-right" reverseOrder={false} />
        <RouterProvider router={router} />
      </ReactQueryClientProvider>
    </Provider>
  </React.StrictMode>
);
