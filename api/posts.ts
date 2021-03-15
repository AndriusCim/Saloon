import { Timestamp, Document } from './firebase';

export interface Comment {
  content: string;
  createdAt: number;
  createdBy: string;
}

export interface CommentDto {
  content: string;
  createdAt: Timestamp;
  createdBy: string;
}

export interface CommentDocDto {
  data: CommentDto;
}

export interface Post {
  content: string;
  createdAt: number;
  heartCount: number;
  slug: string;
  title: string;
  uid: string;
  updatedAt: number;
  username: string;
  published: boolean;
}

export interface PostDto {
  content: string;
  createdAt: Timestamp;
  heartCount: number;
  slug: string;
  title: string;
  uid: string;
  updatedAt: Timestamp;
  username: string;
  published: boolean;
}

export const mapPostDtoToModel = (doc: Document): Post => {
  const data = doc.data() as PostDto;
  return {
    ...data,
    createdAt: data?.createdAt.toMillis() || 0,
    updatedAt: data?.updatedAt.toMillis() || 0
  };
};

export const mapCommentDtoToModel = (doc: Document): Comment => {
  const data = doc.data().data;
  
  const comments: Comment = {
    ...data,
    createdAt: data?.createdAt.toMillis() || 0
  };

  return comments;
};

export const mapCommentDocDtoToModel = (doc: CommentDto): Comment => {
  const data = doc

  const comments: Comment = {
    ...data,
    createdAt: data?.createdAt?.toMillis() || 0
  };

  return comments;
};