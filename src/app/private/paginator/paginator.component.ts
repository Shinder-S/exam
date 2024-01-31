import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '@/services/api.service';

@Component({
  selector: 'paginator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.less'],
  providers: [ApiService]
})
export class PaginatorComponent {
  
  constructor(private  apiService: ApiService) {}
  lastPage: number = 0
  currentPage: number = 0
  @Output() emitMovies = new EventEmitter<Array<any>>()
  movies:Array<any> =[]
  totalMovies: number= 0
  ngOnInit(){
    this.inic()
    
  }

  inic(){
    this.apiService.getMovies(1).subscribe(
      {
        next: (data: any) => {

          this.currentPage = 1
          this.totalMovies = data.total_results
          this.lastPage = data.total_pages
          this.movies = data.results
          this.emitMovies.emit(this.movies)
        },
        error: err => {
          console.log(err)
        }
      }
    )
  }

getCurrentPage(){
  return this.currentPage
}
setCurrentPage(page: number){
  this.currentPage = page
  this.getPage()
}


  nextPag(){
    if(this.currentPage < this.lastPage){
      this.currentPage++
      this.getPage()
    }
  }

  getPage(){
    this.apiService.getMovies(this.currentPage).subscribe(
      {
        next: (data: any) => {
          console.log(data)
          this.movies = data.results
          this.emitMovies.emit(this.movies)
        },
        error: err => {
          console.log(err)
        }
      }
    )
  }

  prevPag(){
    if(this.currentPage > 1){
      this.currentPage--
      this.getPage()
    }
  }
}
