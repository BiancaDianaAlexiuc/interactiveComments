import { Timestamp } from "firebase/firestore";

export interface ISingleComment {
  votes: any;
  author: any;
  commentId: any;
  body: any;
  comments: any;
}

export interface IAddComment {
  id: string;
  selected: string;
}

export interface IComment {
  commentId: string;
  comments: any;
}

export interface IColourOption {
  readonly value: string;
  readonly label: string;
  readonly color: string;
  readonly isFixed?: boolean;
  readonly isDisabled?: boolean;
}

export interface IVotes {
  votesNumber: number;
  quoteId: string;
  selected: any;
}

export interface ISingleQuote {
  selected: string;
  votesNumber: number;
  quoteId: string;
  author: string;
  body: string;
  handleDeleteClick: any;
  //handleReplyClick: any;
  handleShowComments: any;
  hashtags: any;
  created: any;
  updated: any;
  comments: any;
}
