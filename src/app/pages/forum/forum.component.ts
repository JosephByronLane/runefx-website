import { Component, OnInit } from '@angular/core';
import { ForumService } from '../../services/forum.service';
import { ITopicsAPIResponse } from '../../interfaces/IForumResponse';
import { ForumTopicAndSubtopicComponent } from '../../components/forum-topic-and-subtopic/forum-topic-and-subtopic.component';
import { BackgroundVideoComponent } from '../../components/background-video/background-video.component';
import { InfoBoxComponent } from '../../components/info-box/info-box.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-forum',
  standalone: true,
  imports: [ForumTopicAndSubtopicComponent, BackgroundVideoComponent, InfoBoxComponent],
  templateUrl: './forum.component.html',
  styleUrl: './forum.component.css'
})
export class ForumComponent implements OnInit {

  public topics: ITopicsAPIResponse[] = []; 
  public errorLoadingTopics: boolean = false;
  public isThereSpecificTopic: boolean = false;
  public topicId: number = 0;
  constructor(private readonly forumService: ForumService, private readonly route: ActivatedRoute) {}

  ngOnInit(){

    this.route.params.subscribe(params => {
      const topicId = params['topicId'];
      const topicSlug = params['topicSlug'];

      if (topicId && topicSlug){
        this.isThereSpecificTopic = true;
        this.topicId = topicId;
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
