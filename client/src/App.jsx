import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import { useState } from "react";
import CategoryPages from "./pages/CategoryPages.jsx";
import ProductPage from "./pages/ProductPages.jsx"; 

function App() {

  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">React CRUD REACT</Link>
          <div className="navbar-nav">
            <Link className="nav-link" to="/categories">Categories</Link>
            <Link className="nav-link" to="/products">Products</Link>
          </div>
        </div>
      </nav>

      <Routes>
        <Route 
          path="/" 
          element={
            <div className="container py-5 text-center">
              <h1>Selamat Datang</h1>
              <p className="lead">Silahkan Pilih Menu</p>
            </div>
          } 
        />

        <Route path="/categories" element={<CategoryPages />} />
        <Route path="/products" element={<ProductPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
