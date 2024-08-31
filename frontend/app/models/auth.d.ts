export interface IUser {
  email:string,
  username:string,
  password:string

}

export interface Iregister {
  userData:IUser
}

export interface ILogIn extends Omit<IUser, 'username'>{}

