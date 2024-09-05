export interface IArtist {
  name: string;
  image: string | null;
  description: string | null;
}

export interface IAlbum {
  artist: string;
  title: string;
  date: string;
  image: string | null;
}

export interface ITrack {
  album: string;
  title: string;
  duration: string;
}

export interface UserFields {
  username: string;
  password: string;
}