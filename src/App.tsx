import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout/MainLayout';
import DashboardPage from './pages/DashboardPage/DashboardPage';

function App() {
  return (
    <Routes>

      <Route path="/" element={<MainLayout />}>
        
        <Route
          index
          element={<Navigate to="/dashboard" replace />}
        />

        <Route
          path="dashboard"
          element={<DashboardPage />}
        />

      </Route>

    </Routes>
  );
}

export default App;