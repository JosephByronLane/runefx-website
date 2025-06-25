
//TOPIC RESPONSE

export interface ITopicsAPIResponse{
    id: number;
    title: string;
    description: string;
    subtopics: ISubtopicAPIResponse[];
    posts?: IPostAPIResponse[];
    slug: string;  
}



//SUBTOPIC RESPONSE
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
    post_count: number;
}


//POST RESPONSE
interface IPostAPIResponse {
    id: number; 
    title: string;
    content: string;
    comments: any[];
    created_at: string;
    created_by: string;
    amount_of_comments: number;
    latest_comment_data: ILatestPostsAPIResponse;
}


interface IUserForumData{
    username:string; 
    user_pfp_url:string; 
}

interface ILatestPostsAPIResponse extends IUserForumData{
    latest_post_time: string;
}