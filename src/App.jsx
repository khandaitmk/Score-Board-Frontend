import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/index";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>
    // <div className=" bg-amber-500">
    //   hello
    // </div>
  );
}

export default App;
