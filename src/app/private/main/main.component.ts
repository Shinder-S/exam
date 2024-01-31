import { Component, OnInit, ChangeDetectorRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { StorageService } from '@/services/storage/storage.service';
import { ApiService } from '@/services/api.service';
import { SliderComponent } from "../slider/slider.component";

@Component({
    selector: 'app-main',
    standalone: true,
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.less'],
    providers: [StorageService, ApiService],
    imports: [CommonModule, RouterOutlet, SliderComponent]
})
export class MainComponent implements OnInit, OnChanges {
  currentPag: number = 1
  movieDetails: any
  @Input() data: Array<any> = []
  movies: Array<any> = []
  genders: Array<any> = []
  totalMovies: number = 0
  lastPage: number = 0
  user: { userName: string, expiration: string} = { userName: '', expiration: ''}
  trendingMovies: Array<any> = []
  selectedTrending: number = 0  
  constructor( 
    private storage : StorageService,
    private apiService: ApiService,
    private cdRef: ChangeDetectorRef
  ){ 
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.data)
    this.movies = this.data
  }

  ngOnInit(): void {
    console.log(this.data)
  }


  setMovies(event: any){
    console.log(event)
  }



  // setGender(){
  //   for (const movie of this.movies) {
  //     for(const id of movie.genre_ids){
  //       let gender = this.genders.find((elem: { id: number, name: string }) => elem.id === id)
        
  //     }
  //   }
  // }

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
