<template>
  <div>
    <h2>Species List</h2>
    <ul class="species-list">
      <li v-for="species in speciesList" :key="species.taxonid">
        {{ species.scientific_name }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'SpeciesList',
  props: {
    speciesList: {
      type: Array as PropType<Array<{ taxonid: string; scientific_name: string }>>,
      required: true,
    },
  },
});
</script>

<style scoped>
.species-list li {
  padding: 10px;
  margin: 5px 0;
  background-color: #e9e9e9;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.species-list li:hover {
  background-color: #d1d1d1;
}
</style>