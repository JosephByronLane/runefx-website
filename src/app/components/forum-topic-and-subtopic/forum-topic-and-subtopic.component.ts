import { Component, Input } from '@angular/core';
import { ITopicsAPIResponse } from '../../interfaces/IForumResponse';
import { UtilsService } from '../../services/utils.service';

import { IntermitentLoadingService } from '../../services/intermitent-loading.service';

@Component({
  selector: 'app-forum-topic-and-subtopic',
  standalone: true,
  imports: [],
  templateUrl: './forum-topic-and-subtopic.component.html',
  styleUrl: './forum-topic-and-subtopic.component.css'
})
export class ForumTopicAndSubtopicComponent {
  @Input() topic: ITopicsAPIResponse = {
    id: 1,
    title: "Failed to load topic",
    description: "Please try again later.",
    subtopics: [],
    slug: "error-topic"  
  };

  formatedDate: string = 'Error retrieviing date';
  constructor(    public readonly utilsService: UtilsService, public readonly loadingService: IntermitentLoadingService) {
  }

  truncateUserName(userName: string): string {
    if (userName.length > 13) {
      return userName.slice(0, 10) + '...';
    }
    return userName;
  }


}
