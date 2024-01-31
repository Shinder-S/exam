import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ApiService } from '@/services/api.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-movie-detail',
  standalone: true,
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css'],
  imports: [CommonModule, RouterOutlet]
})
export class MovieDetailsComponent implements OnInit {
  movie: Array<any> = [];

  constructor(private route: ActivatedRoute, private apiService: ApiService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const movieId = params.get('id');
      if (movieId) {
        this.loadMovieDetails(movieId);
      }
    })
  }

  loadMovieDetails(movieId: string) {
    this.apiService.getMovie(movieId).subscribe(
      (data: any) => {
        this.movie = data;
      },
      (error) => {
        console.error('Error fetching movie details:', error);
      }
    )
  }
}
