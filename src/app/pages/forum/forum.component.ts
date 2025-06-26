import { Component, OnInit } from '@angular/core';
import { ForumService } from '../../services/forum.service';
import { IPostAPIResponse, ISubtopicDetailAPIResponse, ITopicsAPIResponse } from '../../interfaces/IForumResponse';
import { ForumTopicsComponent } from '../../components/forum-topics/forum-topics.component';
import { BackgroundVideoComponent } from '../../components/background-video/background-video.component';
import { InfoBoxComponent } from '../../components/info-box/info-box.component';
import { ActivatedRoute } from '@angular/router';
import { ForumSubtopicComponent } from "../../components/forum-subtopic/forum-subtopic.component";
import { ForumPostComponent } from "../../components/forum-post/forum-post.component";
import { IntermitentLoadingService } from '../../services/intermitent-loading.service';

@Component({
  selector: 'app-forum',
  standalone: true,
  imports: [ForumTopicsComponent, BackgroundVideoComponent, InfoBoxComponent, ForumSubtopicComponent, ForumPostComponent ],
  templateUrl: './forum.component.html',
  styleUrl: './forum.component.css'
})
export class ForumComponent implements OnInit {

  public errorLoadingTopics: boolean = false;

  public topicData: ITopicsAPIResponse[] | null = null; 
  public isThereSpecificTopic: boolean = false;
  public topicId: number = 0;


  public subtopicData: ISubtopicDetailAPIResponse | null = null;
  public isThereSpecificSubtopic: boolean = false;
  public subtopicId: number = 0;

  public postData: IPostAPIResponse | null = null;
  public isThereSpecificPost: boolean = false;
  public postId: number = 0;

  public breadcrumbs: {text: string, link: string}[] = [
    {text: "Forum", link: "/forum"},
  ];

  constructor(private readonly forumService: ForumService, private readonly route: ActivatedRoute, public readonly intermitentLoadingService: IntermitentLoadingService) {}

  ngOnInit(){

    this.route.params.subscribe(params => {

      const subtopicId = params['subtopicId'];
      const subtopicSlug = params['subtopicSlug'];

      const topicId = params['topicId'];
      const topicSlug = params['topicSlug'];

      const postId = params['postId'];

      if (subtopicId && subtopicSlug){
        this.isThereSpecificSubtopic = true;
        this.subtopicId = subtopicId;
        return;
      }


      if (topicId && topicSlug){
        this.isThereSpecificTopic = true;
        this.topicId = topicId;
        return;
      }

      if (postId){
        this.isThereSpecificPost = true;
        this.postId = postId;
        return;
      }

    });

    //fetching breadcrumbs

    if(this.isThereSpecificTopic){
      this.forumService.getSingleTopic(this.topicId)
      .subscribe({
        next: (value: ITopicsAPIResponse) =>{
          this.breadcrumbs.push({text: value.title, link: 'forum/'+value.id+'/'+value.slug});
        },
      })
    }
    


    //fetching data to display
    if(this.isThereSpecificTopic){
      this.forumService.getSingleTopic(this.topicId)
      .subscribe({
        next: (value: ITopicsAPIResponse) =>{
          this.topicData = [value];
        },
        error: (error) =>{
          console.log(error);
          this.errorLoadingTopics = true;
        }
      })
      return;
    }

    if(this.isThereSpecificSubtopic){
      this.forumService.getSingleSubtopic(this.subtopicId)
      .subscribe({
        next: (value: ISubtopicDetailAPIResponse) =>{
          this.subtopicData = value;
        },
        error: (error) =>{
          console.log(error);
          this.errorLoadingTopics = true;
        }
      })
      return;
    }

    if(this.isThereSpecificPost){
      this.forumService.getPostAndComments(this.postId)
      .subscribe({
        next: (value: IPostAPIResponse) =>{
          this.postData = value;
          console.log('postData', this.postData);
        },
        error: (error) =>{  
          console.log(error);
          this.errorLoadingTopics = true;
        }
      })
    }

    //default: get all topics
    this.forumService.getTopicsAndSubtopics()
    .subscribe({
      next: (value: ITopicsAPIResponse[]) =>{
        this.topicData = value;
      },
      error: (error) =>{
        console.log(error);
        this.errorLoadingTopics = true;
      }
    })
  }
}
