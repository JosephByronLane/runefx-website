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
}

interface IPostAPIResponse {
    id: number;
    title: string;
    content: string;
}