"use client";

import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { store } from "./../../store/store";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

export default function StoreProvider({ children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Provider store={store}>
      <Header />
      {children}
      <Footer />
    </Provider>
  );
}
