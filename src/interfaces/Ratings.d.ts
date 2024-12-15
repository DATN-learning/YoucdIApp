export interface IRatings {
    id: string;
    rating_id: string;
    user_id: string;
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
