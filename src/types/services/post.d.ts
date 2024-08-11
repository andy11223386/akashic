import { IBaseRes } from ".";

export declare interface IAddTweetParams {
    createdAt: string;
    username: string;
    content: string;
    comments: number;
    retweets: number;
    likes: string[];
    views: number;
    imageUrl:string;
}

export declare interface IAddCommentParams {
    replyPostId: string;
    replyTo: string;
    createdAt: string;
    username: string;
    content: string;
    comments: number;
    retweets: number;
    likes: string[];
    views: number;
}

export declare interface ILikeTweetParams {
    postId: string;
    username: string;
}

export declare interface IRetweetParams {
    postId: string;
    username: string;
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
    likes: string[];
    views: number;
}

export interface IGetMyTweetParams {
    username: string;
}

export declare interface IGetMyRetweetParams {
    username: string;
}


export interface IGetHistoryTweetParams {
    _ids: string[];
}

export interface IGetTweetParams {
    postId: string;
}

export declare interface IGetMyTweetRes extends IBaseRes<ITweet[]> {

}

export declare interface IGetAllTweetRes extends IBaseRes<ITweet[]> {

}

export declare interface  IAddTweetRes extends IBaseRes<ITweet>{

}

export declare interface IAddCommentRes extends IBaseRes<void> {

}

export declare interface ILikeTweetRes extends IBaseRes<void> {

}

export declare interface IRetweetRes extends IBaseRes<void> {

}

export declare interface IGetTweetRes extends IBaseRes<ITweet> {

}

export declare interface IGetHistoryTweetRes extends IBaseRes<ITweet[]> {

}

export declare interface IGetMyRetweetRes extends IBaseRes<ITweet[]> {

}
