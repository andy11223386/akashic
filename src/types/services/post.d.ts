import { IBaseRes } from ".";

export declare interface IAddTweetParams {
    createdAt: string;
    username: string;
    profilePicture: string;
    content: string;
    comments: number;
    retweets: number;
    likes: number;
    views: number;
}

export declare interface IAddCommentParams {
    replyPostId: string;
    replyTo: string;
    createdAt: string;
    username: string;
    content: string;
    comments: number;
    retweets: number;
    likes: number;
    views: number;
}

export declare interface ITweet {
    _id: string;
    createdAt: string;
    username: string;
    nickname: string;
    profilePicture: string;
    content: string;
    comments: string[];
    retweets: number;
    likes: number;
    views: number;
}

export interface IGetMyTweetParams {
    username: string;
}

export declare interface IGetMyTweetRes extends IBaseRes<ITweet[]> {

}

export declare interface IGetAllTweetRes extends IBaseRes<ITweet[]> {

}

export declare interface  IAddTweetRes extends IBaseRes<ITweet>{

}

export declare interface IAddCommentRes extends IBaseRes<void> {

}

