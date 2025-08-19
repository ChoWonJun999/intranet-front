import MainLayout from '@/components/layout/MainLayout';
import HomePage from '@/pages/home/HomePage';
import { Navigate, Route, Routes } from 'react-router-dom';

export default function AppRouter() {
  return (
    <Routes>
      {/* <Route path="/login" element={<LoginPage />} /> */}

      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<HomePage />} />
        <Route path="home" element={<Navigate to="/" replace />} />
      </Route>

      {/*
      <Route path="/admin/" element={<AdminLayout />}>
        <Route path="" element={<AdminHomePage />} />
      </Route>
       */}
    </Routes>
  );
}
