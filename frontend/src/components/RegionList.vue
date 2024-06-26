<template>
  <div>
    <h2>Select a Region</h2>
    <ul class="region-list">
      <li v-for="region in regions" :key="region.identifier" @click="selectRegion(region.identifier)">
        {{ region.name }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { fetchRegions } from '../services/iucnApiService';

export default defineComponent({
  name: 'RegionList',
  emits: ['regionSelected'],
  setup(_, { emit }) {
    const regions = ref<Array<{ name: string; identifier: string }>>([]);
    console.log(regions)

    const selectRegion = (region: string) => {
      emit('regionSelected', region);
    };

    onMounted(async () => {
      regions.value = await fetchRegions();
    });

    return { regions, selectRegion };
  },
});
</script>

<style scoped>
.region-list li {
  padding: 10px;
  margin: 5px 0;
  background-color: #e9e9e9;
  border-radius: 4px;
  transition: background-color 0.3s ease;
  cursor: pointer;
}

.region-list li:hover {
  background-color: #d1d1d1;
}
</style>