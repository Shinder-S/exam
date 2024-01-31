import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '@/services/api.service';

interface sliderCarousel {
  imageSrc: string;
  imageAlt: string;
}
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

  getSlides(){
    return this.trendingMovies.map((movie: any)=>{
      return {
        imageSrc: `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`,
        imageAlt: movie.original_title
      }
    })
  }

  nextSlide() { 
    this.slideIndex++;
    console.log('entro a next' + this.slideIndex)
    this.slideToCurrent()
  }

  prevSlide() {
    this.slideIndex--;
    this.slideToCurrent()
  }

  onScroll() {
    const slideWidth = this.sliderContainer.nativeElement.offsetWidth;
    const scrollLeft = this.sliderContainer.nativeElement.scrollLeft;
    const maxScroll = this.sliderContainer.nativeElement.scrollWidth - slideWidth;
    if (scrollLeft === maxScroll) {
      this.nextSlide();
    }
  }
}
