import { Component } from '@angular/core';
import { ForumService } from '../../services/forum.service';
import { ActivatedRoute } from '@angular/router';
import { ISubtopicAPIResponse } from '../../interfaces/IForumResponse';
import { ForumTopicAndSubtopicComponent } from '../../components/forum-topic-and-subtopic/forum-topic-and-subtopic.component';
import { BackgroundVideoComponent } from '../../components/background-video/background-video.component';
import { UtilsService } from '../../services/utils.service';
import { IntermitentLoadingService } from '../../services/intermitent-loading.service';

@Component({
  selector: 'app-forum-subtopic',
  standalone: true,
  imports: [BackgroundVideoComponent, ForumTopicAndSubtopicComponent],
  templateUrl: './forum-subtopic.component.html',
  styleUrl: './forum-subtopic.component.css'
})
export class ForumSubtopicComponent {

  public subtopicData: ISubtopicAPIResponse = {} as ISubtopicAPIResponse;
  public errorLoadingSubtopic: boolean = false;
  constructor(private readonly forumService: ForumService, private readonly route: ActivatedRoute, public readonly loadingService: IntermitentLoadingService, public readonly utilsService: UtilsService) {

    this.route.params.subscribe(params => {
      const subtopicId = params['subtopicId'];
      const subtopicSlug = params['subtopicSlug'];

      this.forumService.getSingleSubtopic(subtopicId)
      .subscribe({
        next: (value: ISubtopicAPIResponse) =>{
          this.subtopicData = value;
        },
        error: (error) =>{
          this.errorLoadingSubtopic = true;
          return; 
        }
      })
    });
  }
}
