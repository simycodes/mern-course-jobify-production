import { BrowserRouter, Routes, Route } from 'react-router-dom';
import  { Landing, Register, Error, ProtectedRoute } from './pages/';
import { AllJobs, Profile, SharedLayout, Stats, AddJob } from './pages/dashboard'

function App() {
  return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={
        <ProtectedRoute> {/* GET TO INDEX & SUB PAGES AFTER LOGIN, ELSE REDIRECT USER */}
          <SharedLayout />  
        </ProtectedRoute>}> 
        {/* ADDING SUB PAGES TO THE HOME PAGE(WHICH IS DASHBOARD IN THIS CASE) */}
        <Route index element={<Stats />}/> {/* index keyword makes stats to be home page */}
        <Route path="all-jobs" element={<AllJobs />}/>
        <Route path="add-job" element={<AddJob />}/>
        <Route path="profile" element={<Profile />}/>
      </Route> 
      <Route path="/register" element={<Register />} /> {/* element can hold any jsx code only - not just page components,<div> -code here- </div> can be used*/}
      <Route path="/landing" element={<Landing />} />
      <Route path="*" element={<Error />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
