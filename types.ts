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