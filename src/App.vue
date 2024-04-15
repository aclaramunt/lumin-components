<template>
  <dynamic-rating
    :averageScore="5"
    :benchmarkScore="4"
  ></dynamic-rating>
</template>

<script>
import DynamicRating from "./components/DynamicRating/DynamicRating.vue"

export default {
  components: { DynamicRating },
  name: "App",
}
</script>
