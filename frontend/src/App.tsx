import { Route, Routes } from "react-router";
import Auth from "./pages/Auth.tsx";

export default function App() {
  return (
    <Routes>
      <Route path="/auth/*" element={<Auth />} />
    </Routes>
  );
}
