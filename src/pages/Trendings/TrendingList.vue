<template>
  <div>
    <h2>Lista dos filmes mais populares</h2>
    <section id="period" class="radio-group">
      <input type="radio" name="period" value="day" v-model="period"  @change="fetchTrendingMovies"/> Dia
      <input type="radio" name="period" value="week" v-model="period" @change="fetchTrendingMovies"/>Semana
    </section>
    <section class="error-show">
      <div class="error-show-text" v-if="movies.length === 0 && !loading">
        <h2>Nenhum filme encontrado</h2>
      </div>
    </section>
    <section class="show-movies" v-if="!loading">
      <div v-for="movie in movies" :key="movie.id">
        <div class="card-movie">
          <div class="card-movie-image">
            <img :src="`https://image.tmdb.org/t/p/w200/${movie.poster_path}`" alt="movie.title" />
          </div>
          <div class="card-movie-title">
          {{ movie.name || movie.title || movie.original_name }} 
          </div>
          <div class="card-movie-count-average">
            Avaliação média: {{ movie.vote_average }}
          </div>
          <div class="card-movie-date">
            Data de lançamento: {{ formatDataToPTBR(movie.release_date) || 'N/A' }}
          </div>
        </div>
      </div>
    </section>
    <section class="loading" v-else>
      <h2>Carregando...</h2>
    </section>
    <section class="pagination">
      <label class="pagination-text">Página {{ currentPage }} de {{ totalPages }}</label>
      <button class="pagination-last" @click="removePage">Anterior</button>
      <button class="pagination-next" @click="addPage">Próximo</button>
    </section>
  </div>
</template>
<script lang="ts" setup>
import { useMoviesStore } from '@/store/movies';
import { computed, onBeforeMount, ref } from 'vue';

  const moviesStore = useMoviesStore();
  const period = ref('day');
  const movies = computed(() => moviesStore.movies);
  const loading = computed(() => moviesStore.loading);
  const totalPages = computed(() => moviesStore.total_pages);
  const currentPage = computed(() => moviesStore.currentPage);
  const page = ref(1);

  const formatDataToPTBR = (date: string) => {
    if(!date) return '';
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
  }

  const addPage = () => {
    if (page.value < totalPages.value) {
      page.value++;
      fetchTrendingMovies();
    }
  }

  const removePage = () => {
    if (page.value > 1) {
      page.value--;
      fetchTrendingMovies();
    }
  }
  const fetchTrendingMovies = () => moviesStore.fetchTrendingMovies(period.value, page.value);
  onBeforeMount(() => fetchTrendingMovies());

</script>
<style scoped>
.radio-group {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
}
.radio-group input {
  margin: 0 5px;
}
.show-movies {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
  margin-bottom: 50px;
}
.card-movie {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
}
.card-movie-image {
  display: flex;
  justify-content: center;
  align-items: center;
}
.card-movie-image img {
  width: 100%;
  height: 100%;
  border-radius: 5px;
}
.card-movie-title {
  margin-top: 10px;
  font-weight: bold;
  text-align: center;
}


.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
}

.pagination-text {
  margin: 0 20px;
}

.pagination-last {
  margin-right: 20px;
}

.pagination-next {
  margin-left: 20px;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
