import { IBaseRes } from ".";

export declare interface IAddTweetParams {
    createdAt: string;
    username: string;
    userId: string;
    profilePicture: string;
    content: string;
    comments: number;
    retweets: number;
    likes: number;
    views: number;
}

export declare interface ITweet {
    id: string;
    createdAt: string;
    username: string;
    userId: string;
    profilePicture: string;
    content: string;
    comments: number;
    retweets: number;
    likes: number;
    views: number;
}

export declare interface IGetAllTweetRes extends IBaseRes<ITweet[]> {

}

export declare interface  IAddTweetRes extends IBaseRes<ITweet>{

}

