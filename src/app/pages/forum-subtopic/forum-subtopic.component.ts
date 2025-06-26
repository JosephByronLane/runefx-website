import { Component } from '@angular/core';
import { ForumService } from '../../services/forum.service';
import { ActivatedRoute } from '@angular/router';
import { ISubtopicDetailAPIResponse } from '../../interfaces/IForumResponse';
import { ForumTopicsComponent } from '../../components/forum-topics/forum-topics.component';
import { BackgroundVideoComponent } from '../../components/background-video/background-video.component';
import { UtilsService } from '../../services/utils.service';
import { IntermitentLoadingService } from '../../services/intermitent-loading.service';

@Component({
  selector: 'app-forum-subtopic',
  standalone: true,
  imports: [BackgroundVideoComponent, ForumTopicsComponent],
  templateUrl: './forum-subtopic.component.html',
  styleUrl: './forum-subtopic.component.css'
})
export class ForumSubtopicComponent {

  public subtopicData: ISubtopicDetailAPIResponse = {} as ISubtopicDetailAPIResponse;
  public errorLoadingSubtopic: boolean = false;
  constructor(private readonly forumService: ForumService, private readonly route: ActivatedRoute, public readonly loadingService: IntermitentLoadingService, public readonly utilsService: UtilsService) {

    this.route.params.subscribe(params => {
      const subtopicId = params['subtopicId'];
      const subtopicSlug = params['subtopicSlug'];

      this.forumService.getSingleSubtopic(subtopicId)
      .subscribe({
        next: (value: ISubtopicDetailAPIResponse) =>{
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
