import { Route, Routes } from "react-router";
import Auth from "~/pages/Auth.tsx"
import { ToastContainer } from "react-toastify";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/auth/*" element={<Auth />} />
      </Routes>
      <ToastContainer />
    </>
  );
}
