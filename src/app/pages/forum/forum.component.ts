import { Component, OnInit } from '@angular/core';
import { ForumService } from '../../services/forum.service';
import { IPostAPIResponse, ISubtopicDetailAPIResponse, ITopicsAPIResponse } from '../../interfaces/IForumResponse';
import { ForumTopicsComponent } from '../../components/forum-topics/forum-topics.component';
import { BackgroundVideoComponent } from '../../components/background-video/background-video.component';
import { InfoBoxComponent } from '../../components/info-box/info-box.component';
import { ActivatedRoute } from '@angular/router';
import { ForumSubtopicComponent } from "../../components/forum-subtopic/forum-subtopic.component";

@Component({
  selector: 'app-forum',
  standalone: true,
  imports: [ForumTopicsComponent, BackgroundVideoComponent, InfoBoxComponent, ForumSubtopicComponent],
  templateUrl: './forum.component.html',
  styleUrl: './forum.component.css'
})
export class ForumComponent implements OnInit {

  public errorLoadingTopics: boolean = false;

  public topicData: ITopicsAPIResponse[] = []; 
  public isThereSpecificTopic: boolean = false;
  public topicId: number = 0;


  public subtopicData: ISubtopicDetailAPIResponse = {} as ISubtopicDetailAPIResponse;
  public isThereSpecificSubtopic: boolean = false;
  public subtopicId: number = 0;

  public postData: IPostAPIResponse = {} as IPostAPIResponse;
  public isThereSpecificPost: boolean = false;
  public postId: number = 0;



  constructor(private readonly forumService: ForumService, private readonly route: ActivatedRoute) {}

  ngOnInit(){

    this.route.params.subscribe(params => {

      const subtopicId = params['subtopicId'];
      const subtopicSlug = params['subtopicSlug'];

      if (subtopicId && subtopicSlug){
        this.isThereSpecificSubtopic = true;
        this.subtopicId = subtopicId;
        return;
      }

      const topicId = params['topicId'];
      const topicSlug = params['topicSlug'];

      if (topicId && topicSlug){
        this.isThereSpecificTopic = true;
        this.topicId = topicId;
        return;
      }


    });

    if(this.isThereSpecificTopic){
      this.forumService.getSingleTopic(this.topicId)
      .subscribe({
        next: (value: ITopicsAPIResponse) =>{
          this.topicData = [value];
        }
      })
      return;
    }

    if(this.isThereSpecificSubtopic){
      this.forumService.getSingleSubtopic(this.subtopicId)
      .subscribe({
        next: (value: ISubtopicDetailAPIResponse) =>{
          this.subtopicData = value;
        }
      })
      return;
    }

    //default: get all topics
    this.forumService.getTopicsAndSubtopics()
    .subscribe({
      next: (value: ITopicsAPIResponse[]) =>{
        this.topicData = value;
      },
      error: (error) =>{
        this.errorLoadingTopics = true;
      }
    })
    

  }
}
