import {IImage} from './Image';

export interface ICreatePostPayload {
  status: true;
  message: string;
}
export interface ICreateCommentPostPayload extends ICreatePostPayload {
  data: ICommentPostPagination;
}

export interface IPost {
  id: number;
  id_post: string;
  user_id: number;
  title: string;
  description: string;
  class_room_id: number;
  subject_id: number;
  created_at: string;
  updated_at: string;
  images: IImage[];
  classNumber: string;
  subjectName: string | null;
  timeAgo: string;
  user_create: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    email_verified_at?: string;
    position: string;
    status: string;
    created_at: string;
    updated_at: string;
    avatar: string;
  };
}

export interface IPostSuggestion {
  id:number;
  id_post: string;
  user_id: number;
  title: string;
  description: string;
  class_room_id: number;
  subject_id: number;
  category_post: string;
  images:IImage[];
}

export interface IPostPagination {
  id: number;
  id_post: string;
  user_id: number;
  title: string;
  description: string;
  class_room_id: number;
  subject_id: number;
  created_at: string;
  updated_at: string;
  images: IImage[];
  timeAgo: string;
  user_create: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    email_verified_at?: string;
    position: string;
    status: string;
    created_at: string;
    updated_at: string;
    avatar: string;
  };
}
export interface ICommentPostPagination {
  id: number;
  comment_id: number;
  user_id: number;
  post_id: number;
  title: string;
  body: string;
  approved: number;
  spam: number;
  trash: number;
  notify: number;
  created_at: string;
  updated_at: string;
  images: IImage[];
  timeAgo: string;
  user_create: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    email_verified_at?: string;
    position: string;
    status: string;
    created_at: string;
    updated_at: string;
    avatar: string;
  };
}

interface ILinkPagination {
  url: string;
  label: string;
  active: boolean;
}

export interface IPostDetailsPayload {
  status: boolean;
  message: string;
  data: IPost;
}

export interface IPostPayloadPagination {
  status: boolean;
  message: string;
  data: {
    current_page: number;
    data: IPostPagination[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: ILinkPagination[];
    next_page_url: string;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
  };
}
export interface ICommentPostPayloadPagination {
  status: boolean;
  message: string;
  data: {
    current_page: number;
    data: ICommentPostPagination[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: ILinkPagination[];
    next_page_url: string;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
  };
}
