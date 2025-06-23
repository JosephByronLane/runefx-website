import { Component, OnInit } from '@angular/core';
import { ForumService } from '../../services/forum.service';
import { ITopicsAPIResponse } from '../../interfaces/IForumResponse';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-forum-topic',
  standalone: true,
  imports: [],
  templateUrl: './single-forum-topic.component.html',
  styleUrl: './single-forum-topic.component.css'
})
export class SingleForumTopicComponent implements OnInit{
    
  
  topic: ITopicsAPIResponse | null = null;
      
    constructor(private readonly forumService: ForumService, private readonly route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            const topicId = params['topicId'];
            this.forumService.getSingleTopic(topicId).subscribe(topic => {
                console.log(topic);
            });
        });

    }
}
