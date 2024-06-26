<template>
  <div>
    <h2>Species List</h2>
    <div class="filter-buttons">
      <button @click="showAllSpecies">Show All</button>
      <button @click="showCRSpecies">Show Critically Endangered (CR)</button>
    </div>
    <ul class="species-list">
      <li v-for="species in filteredSpeciesList" :key="species.taxonid">
        {{ species.scientific_name }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';

export default defineComponent({
  name: 'SpeciesList',
  props: {
    speciesList: {
      type: Array as PropType<Array<{ taxonid: string; scientific_name: string; category: string }>>,
      required: true,
    },
  },
  setup(props) {
    const filteredSpeciesList = ref(props.speciesList);

    const showAllSpecies = () => {
      filteredSpeciesList.value = props.speciesList;
    };

    const showCRSpecies = () => {
      filteredSpeciesList.value = props.speciesList.filter(species => species.category === "CR");
    };

    return {
      filteredSpeciesList,
      showAllSpecies,
      showCRSpecies,
    };
  },
});
</script>

<style scoped>
.filter-buttons {
  margin-bottom: 20px;
}

.filter-buttons button {
  margin-right: 10px;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.filter-buttons button:hover {
  background-color: #0056b3;
}

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