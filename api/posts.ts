import { UserInfo, Timestamp, Document } from '../lib/firebase';

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

export interface User {
  user: UserInfo;
  username: string | null;
}

export const postToJSON = (doc: Document): Post => {
  const data = doc.data() as PostDto;
  return {
    ...data,
    createdAt: data?.createdAt.toMillis() || 0,
    updatedAt: data?.updatedAt.toMillis() || 0
  };
};
