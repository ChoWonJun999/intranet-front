import Navbar from '@/components/layout/Navbar';
import { Outlet } from 'react-router-dom';

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="main-content" style={{ margin: '1em' }}>
        <Outlet />
      </main>
      {/* <Footer /> */}
    </div>
  );
}
