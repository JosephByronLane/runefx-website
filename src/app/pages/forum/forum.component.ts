import { Component, OnInit } from '@angular/core';
import { ForumService } from '../../services/forum.service';
import { ISubtopicDetailAPIResponse, ITopicsAPIResponse } from '../../interfaces/IForumResponse';
import { ForumTopicsComponent } from '../../components/forum-topics/forum-topics.component';
import { BackgroundVideoComponent } from '../../components/background-video/background-video.component';
import { InfoBoxComponent } from '../../components/info-box/info-box.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-forum',
  standalone: true,
  imports: [ForumTopicsComponent, BackgroundVideoComponent, InfoBoxComponent],
  templateUrl: './forum.component.html',
  styleUrl: './forum.component.css'
})
export class ForumComponent implements OnInit {

  public errorLoadingTopics: boolean = false;

  public topics: ITopicsAPIResponse[] = []; 
  public isThereSpecificTopic: boolean = false;
  public topicId: number = 0;


  public subtopicData: ISubtopicDetailAPIResponse = {} as ISubtopicDetailAPIResponse;
  public isThereSpecificSubtopic: boolean = false;
  public subtopicId: number = 0;


  constructor(private readonly forumService: ForumService, private readonly route: ActivatedRoute) {}

  ngOnInit(){

    this.route.params.subscribe(params => {
      const topicId = params['topicId'];
      const topicSlug = params['topicSlug'];

      if (topicId && topicSlug){
        this.isThereSpecificTopic = true;
        this.topicId = topicId;
        return;
      }

      const subtopicId = params['subtopicId'];
      const subtopicSlug = params['subtopicSlug'];

      if (subtopicId && subtopicSlug){
        this.isThereSpecificSubtopic = true;
        this.subtopicId = subtopicId;
        return;
      }
    });

    if(this.isThereSpecificTopic){
      this.forumService.getSingleTopic(this.topicId)
      .subscribe({
        next: (value: ITopicsAPIResponse) =>{
          this.topics = [value];
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

    this.forumService.getTopicsAndSubtopics()
    .subscribe({
      next: (value: ITopicsAPIResponse[]) =>{
        this.topics = value;
      },
      error: (error) =>{
        this.errorLoadingTopics = true;
      }
    })
    

  }
}
