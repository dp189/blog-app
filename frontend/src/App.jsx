import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout, Home, Blog, CreateBlog, Login, SignUp } from "./index.jsx";
import NotFound from "./pages/NotFound.jsx";
import FavouriteBlog from "./pages/FavouriteBlog.jsx";
import { useAuthContext } from "./hooks/useAuthContext.js";
import Loading from "./components/Loading/Loading.jsx";

function App() {
  const { user, loading } = useAuthContext();

  if (loading) {
    return <Loading/>; // Replace this with a proper loading spinner or animation
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/create" element={<CreateBlog />} />
          <Route
            path="/favourites"
            element={user ? <FavouriteBlog /> : <Navigate to="/login" />}
          />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!user ? <SignUp /> : <Navigate to="/" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
