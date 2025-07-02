import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { IReleaseDetailAPIResponse } from '../../interfaces/IReleaseResponse';
import { ReleasesService } from '../../services/releases.service';
import { ActivatedRoute } from '@angular/router';
import { BackgroundVideoComponent } from '../../components/background-video/background-video.component';
import { UtilsService } from '../../services/utils.service';
import { MarkdownComponent, MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'app-release-detail',
  standalone: true,
  imports: [BackgroundVideoComponent, MarkdownComponent, MarkdownModule],
  templateUrl: './release-detail.component.html',
  styleUrl: './release-detail.component.css'
})
export class ReleaseDetailComponent implements OnChanges, OnInit{

  public release: IReleaseDetailAPIResponse = {} as IReleaseDetailAPIResponse;

  constructor(private readonly title: Title, 
    private readonly releasesService: ReleasesService, 
    private readonly route: ActivatedRoute,
    public readonly utilsService: UtilsService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.title.setTitle(`RuneFX | Release`);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];  
      this.releasesService.getSingleRelease(id).subscribe({
      next: (release: IReleaseDetailAPIResponse) => {
        this.release = release;
      },
      error: (error: any) => {
        console.error('Error fetching release:', error);
        }
      });
    });
  }
}
