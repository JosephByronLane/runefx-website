interface IBaseForumData{
    id: number;
    title: string;
    slug: string;
}


interface IUserForumData{
    username:string; 
    user_pfp_url:string; 
}

interface ILatestPostsAPIResponse extends IUserForumData{
    latest_post_time: string;
}


//TOPIC RESPONSE

export interface ITopicsAPIResponse extends IBaseForumData{
    description: string;
    subtopics: ISubtopicAPIResponse[];
    posts?: IPostAPIResponse[];
}

//SUBTOPIC RESPONSE
interface IBaseSubtopicAPIResponse extends IBaseForumData{
    description: string;
}

// when looking at it from the topics page
export interface ISubtopicAPIResponse extends IBaseSubtopicAPIResponse {
    post_count: number;
    latest_post_data: ILatestPostsAPIResponse
}

//when were inside the subtopic page and we actually want to see the posts
export interface ISubtopicDetailAPIResponse extends IBaseSubtopicAPIResponse{
    posts: IPostAPIResponse[];
    post_count: number;
}


//POST RESPONSE
export interface IPostAPIResponse extends IBaseForumData{
    content: string;
    comments: ICommentAPIResponse[];
    created_at: string;
    created_by: IUserForumData;
    amount_of_comments: number;
    latest_comment_data: ILatestPostsAPIResponse;
    subtopic?: number;
    topic?: number;
}


export interface ICommentAPIResponse {
    id: number;
    content: string;
    created_at: string;
    created_by: IUserForumData;
    post: number;
}
