import { IUser } from "../models/auth";

export interface IRatings {
    id: string;
    rating_id: string;
    user_id: string;
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
    lesstion_chapter_id: string;
    content: string;
    rating: string;
    created_at: string;
    updated_at: string;
}

export interface IRatingPayload {
    status: boolean;
    message: string;
    data:  IRatings;
}


export interface IRatingPayloads {
    status: boolean;
    message: string;
    data:  {
        rating: IRatings;
    }
}
