import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom";
import Index from "./pages/index";
import Login from "./pages/login";
import { getUser } from "./lib/auth";
import { useState } from "react";
function App() {
    const [user, setUser] = useState(() => getUser());      
  return (
    
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/Index" replace /> : <Login onLogin={setUser}/>}
        />
  
        <Route
          path="/Index"
          element={user ? <Index onLogout={setUser}/> : <Navigate to="/" replace />}
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
