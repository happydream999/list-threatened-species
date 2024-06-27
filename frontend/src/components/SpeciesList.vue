<template>
  <div class="species-list-container">
    <div class="button-container">
      <button class="btn" @click="showAll">Show All</button>
      <button class="btn" @click="filterCR">Show Critically Endangered</button>
      <button class="btn" @click="filterMM">Show Mammals</button>
    </div>
    <ul class="species-list">
      <li v-for="species in speciesList" :key="species.taxonid" class="species-item">
        {{ species.scientific_name }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Species } from '@/types';

export default defineComponent({
  name: 'SpeciesList',
  props: {
    speciesList: {
      type: Array as PropType<Species[]>,
      required: true,
    },
  },
  emits: ['show-all', 'filter-cr', 'filter-mm'],
  methods: {
    showAll() {
      this.$emit('show-all');
    },
    filterCR() {
      this.$emit('filter-cr');
    },
    filterMM() {
      this.$emit('filter-mm');
    },
  },
});
</script>

<style scoped>
.species-list-container {
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.button-container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.btn {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn:hover {
  background-color: #0056b3;
}

.species-list {
  list-style-type: none;
  padding: 0;
}

.species-item {
  padding: 10px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 10px;
  transition: transform 0.3s;
}

.species-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
