import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import PostsPage from "./pages/PostsPage";
import UsersPage from "./pages/UsersPage";

function App() {

  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to='/'>TUGAS CRUD</Link>
          <div className="navbar-nav">
            <Link className="nav-link" to='/users'>Users</Link>
            <Link className="nav-link" to='/posts'>Posts</Link>
          </div>
        </div>
      </nav>
      <Routes>
          <Route path="/" element={
            <div className="container py-5  text-center">
              <h1>Selamat Datang</h1>
              <p className="lead">Silhkan Pilih Menu</p>
              <button className="btn bg-secondary mb-2 me-2 bg-primary text-white">
                <Link className="nav-link" to='/users'>Users</Link>
              </button>
              <button className="btn bg-secondary mb-2 ms-2 bg-primary text-white">
                <Link className="nav-link" to='/posts'>Posts</Link>
              </button>
            </div>
          }/>
          <Route path="/posts" element={<PostsPage/>}/>
          <Route path="/users" element={<UsersPage/>}/>
      </Routes>
    </BrowserRouter>
  )

}

export default App