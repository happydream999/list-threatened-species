<template>
  <div>
    <h2>Species List</h2>
    <ul>
      <li v-for="species in speciesList" :key="species.identifier">
        {{ species.name }}
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
      type: Array as PropType<Array<{ name: string; identifier: string }>>,
      required: true,
    },
  },
});
</script>
