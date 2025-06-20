interface ITopicAPIResponse{
    id: number;
    title: string;
    description: string;
    subtopics: ISubtopicAPIResponse[];
    slug: string;  
}

interface ISubtopicAPIResponse {
    id: number;
    title: string;
    description: string;
    slug: string;
}