import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PostsList from './PostsList';
import Post from './Post';

function App() {
  return (
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<PostsList />} />
            <Route path="/post/:id" element={<Post />} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;
