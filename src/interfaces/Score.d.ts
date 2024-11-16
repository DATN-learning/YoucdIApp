export interface IScore {
    id: string;
    id_score: string;
    user_id: {
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
    question_id: string;
    answer_id: string;
    is_correct: string;
    score: string;
    created_at: string;
    updated_at: string;   
}

export interface IScoresPayload {
    status: boolean;
    message: string;
    data: {
        total_score: IScore;
    };
}

