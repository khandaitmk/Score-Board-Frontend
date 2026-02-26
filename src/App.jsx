import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom";
import Index from "./pages/index";
import { getUser } from "./lib/auth";
import { useState } from "react";
import LoginPage from "./pages/LoginPage";
function App() {
    const [user, setUser] = useState(() => getUser());      
  return (
    
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/Index" replace /> : <LoginPage onLogin={setUser}/>}
        />
  
        <Route
          path="/Index"
          element={user ? <Index onLogout={()=>setUser(null)}/> : <Navigate to="/" replace />}
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
