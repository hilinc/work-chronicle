import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "@/pages/home";
import NewRecordPage from "@/pages/new-record";
import EditRecordPage from "@/pages/edit-record";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <div className="mx-auto">
          <header className="bg-white shadow">
            <div className="max-w-[900px] mx-auto py-4">
              <h1 className="text-xl font-bold text-gray-900">工作记录应用</h1>
            </div>
          </header>
          <main className="max-w-[900px] mx-auto">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/new" element={<NewRecordPage />} />
              <Route path="/edit/:id" element={<EditRecordPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
