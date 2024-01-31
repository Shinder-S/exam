import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { StorageService } from '@/services/storage/storage.service';
import { ApiService } from '@/services/api.service';
import { SliderComponent } from "./slider/slider.component";
import { MainComponent } from "./main/main.component";
import { PaginatorComponent } from './paginator/paginator.component';

@Component({
    selector: 'app-layout',
    standalone: true,
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.less'],
    providers: [StorageService, ApiService],
    imports: [CommonModule, RouterOutlet, SliderComponent, MainComponent, PaginatorComponent]
})
export class LayoutComponent implements OnInit {
  currentPag: number = 1
  movieDetails: any
  movies: any
  genders: Array<any> = []
 
  
  user: { userName: string, expiration: string} = { userName: '', expiration: ''}
  trendingMovies: Array<any> = []
  selectedTrending: number = 0  
  constructor(
    private storage : StorageService,
    private apiService: ApiService,
    private cdRef: ChangeDetectorRef
  ){ }

  ngOnInit(): void {
    this.user = this.storage.getStorage('session')

    
  }

  setMovies(event: any){
   console.log(event)
   this.movies = event
  }

  setGender(){
    const gendersIds = []
    for (const movie of this.movies) {
      for(const id of movie.genre_ids){
        gendersIds.push(id)
      }
    }
  }

 

 

  getDetails(movieId: any){
    this.apiService.getMovie(movieId).subscribe(
      {
        next: (data: any) => {
         
         this.movieDetails = data
        },
        error: err => {
          console.log(err)
        }
      }
    )
  }

 
    
}
