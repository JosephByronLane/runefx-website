import { Component, Input } from '@angular/core';
import { ISubtopicDetailAPIResponse } from '../../interfaces/IForumResponse';
import { UtilsService } from '../../services/utils.service';
import { IntermitentLoadingService } from '../../services/intermitent-loading.service';

@Component({
  selector: 'app-forum-subtopic',
  standalone: true,
  imports: [],
  templateUrl: './forum-subtopic.component.html',
  styleUrl: './forum-subtopic.component.css'
})
export class ForumSubtopicComponent {
  @Input() subtopic: ISubtopicDetailAPIResponse = {} as ISubtopicDetailAPIResponse;


  constructor(public readonly utilsService: UtilsService, public readonly loadingService: IntermitentLoadingService) {}
}
