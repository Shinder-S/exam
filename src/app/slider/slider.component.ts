import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '@/services/api.service';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.less']
})
export class SliderComponent implements OnInit {
  @ViewChild('sliderContainer') sliderContainer!: ElementRef;
  trendingMovies: Array<any> = []
  selectedTrending: number = 0 
  slideIndex = 0; 
  constructor(
    private apiService: ApiService,
    ){ 
      this.sliderContainer = new ElementRef(null);
    }
    private slideToCurrent() {
      const slideWidth = this.sliderContainer.nativeElement.offsetWidth;
      this.sliderContainer.nativeElement.scrollLeft = this.slideIndex * slideWidth;
    }

  ngOnInit(): void {
    this.apiService.getTrendingMovies().subscribe(
      (res: any) => {
        console.log(res)
        this.trendingMovies = res.results
      },
      err => {
        console.log(err)
      }
    )
  }

  getDetails(){
    this.apiService.getMovies(this.trendingMovies[this.selectedTrending].id).subscribe(
      (res: any) => {
        console.log(res)
      },
      err => {
        console.log(err)
      }
    )
  }

  nextSlide() {
    this.slideIndex++;
    this.slideToCurrent();
  }

  prevSlide() {
    this.slideIndex--;
    this.slideToCurrent();
  }


}
