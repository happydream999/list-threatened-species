<template>
  <div>
    <h2>Select a Region</h2>
    <ul>
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
