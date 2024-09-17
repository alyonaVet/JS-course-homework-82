export interface Artist {
  _id: string;
  name: string;
  image: string | null;
}

export interface Album {
  _id: string;
  artist:{
    _id: string;
    name: string;
  };
  title: string;
  date: number;
  image: string | null;
}

export interface Track {
  _id: string;
  album: string;
  title: string;
  trackNumber: number;
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
