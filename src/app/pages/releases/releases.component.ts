import { Component, OnInit } from '@angular/core';
import { BackgroundVideoComponent } from '../../components/background-video/background-video.component';
import { InfoBoxComponent } from '../../components/info-box/info-box.component';
import { ShowcaseBoxComponent } from '../../components/showcase-box/showcase-box.component';
import { IReleaseAPIResponse } from '../../interfaces/IReleaseResponse';
import { ReleasesService } from '../../services/releases.service';

@Component({
  selector: 'app-releases',
  standalone: true,
  imports: [BackgroundVideoComponent, InfoBoxComponent, ShowcaseBoxComponent],
  templateUrl: './releases.component.html',
  styleUrl: './releases.component.css'
})
export class ReleasesComponent implements OnInit {


  releases: IReleaseAPIResponse[] = [];

  constructor(private readonly releasesService: ReleasesService) {
  }

  ngOnInit(): void {
    this.releasesService.getReleases().subscribe({
      next: (releases: IReleaseAPIResponse[]) => {
        console.log(releases);
        this.releases = releases;
      },
      error: (error: any) => {
        console.error('Error fetching releases:', error);
      }
    });
  }
}
