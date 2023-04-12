import React, { Suspense, lazy } from 'react';
import { UserAuthContextProvider } from "./context/UserAuthContext";
import Index from './components/Index';
import { Routes, Route } from 'react-router-dom';
import MyComponent from './MyComponent';
const ProductList = lazy(() => import('./components/ProductList'));
const ProtectedRoute = lazy(() => import('./ProtectedRoute'));
const Home = lazy(() => import('./Home'));
const AddProduct = lazy(() => import('./components/AddProduct'));
const Profile = lazy(() => import('./components/Profile'));
const PreviousWork = lazy(() => import('./components/PreviousWork'));
const ProfilePicture = lazy(() => import('./components/ProfilePicture'));
const DescribeBusiness = lazy(() => import('./components/DescribeBusiness'));
const Calendar = lazy(() => import('./components/Calendar'));
const Logout = lazy(() => import('./components/Logout'));
const Category = lazy(() => import('./components/Category'));
const CreateProfile = lazy(() => import('./components/CreateProfile'));
const BusinessAnalysis = lazy(() => import('./components/BusinessAnalysis'));
const AddStaf = lazy(() => import('./components/AddStaf'));
const AddNewBooking = lazy(() => import('./components/AddNewBooking'));

function App() {
  const renderLoader = () =>
    <>
      <div style={{ height: '100vh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div class="spinner-grow" role="status" style={{ height: '3rem', width: '3rem' }}>
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </>;
  return (
    <UserAuthContextProvider>
      <Suspense fallback={renderLoader()}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="select" element={<MyComponent />} />
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
            <Route path='manage-staaf' element={<AddStaf />} />
            <Route path='add_new_booking' element={<AddNewBooking />} />
            <Route path='logout' element={<Logout />} />

          </Route>

        </Routes>
      </Suspense>
    </UserAuthContextProvider>
  );
}

export default App;
