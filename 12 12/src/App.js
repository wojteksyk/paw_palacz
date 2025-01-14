import './App.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Posts from './pages/posts';
import Categories from './pages/category';


function App() {
  return (
      <Router>

        <Routes>
          <Route path="/" element={<Home />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/categories" element={<Categories />} />
        </Routes>
      </Router>
  );
}

export default App;
