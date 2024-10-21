import { Component } from '@angular/core';
import { GiphyService } from '../../services/giphy.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  gifs: any[] = [];
  searchHistory: string[] = [];
  currentSearch: string = '';

  constructor(private giphyService: GiphyService) {
    this.loadSearchHistory();
  }

  onSearch() {
    if (!this.currentSearch.trim()) return;
  
    this.giphyService.searchGifs(this.currentSearch).subscribe(
      response => {
        console.log('API Response:', response); // Añadir este console.log
        this.gifs = response.data;
        this.addToSearchHistory(this.currentSearch);
      },
      error => {
        console.error('Error fetching GIFs:', error);
      }
    );
  }
  
  
  addToSearchHistory(search: string) {
    if (!this.searchHistory.includes(search)) {
      this.searchHistory.unshift(search);
      this.searchHistory = this.searchHistory.slice(0, 5); // Mantener solo las últimas 5 búsquedas
      localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory));
    }
  }

  loadSearchHistory() {
    const history = localStorage.getItem('searchHistory');
    if (history) {
      this.searchHistory = JSON.parse(history);
    }
  }

  searchFromHistory(search: string) {
    this.currentSearch = search;
    this.onSearch();
  }
  
}
