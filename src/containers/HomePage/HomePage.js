import React from "react";
import "./HomePage.css";
import { useSelector } from "react-redux";

function HomePage() {
  const store = useSelector((state) => state);
  console.log('store', store)
  return (
    <div>
      Home Page
    </div>
  );
}

export default HomePage;
