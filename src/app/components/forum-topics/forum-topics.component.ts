import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ITopicsAPIResponse } from '../../interfaces/IForumResponse';
import { UtilsService } from '../../services/utils.service';

import { IntermitentLoadingService } from '../../services/intermitent-loading.service';
import { ForumService } from '../../services/forum.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-forum-topics',
  standalone: true,
  imports: [],
  templateUrl: './forum-topics.component.html',
  styleUrl: './forum-topics.component.css'
})
export class ForumTopicsComponent implements OnChanges{
  @Input() topic: ITopicsAPIResponse = {
    id: 1,
    title: "Failed to load topic",
    description: "Please try again later.",
    subtopics: [],
    slug: "error-topic"  
  };

  isResponsive: boolean = false;
  formatedDate: string = 'Error retrieving date';
  constructor(    public readonly utilsService: UtilsService, public readonly loadingService: IntermitentLoadingService, public readonly forumService: ForumService, private readonly title: Title) {
    if(window.screen.width < 1600){
      this.isResponsive = true;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.title.setTitle(`RuneFX | ${this.topic.title}`);
  }
}
