import React from "react";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import SingleMovie from "./pages/SingleMovie/SingleMovie";
import NotFound from "./pages/NotFound/NotFound";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:movieId" element={<SingleMovie />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
