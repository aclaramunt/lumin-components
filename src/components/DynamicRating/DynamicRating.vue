<template>
  <div
    ref="graph"
    :class="`dynamic-rating ${variant ? `dynamic-rating--${variant}` : ''}`"
  >
    <section class="dynamic-rating__info">
      <h3 class="dynamic-rating__average-title">Average Score</h3>
      <section class="dynamic-rating__average-score">
        <div class="dynamic-rating__average-arrows">
          <img
            :style="{
              transform:
                benchmarkScore && averageScore && benchmarkScore > averageScore
                  ? 'translateY(0)'
                  : '',
              opacity:
                benchmarkScore && averageScore && benchmarkScore > averageScore
                  ? '1'
                  : '0',
            }"
            class="dynamic-rating__average-arrows-arrow dynamic-rating__average-arrows-arrow-down"
            src="./assets/arrows-down.svg"
          />
          <img
            :style="{
              transform:
                benchmarkScore && averageScore && benchmarkScore <= averageScore
                  ? 'translateY(0)'
                  : '',
              opacity:
                benchmarkScore && averageScore && benchmarkScore <= averageScore
                  ? '1'
                  : '0',
            }"
            class="dynamic-rating__average-arrows-arrow dynamic-rating__average-arrows-arrow-up"
            src="./assets/arrows-up.svg"
          />
        </div>
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
              <span class="dynamic-rating__average-counter-number">{{
                averageScore
              }}</span>
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
              <span class="dynamic-rating__benchmark-counter-number">{{
                benchmarkScore
              }}</span>
            </div>
          </div>
          <div class="dynamic-rating__benchmark-total">/{{ maxValue }}</div>
        </div>
      </div>
    </section>
    <div class="dynamic-rating__graphs">
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
            strokeDashoffset: averageProgress
              ? 100 - averageProgress * maxValue
              : 100,
          }"
        />
      </svg>
      <div class="dynamic-rating__benchmark-rating-parent">
        <svg
          class="dynamic-rating__benchmark-rating"
          viewBox="-1 -1 34 34"
          style=""
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
    </div>
    <button
      class="dynamic-rating__download-button"
      @click="downloadGraph"
    >
      <svg
        class="w-6 h-6 text-gray-800 dark:text-white"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 13V4M7 14H5a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-2m-1-5-4 5-4-5m9 8h.01"
        />
      </svg>
    </button>
  </div>
</template>

<script>
import { computed, watch, ref } from 'vue'
import html2canvas from 'html2canvas'

export default {
  name: 'DynamicRating',
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
    variant: 'green' | 'blue' | 'lilac' | 'pink' | 'yellow',
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
      let scoreRounded = score.toFixed(numberOfDecimals)
      console.log({ scoreRounded, score }, scoreRounded % 1)
      if (scoreRounded % 1 == 0) {
        scoreRounded = parseInt(scoreRounded)
      }
      return scoreRounded <= 10 ? scoreRounded : 10
    }

    const counter = (num) => {
      const arr = []
      for (let i = 1; i < num; i++) {
        arr.push(i)
      }
      return arr
    }

    const averageScore = ref(0)
    const benchmarkScore = ref(0)
    const averageProgress = ref(0)
    const averageCounter = computed(() => counter(averageScore.value))
    const benchmarkCounter = computed(() => counter(benchmarkScore.value))

    setTimeout(() => {
      averageScore.value = scoreToFixed(props.averageScore, 1)
      averageProgress.value = props.averageScore
      benchmarkScore.value = scoreToFixed(props.benchmarkScore, 1)
    }, 500)

    // Watchers
    watch(
      () => props.averageScore,
      (newValue) => {
        averageScore.value = scoreToFixed(newValue, 1)
        averageProgress.value = scoreToFixed(newValue, 1)
      }
    )
    watch(
      () => props.benchmarkScore,
      (newValue) => {
        benchmarkScore.value = scoreToFixed(newValue, 1)
      }
    )

    return {
      averageScore,
      averageProgress,
      averageCounter,
      benchmarkScore,
      benchmarkCounter,
      maxValue: 10,
    }
  },
  methods: {
    downloadGraph() {
      // Delete hidden numbers to create image correctly
      const averageNumbers = document.querySelectorAll(
        '.dynamic-rating__average-counter-number'
      )
      const benchmarkNumbers = document.querySelectorAll(
        '.dynamic-rating__benchmark-counter-number'
      )
      Array.from(averageNumbers)?.map((number, index) => {
        if (index + 1 < averageNumbers.length) {
          number.remove()
        }
      })
      Array.from(benchmarkNumbers)?.map((number, index) => {
        if (index + 1 < benchmarkNumbers.length) {
          number.remove()
        }
      })

      html2canvas(this.$refs.graph).then((canvas) => {
        console.log({ canvas })
        const url = canvas.toDataURL()
        const a = document.createElement('a')
        a.href = url
        a.download = `rating-average-${this.averageScore}-benchmark-${this.benchmarkScore}.png`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
      })
    },
  },
}
</script>

<style src="./style.css"></style>
