import { defineStore } from "pinia";

const apiKey = import.meta.env.VITE_API_KEY;
export const useMoviesStore = defineStore({
  id: "movies",
  state: () => ({
    movies: [],
    loading: false,
    total_pages: 0,
    currentPage: 0
  }),
  getters: {
    getMovies(state) {
      return state.movies;
    },
    getLoading(state) {
      return state.loading;
    },
    getTotalPages(state) {
      return state.total_pages;
    },
    getCurrentPage(state) {
      return state.currentPage;
    }
  },
  actions: {
    async fetchTrendingMovies(period: string = 'day', page: number = 1) {
      this.loading = true;
      const response = await fetch(
        `https://api.themoviedb.org/3/trending/all/${period}?api_key=${apiKey}&language=pt-BR&page=${page}`
      );
      const data = await response.json();
      if (data.results) {
      this.movies = data.results;
      this.total_pages = data.total_pages;
      this.currentPage = data.page;
      } else {
        if (data.status_code === 7) {
          alert('Verifique se a sua chave de API está correta.');
        }
        this.movies = [];
        this.total_pages = 0;
        this.currentPage = 0;
      }
      this.loading = false;
    }
  }
});