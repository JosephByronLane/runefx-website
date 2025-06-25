export interface ITopicsAPIResponse{
    id: number;
    title: string;
    description: string;
    subtopics: ISubtopicAPIResponse[];
    posts?: IPostAPIResponse[];
    slug: string;  
}

interface IBaseSubtopicAPIResponse {
    id: number;
    title: string;
    description: string;
    slug: string;

}
//when the API returns a subtopic but not its detailede version (missing posts, posts are missing comments, etc.)
export interface ISubtopicAPIResponse extends IBaseSubtopicAPIResponse {
    post_count: number;
    latest_post_data: ILatestPostsAPIResponse
}

//when querying the posts of a subtopic
export interface ISubtopicDetailAPIResponse extends IBaseSubtopicAPIResponse{
    posts: IPostAPIResponse[];
}

interface IPostAPIResponse {
    id: number; 
    title: string;
    content: string;
    comments: any[];
    created_at: string;
    created_by: string;
    latest_comment_data: ILatestPostsAPIResponse;
}


interface IUserForumData{
    username:string; 
    user_pfp_url:string; 
}

interface ILatestPostsAPIResponse extends IUserForumData{
    latest_post_time: string;
}