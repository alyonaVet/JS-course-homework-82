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