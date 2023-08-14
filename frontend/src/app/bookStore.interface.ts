export interface IResponse {
  success: boolean;
  data: string;
}

export interface IBooks {
  success: boolean;
  data: IBookResponse [] ;
}

export interface IBook {
  success: boolean;
  data: IBookResponse ;
}

export interface ILogin {
  username: string;
  password: string;
}

export interface ISingUp {
  fullName: string;
  email: string;
  password: string;
}

export interface IState {
  _id: string;
  fName: string;
  lName: string;
  username: string;
  role: string;
  token: string;
  iat: number;
}

export const INITIAL_STATE_VALUE = {
  _id: "",
  fName: "",
  lName: "",
  username: "",
  role: "",
  token: "",
  iat: 0
}

export interface IBookAttributes {
  title: string
  author: string
  ISBN: string
  genre: string
  publicationDate: string
  price: number
  available: number,
  pic: any
}

export interface IBookResponse {
  _id: string
  title: string
  author: string
  ISBN: string
  genre: string
  publicationDate: string
  price: number
  available: number,
  pic: any,
  rating: any
}

export const INITIAL_IBooKResponse = {
  _id: '',
  title: '',
  author: '',
  ISBN: '',
  genre: '',
  publicationDate: '',
  price: 0,
  available: 0,
  pic: '',
  rating: ''
}

export interface IUser {
  cart: any[]
  favorites: any[]
  requests: []
  orderStatus: []
  fName: string
  lName: string
  password: string
  role: string
  _id: string
  username: string
}

export interface IUserResponse{
  success: boolean
  data: IUser
}

export interface IAllUsersResponse{
  success: boolean
  data: IUser []
}