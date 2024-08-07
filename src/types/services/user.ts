import { IBaseRes } from ".";


export interface ILoginParams {
    username: string
    password: string
}

export interface ILoginRes extends IBaseRes<{profile: IProfile, token: string}>{
}


export interface IProfile {
    username: string;
    nickname: string;
    bio: string;
    followingsCount: number;
    followersCount: number;
    createdAt: string;
    profilePicture: string;
  }
  
  export interface IGetProfileRes extends IBaseRes<IProfile>{
  }
  
  export interface IGetProfileParams {
    username: string;
  }

  export interface IUpdateProfileParams {
    nickname: string;
    bio: string;
  }

  export interface IUpdateProfileRes extends IBaseRes<{profile: IProfile}>{
  }

