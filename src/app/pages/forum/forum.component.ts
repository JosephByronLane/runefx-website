import { Component, OnInit } from '@angular/core';
import { ForumService } from '../../services/forum.service';
import { ITopicsAPIResponse } from '../../interfaces/IForumResponse';
import { ForumTopicAndSubtopicComponent } from '../../components/forum-topic-and-subtopic/forum-topic-and-subtopic.component';
import { BackgroundVideoComponent } from '../../components/background-video/background-video.component';
import { InfoBoxComponent } from '../../components/info-box/info-box.component';

@Component({
  selector: 'app-forum',
  standalone: true,
  imports: [ForumTopicAndSubtopicComponent, BackgroundVideoComponent, InfoBoxComponent],
  templateUrl: './forum.component.html',
  styleUrl: './forum.component.css'
})
export class ForumComponent implements OnInit {

  public topics: ITopicsAPIResponse[] = []; 

  constructor(private readonly forumService: ForumService) {}

  ngOnInit(){
    this.forumService.getTopicsAndSubtopics()
    .subscribe((data: ITopicsAPIResponse[]) =>{
      this.topics = data;
    })
  }
}
