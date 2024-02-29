import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import ContactUs from "./components/ContactUs";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import About from "./components/AboutUs";
import Recommend from "./components/Recommend";
import Services from "./components/Services";
import Dashboard from "./pages/admin/Dashboard/Dashboard";
import AdminRoute from "./components/Adminroute";
import Flights from "./pages/admin/Flight/Flights.jsx";
import AddPackage from "./pages/admin/Package/AddPackage";
import Packages from "./pages/admin/Package/Packages";
import Cities from "./pages/admin/cities/Cities";
import Hotels from "./pages/admin/Hotel/Hotels";
import Activities from "./pages/admin/Activity/Activities";
import Bookings from "./pages/admin/Booking/Bookings";
import Payments from "./pages/admin/Payment/Payments";
import Users from "./pages/admin/User/Users";

import AddFlight from "./pages/admin/Flight/AddFlight";
import ViewFlight from "./pages/admin/Flight/ViewFlight";
import EditFlight from "./pages/admin/Flight/EditFlight.jsx";
import AddActivity from "./pages/admin/Activity/AddActivity";
import EditActivity from "./pages/admin/Activity/EditActivity";
import ViewActivity from "./pages/admin/Activity/ViewActivity";

import AddHotel from "./pages/admin/Hotel/AddHotel";
import EditViewHotel from "./pages/admin/Hotel/EditViewHotel";
import AllPackages from "./components/AllPackages";
import ViewUser from "./pages/admin/User/ViewUser";
import EditUser from "./pages/admin/User/EditUser";
import ViewPkg from "./components/ViewPkg";
import CustomerRoute from "./components/Customerroute";
import EditViewPackage from "./pages/admin/Package/EditViewPackage";
import Payment from "./components/Payment";
import Profile from "./components/Profile";
import MyBookings from "./components/MyBookings";
import ViewCity from "./pages/admin/cities/ViewCity";
import AddCity from "./pages/admin/cities/AddCity";


function App() {
  return (
    <BrowserRouter>
      <ToastContainer autoClose={1000}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/recommend" element={<Recommend />} />
        <Route path="/home" element={<Home />} />
        <Route path="/loggedIn" element={<CustomerRoute></CustomerRoute>}>
        <Route path="profile" element={<Profile />} />
        <Route path="bookings" element={<MyBookings />}></Route>
        </Route>
        <Route path="/allpackages" element={<CustomerRoute />}>
          <Route path="filterByCity" element={<AllPackages />} />
          <Route path="UViewPkg/:packageId" element={<ViewPkg />} />
          <Route path="payment" element={<Payment />} /> 
        </Route>
        
        <Route path="/admin" element={<AdminRoute />}>
          <Route path="" element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="cities" element={<Cities/>}/>
          <Route path="packages" element={<Packages />}/>
          <Route path="hotels" element={<Hotels />} />
          <Route path="flights" element={<Flights />} />
          <Route path="activities" element={<Activities />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="payments" element={<Payments />} />
          <Route path="users" element={<Users />} />
          <Route path="viewUser/:userId" element={<ViewUser />} />
          <Route path="editUser/:userId" element={<EditUser />} />

          <Route path="addPackage" element={<AddPackage />} />
          <Route path="editPackage/:packageId" element={<EditViewPackage />} />
          <Route path="viewPackage/:packageId" element={<EditViewPackage />} />

          <Route path="addActivity" element={<AddActivity />} />
          <Route path="editActivity/:activityId" element={<EditActivity />} />
          <Route path="viewActivity/:activityId" element={<ViewActivity />} />
          
          <Route path="addFlight" element={<AddFlight />} />
          <Route path="editFlight/:flightId" element={<EditFlight />} />
          <Route path="viewFlight/:flightId" element={<ViewFlight />} />

          <Route path="addHotel" element={<AddHotel />} />
          <Route path="editHotel/:hotelId" element={<EditViewHotel />} />
          <Route path="viewHotel/:hotelId" element={<EditViewHotel />} />

          <Route path="bookings" element={<Bookings />} />

          <Route path="viewCity/:cityId" element={<ViewCity />} />
          <Route path="addCity" element={<AddCity />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
