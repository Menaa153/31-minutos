// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import Header from './components/Header';
import './css/App.css'

// Importa tus páginas (crearás los archivos más adelante)
import Home from './pages/home.jsx';
import Reporteros from './pages/reporteros';
import NotaVerde from './pages/nota_verde';
import Horoscopo from './pages/horoscopo';
import Deportes from './pages/deportes';
import TulioResponde from './pages/tulio_responde';
import EntrevistasLocas from './pages/entrevistas_locas';
import Login from './pages/login';
import AdminPanell from './pages/panel_admin.jsx';
import ReporteroPanel from './pages/panel_reportero';
import Footer from './components/Footer.jsx';


function App() {

  const location = useLocation();
  const noFooterRoutes = ['/login', '/admin', '/reportero'];

  const hideFooter = noFooterRoutes.includes(location.pathname);

  return (
    <div className="app-container">

      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reporteros" element={<Reporteros />} />
          <Route path="/nota-verde" element={<NotaVerde />} />
          <Route path="/horoscopo" element={<Horoscopo />} />
          <Route path="/deportes" element={<Deportes />} />
          <Route path="/tulio-responde" element={<TulioResponde />} />
          <Route path="/entrevistas-locas" element={<EntrevistasLocas />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminPanell />} />
          <Route path="/reportero" element={<ReporteroPanel />} />

        </Routes>
      </main>
      {!hideFooter && <Footer />}
    </div>
  );
}


export default App;
