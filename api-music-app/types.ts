import {Model} from 'mongoose';

export interface IArtist {
  name: string;
  image: string | null;
  description: string | null;
}

export interface IAlbum {
  artist: string;
  title: string;
  date: number;
  image: string | null;
}

export interface ITrack {
  album: string;
  title: string;
  trackNumber: number;
  duration: string;
}

export interface UserFields {
  username: string;
  password: string;
  token: string;
  role: string;
  displayName: string;
  googleID?: string;
  avatar: string | null;
}

export interface UserMethods {
  checkPassword(password: string): Promise<boolean>;
  generateToken(): void;
}

export type UserModel = Model<UserFields, {}, UserMethods>