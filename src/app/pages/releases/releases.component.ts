import { Component, OnInit } from '@angular/core';
import { BackgroundVideoComponent } from '../../components/background-video/background-video.component';
import { InfoBoxComponent } from '../../components/info-box/info-box.component';
import { ShowcaseBoxComponent } from '../../components/showcase-box/showcase-box.component';
import { IReleaseAPIResponse } from '../../interfaces/IReleaseResponse';
import { ReleasesService } from '../../services/releases.service';
import { ErrorWarningOxComponent } from '../../components/error-warning-ox/error-warning-ox.component';

@Component({
  selector: 'app-releases',
  standalone: true,
  imports: [BackgroundVideoComponent, InfoBoxComponent, ShowcaseBoxComponent, ErrorWarningOxComponent],
  templateUrl: './releases.component.html',
  styleUrl: './releases.component.css'
})
export class ReleasesComponent implements OnInit {


  releases: IReleaseAPIResponse[] = [];
  errorLoading: boolean = false;
  constructor(private readonly releasesService: ReleasesService) {
  }

  ngOnInit(): void {
    this.releasesService.getReleases().subscribe({
      next: (releases: IReleaseAPIResponse[]) => {
        this.releases = releases;
      },
      error: (error: any) => {
        this.errorLoading=true;
      }
    });
  }
}
