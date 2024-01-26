import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { StorageService } from '@/services/storage/storage.service';
import { ApiService } from '@/services/api.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.less'],
  providers: [StorageService, ApiService]
})
export class LayoutComponent implements OnInit {
  
  user: { userName: string, expiration: string} = { userName: '', expiration: ''}
  trendingMovies: Array< {
    "adult": boolean,
    "backdrop_path": string,
    "id": number,
    "title": string,
    "original_language": string,
    "original_title": string,
    "overview": string,
    "poster_path": string,
    "media_type": string,
    "genre_ids": Array<number>,
    "popularity": number,
    "release_date": string,
    "video": boolean,
    "vote_average": number,
    "vote_count": number
} > = [{
  "adult": false,
  "backdrop_path": "/jXJxMcVoEuXzym3vFnjqDW4ifo6.jpg",
  "id": 572802,
  "title": "Aquaman and the Lost Kingdom",
  "original_language": "en",
  "original_title": "Aquaman and the Lost Kingdom",
  "overview": "Black Manta, still driven by the need to avenge his father's death and wielding the power of the mythic Black Trident, will stop at nothing to take Aquaman down once and for all. To defeat him, Aquaman must turn to his imprisoned brother Orm, the former King of Atlantis, to forge an unlikely alliance in order to save the world from irreversible destruction.",
  "poster_path": "/7lTnXOy0iNtBAdRP3TZvaKJ77F6.jpg",
  "media_type": "movie",
  "genre_ids": [
      28,
      12,
      14
  ],
  "popularity": 2998.367,
  "release_date": "2023-12-20",
  "video": false,
  "vote_average": 6.841,
  "vote_count": 804
}]  
  constructor(
    private storage : StorageService,
    private apiService: ApiService
  ){ }

  ngOnInit(): void {
    this.user = this.storage.getStorage('session')
    this.apiService.getTrendingMovies().subscribe(
      {
        next: (data: any) => {
          console.log(typeof data.results)
          this.trendingMovies = data.results
          console.log(this.trendingMovies) 
        },
        error: err => {
          console.log(err)
        }
      }
    )
  }
}
