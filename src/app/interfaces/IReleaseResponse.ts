export interface IReleaseAPIResponse {
    id: number;
    title: string;
    description: string;
    showcase_picture_url: string;
    showcase_picture_credits: string;
    created_at: string;
    updated_at: string;
    created_by_user_data: IReleaseUserData;    
}

interface IReleaseUserData {
    username: string;
    user_pfp_url: string;
}

export interface IReleaseDetailAPIResponse extends IReleaseAPIResponse {
    content: string;
}


export interface ParsedElement{
  type: "title" | "image" | "text";
  content: string;
  extras?: { [key: string]: any };
}