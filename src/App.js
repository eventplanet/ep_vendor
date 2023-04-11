import React from 'react';
import Index from './components/Index';
import { Routes, Route } from 'react-router-dom';
import Form from './components/Form';
import ProductList from './components/ProductList';
import { UserAuthContextProvider } from "./context/UserAuthContext";
import ProtectedRoute from './ProtectedRoute';
import Home from './Home';
import AddProduct from './components/AddProduct';
import Profile from './components/Profile';
import PreviousWork from './components/PreviousWork';
import ProfilePicture from './components/ProfilePicture';
import DescribeBusiness from './components/DescribeBusiness';
import Calendar from './components/Calendar';
import Logout from './components/Logout';
import Category from './components/Category';
import CreateProfile from './components/CreateProfile';
import BusinessAnalysis from './components/BusinessAnalysis';
function App() {
  return (
    <UserAuthContextProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='category' element={<Category />} />
        <Route path='create-profile/:cat_id/:sub_cat_id' element={<CreateProfile />} />

        <Route path='dashboard' element={<ProtectedRoute><Index /></ProtectedRoute>}>
          <Route path='dash_board' element={<BusinessAnalysis />} />
          <Route path='profile' element={<Profile />} />
          <Route path='profile-picture' element={<ProfilePicture />} />
          <Route path='describe-business' element={<DescribeBusiness />} />
          <Route path='calendar' element={<Calendar />} />
          <Route path='previous-work' element={<PreviousWork />} />
          <Route path='product-list' element={<ProductList />} />
          <Route path='add-product' element={<AddProduct />} />
          <Route path='logout' element={<Logout />} />

        </Route>
      </Routes>
    </UserAuthContextProvider>
  );
}

export default App;
