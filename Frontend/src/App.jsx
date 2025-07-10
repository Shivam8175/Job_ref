import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CandidateProvider } from "./context/CandidateContext";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar";
import { Dashboard } from "./components/Dashboard";
import ReferralForm from "./pages/Referalpage";
import SignupPage from "./pages/SignupPage";

function App() {
  return (
    <CandidateProvider>
      <div className="min-h-screen">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/referal" element={<ReferralForm />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </main>
      </div>
    </CandidateProvider>
  );
}

export default App;
