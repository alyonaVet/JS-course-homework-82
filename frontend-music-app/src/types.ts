export interface Artist {
  _id: string;
  name: string;
  description: string | null;
  image: string | null;
  isPublished: boolean;
}

export type ArtistFields = Omit<Artist, '_id' | 'isPublished'>

export interface Album {
  _id: string;
  artist:{
    _id: string;
    name: string;
  };
  title: string;
  date: number;
  image: string | null;
  isPublished: boolean;
}

export interface AlbumFields {
  artist: string;
  title: string;
  date: string;
  image: string | null;
}


export interface Track {
  _id: string;
  album: string;
  title: string;
  trackNumber: number;
  duration: string;
  isPublished: boolean;
}

export interface TrackFields {
  album: string;
  title: string;
  trackNumber: string;
  duration: string;
}


export interface RegisterCredentials {
  username: string;
  password: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface User {
  _id: string;
  username: string;
  token: string;
  role: string;
  displayName: string;
  avatar?: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    }
  },
  message: string;
  name: string;
  _message: string;
}

export interface GlobalError {
  error: string;
}

export interface TrackHistory  {
  _id: string;
  user: string;
  track: string;
  trackTitle: string;
  album: string;
  albumTitle: string;
  artist: string;
  artistName: string;
  datetime: string;
}