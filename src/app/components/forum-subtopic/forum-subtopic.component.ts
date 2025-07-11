import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ISubtopicDetailAPIResponse } from '../../interfaces/IForumResponse';
import { UtilsService } from '../../services/utils.service';
import { IntermitentLoadingService } from '../../services/intermitent-loading.service';
import { Title } from '@angular/platform-browser';
import { ForumService } from '../../services/forum.service';
import { ErrorWarningOxComponent } from '../error-warning-ox/error-warning-ox.component';

@Component({
  selector: 'app-forum-subtopic',
  standalone: true,
  imports: [ErrorWarningOxComponent],
  templateUrl: './forum-subtopic.component.html',
  styleUrl: './forum-subtopic.component.css'
})
export class ForumSubtopicComponent implements OnChanges{
  @Input() subtopic: ISubtopicDetailAPIResponse = {} as ISubtopicDetailAPIResponse;

  isResponsive:boolean = false

  constructor(
    public readonly utilsService: UtilsService, 
    public readonly loadingService: IntermitentLoadingService,
    public readonly forumService: ForumService,
    private readonly title: Title) {

    if(window.screen.width < 1600){
      this.isResponsive = true;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.title.setTitle(`RuneFX | ${this.subtopic.title}`);
  }
}
