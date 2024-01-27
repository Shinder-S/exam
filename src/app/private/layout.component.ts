import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { StorageService } from '@/services/storage/storage.service';
import { ApiService } from '@/services/api.service';
import { SliderComponent } from "../slider/slider.component";
import { MainComponent } from "../main/main.component";

@Component({
    selector: 'app-layout',
    standalone: true,
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.less'],
    providers: [StorageService, ApiService],
    imports: [CommonModule, RouterOutlet, SliderComponent, MainComponent]
})
export class LayoutComponent implements OnInit {
  currentPag: number = 1
  movieDetails: any
  movies: any
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
  ){ }

  ngOnInit(): void {
    this.user = this.storage.getStorage('session')

    
    this.apiService.getTrendingMovies().subscribe(
      (res: any) => {
        console.log(res)
        this.trendingMovies = res.results
      },
      err => {
        console.log(err)
      }
    )
    this.apiService.getGenders().subscribe(
      {
        next: (gendersData: any) => {
          this.genders = gendersData.genres
          console.log(this.genders)
          this.apiService.getMovies(1).subscribe(
            {
              next: (data: any) => {
                console.log(data)
                this.currentPag = 1
                this.totalMovies = data.total_results
                this.lastPage = data.total_pages
                this.movies = data.results
                this.setGender()
                console.log(this.movies)
                this.cdRef.detectChanges()
                console.log(this.lastPage)
                
              },
              error: err => {
                console.log(err)
              }
            }
          )

        },
        error: err => {
          console.log(err)
        }
      }
    )

    
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

  nextPag(){
    if(this.currentPag < this.lastPage){
      this.currentPag++
      this.apiService.getMovies(this.currentPag).subscribe(
        {
          next: (data: any) => {
            console.log(data)
            this.movies = data.results
            this.cdRef.detectChanges()
          },
          error: err => {
            console.log(err)
          }
        }
      )
    }
  }

  prevPag(){
    if(this.currentPag > 1){
      this.currentPag--
      this.apiService.getMovies(this.currentPag).subscribe(
        {
          next: (data: any) => {
            console.log(data)
            this.movies = data.results
            this.cdRef.detectChanges()
          },
          error: err => {
            console.log(err)
          }
        }
      )
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
