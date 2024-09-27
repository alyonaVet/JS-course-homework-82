import './App.css';
import {Route, Routes} from 'react-router-dom';
import AppToolbar from './UI/AppToolbar/AppToolbar';
import Artists from './features/artists/Artists';
import NotFoundPage from './UI/NotFoundPage/NotFoundPage';
import Albums from './features/albums/Albums';
import Tracks from './features/tracks/Tracks';
import Register from './features/users/components/Register';
import Login from './features/users/components/Login';
import TrackHistoryPage from './features/track_history/components/TrackHistoryPage';
import AddArtist from './features/artists/AddArtist';
import ProtectedRoute from './UI/ProtectedRoute/ProtectedRoute';
import {useAppSelector} from './app/hooks';
import {selectUser} from './features/users/usersSlice';
import AddAlbum from './features/albums/AddAlbum';
import AddTrack from './features/tracks/AddTrack';

const App = () => {
  const user = useAppSelector(selectUser);
  return (
    <>
      <header>
        <AppToolbar/>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Artists/>}/>
          <Route path="/artists/:artistId/albums" element={<Albums/>}/>
          <Route path="/albums/:albumId/tracks" element={<Tracks/>}/>
          <Route path="/artists/add-artist"
                 element={
                   <ProtectedRoute isAllowed={!!user}>
                     <AddArtist/>
                   </ProtectedRoute>}/>
          <Route path="albums/add-album"
                 element={
                   <ProtectedRoute isAllowed={!!user}>
                     <AddAlbum/>
                   </ProtectedRoute>}/>
          <Route path="tracks/add-track"
                 element={
                   <ProtectedRoute isAllowed={!!user}>
                     <AddTrack/>
                   </ProtectedRoute>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/track-history" element={<TrackHistoryPage/>}/>
          <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
      </main>
    </>
  );
};

export default App;
