export interface ITopicsAPIResponse{
    id: number;
    title: string;
    description: string;
    subtopics: ISubtopicAPIResponse[];
    posts?: IPostAPIResponse[];
    slug: string;  
}

interface ISubtopicAPIResponse {
    id: number;
    title: string;
    description: string;
    slug: string;
    posts?: IPostAPIResponse[];
    post_count: number;
    latest_post_data: ILatestPostsAPIResponse
}

interface IPostAPIResponse {
    id: number;
    title: string;
    content: string;
}


interface ILatestPostsAPIResponse {
    latest_post_user: string;
    latest_post_time: string;
    latest_post_user_pfp: string;
}