import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from '../components/common/header/Header';
import Kakao from '../page/signin/Kakao';
import SignIn from '../page/signin/SignIn';
import Home from '../page/home/Home';
import NotFound from '../page/NotFound';
import SignUpPage from '../page/SignUpPage';
import CreatePost from '../page/community/CreatePost';
import AddPlant from '../page/plantdiary/AddPlant';
import DetailPlant from '../page/plantdiary/DetailPlant';

export default function Router() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/api/user/signin" element={<SignIn />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/api/user/kakao/callback" element={<Kakao />} />
        <Route path="/api/user/signup" element={<SignUpPage />} />
        <Route path="/createpost" element={<CreatePost />} />
        <Route path="/addplant" element={<AddPlant />} />
        <Route path="/detailplant" element={<DetailPlant />} />
      </Routes>
    </BrowserRouter>
  );
}
