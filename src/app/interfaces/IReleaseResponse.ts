export interface IReleaseResponse {
    id: number;
    title: string;
    description: string;
    showcase_picture_url: string;
    created_at: string;
    updated_at: string;
    created_by_user_data: IReleaseUserData;    
}

interface IReleaseUserData {
     username: string;
    user_pfp_url: string;
}

export interface IReleaseDetailAPIResponse extends IReleaseResponse {
    content: string;
}