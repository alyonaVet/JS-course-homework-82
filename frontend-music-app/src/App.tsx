import './App.css';
import {Route, Routes} from 'react-router-dom';
import AppToolbar from './UI/AppToolbar/AppToolbar';
import Artists from './features/artists/components/Artists';
import NotFoundPage from './UI/NotFoundPage/NotFoundPage';
import Albums from './features/albums/components/Albums';
import Tracks from './features/tracks/components/Tracks';
import Register from './features/users/components/Register';
import Login from './features/users/components/Login';

const App = () => {
  return (
    <>
      <header>
        <AppToolbar/>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Artists />} />
          <Route path="/artists/:artistId/albums" element={<Albums />} />
          <Route path="/albums/:albumId/tracks" element={<Tracks />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
