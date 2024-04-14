<template>
  <div :class="`dynamic-rating dynamic-rating--${variant}`">
    <section class="dynamic-rating__info">
      <h3 class="dynamic-rating__average-title">Average Score</h3>
      <section class="dynamic-rating__average-score">
        <img
          v-if="benchmarkScore > averageScore"
          class="dynamic-rating__average-arrows"
          src="./assets/arrows-down.svg"
        />
        <img
          v-else
          class="dynamic-rating__average-arrows"
          src="./assets/arrows-up.svg"
        />
        <div class="dynamic-rating__average-score-container">
          <div class="dynamic-rating__average-counter">
            <div class="dynamic-rating__average-counter-wrapper">
              <span class="dynamic-rating__average-counter-number">0</span>
              <span
                class="dynamic-rating__average-counter-number"
                v-for="number in averageCounter"
                :key="number"
              >
                {{ number }}
              </span>
            </div>
          </div>
          <div class="dynamic-rating__average-total">/{{ maxValue }}</div>
        </div>
      </section>
      <div class="dynamic-rating__benchmark-score-container">
        Benchmark
        <div class="dynamic-rating__benchmark-score-container-counter">
          <div class="dynamic-rating__benchmark-counter">
            <div class="dynamic-rating__benchmark-counter-wrapper">
              <span class="dynamic-rating__benchmark-counter-number">0</span>
              <span
                class="dynamic-rating__benchmark-counter-number"
                v-for="number in benchmarkCounter"
                :key="number"
              >
                {{ number }}
              </span>
            </div>
          </div>
          <div class="dynamic-rating__benchmark-total">/{{ maxValue }}</div>
        </div>
      </div>
    </section>
    <svg
      class="dynamic-rating__average-rating"
      viewBox="-1 -1 34 34"
    >
      <circle
        cx="16"
        cy="16"
        r="16"
        class="dynamic-rating__average-rating-background"
      />
      <circle
        cx="16"
        cy="16"
        r="16"
        class="dynamic-rating__average-rating-progress"
        :style="{
          stroke: averageColor ?? '',
          strokeDashoffset: averageScore ? 100 - averageScore * maxValue : 100,
        }"
      />
    </svg>
    <svg
      class="dynamic-rating__benchmark-rating"
      viewBox="-1 -1 34 34"
    >
      <circle
        cx="16"
        cy="16"
        r="16"
        class="dynamic-rating__benchmark-rating-background"
      />
      <circle
        cx="16"
        cy="16"
        r="16"
        class="dynamic-rating__benchmark-rating-progress"
        :style="{
          stroke: benchmarkColor ?? '',
          strokeDashoffset: benchmarkScore
            ? 100 - benchmarkScore * maxValue
            : 100,
        }"
      />
    </svg>
  </div>
</template>

<script>
import { computed, watch, ref } from "vue"

export default {
  name: "DynamicRating",
  props: {
    averageScore: {
      default: 0,
      variant: Number,
      required: true,
    },
    benchmarkScore: {
      default: 0,
      variant: Number,
      required: true,
    },
    variant: "green" | "blue" | "lilac" | "pink" | "yellow",
    averageColor: {
      default: undefined,
      variant: String,
    },
    benchmarkColor: {
      default: undefined,
      variant: String,
    },
  },
  setup(props) {
    const scoreToFixed = (score, numberOfDecimals = 0) => {
      const scoreRounded = Number.isInteger(score)
        ? score
        : score.toFixed(numberOfDecimals)
      return scoreRounded <= 10 ? scoreRounded : 10
    }

    const counter = (num) => {
      const arr = []
      for (let i = 1; i <= num; i++) {
        arr.push(i)
      }
      return arr
    }

    const averageScore = ref(0)
    const benchmarkScore = ref(0)
    const averageCounter = computed(() => counter(averageScore.value))
    const benchmarkCounter = computed(() => counter(benchmarkScore.value))
    setTimeout(() => {
      averageScore.value = scoreToFixed(props.averageScore)
      benchmarkScore.value = scoreToFixed(props.benchmarkScore)
    }, 500)

    // Watchers
    watch(
      () => props.averageScore,
      (newValue) => {
        averageScore.value = scoreToFixed(newValue)
      }
    )
    watch(
      () => props.benchmarkScore,
      (newValue) => {
        benchmarkScore.value = scoreToFixed(newValue)
      }
    )

    return {
      averageScore,
      averageCounter,
      benchmarkScore,
      benchmarkCounter,
      maxValue: 10,
    }
  },
  // mounted(props) {
  //   const scoreToFixed = (score, numberOfDecimals = 0) => {
  //     const scoreRounded = Number.isInteger(score)
  //       ? score
  //       : score.toFixed(numberOfDecimals)
  //     return scoreRounded <= 10 ? scoreRounded : 10
  //   }
  //   this.$set(this, "averageScore", 6)
  // },
}
</script>

<style src="./style.css"></style>
