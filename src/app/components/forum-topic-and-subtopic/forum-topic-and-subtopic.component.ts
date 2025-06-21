import { Component, Input } from '@angular/core';
import { ITopicsAPIResponse } from '../../interfaces/IForumResponse';

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


  constructor() {

  }

}
