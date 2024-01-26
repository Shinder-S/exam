import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders
 } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private URLBase = 'https://api.themoviedb.org/3'
  private URLImage = 'https://image.tmdb.org/t/p/w500/{imagePath}'

  private URIGenderMovies = '/genre/movie/list'
  
  private URIMovie = '/movie'


  private URINowPlaying = '/now_playing'
  private URITrending = '/trending/movie/day'
  
  private URIMovieDetail = '/{movie_id}'

  private QPARAMPagination = 'page={pageNumber}'
  private QPARAMSearch = 'query={searchText}'
  private apikey = 'f3d681fd28f6a09c258003997e680346'
  constructor(private http: HttpClient) { }

  getURLImage(imagePath: string): string{
    return this.URLImage.replace('{imagePath}', imagePath)
  }
  // GET REQUESTS
  getGenderMovies(){
    return this.http.get(this.URLBase + this.URIGenderMovies)
  }
  getTrendingMovies(){
    
    return this.http.get(this.URLBase + this.URITrending + '?api_key=' + this.apikey + '&language=en-US')
  }
}
