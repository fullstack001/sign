<template>
  <div style="display: inline-flex">
    <client-only>
      <radial-progress-bar
        :diameter="120"
        :completed-steps="disRate"
        :total-steps="100"
        :startColor="'#0000ff'"
        :stopColor="'#0000ff'"
        :innerStrokeColor="'white'"
        :stroke-width="10"
        :inner-stroke-width="10"
        style="margin: auto"
      >
        <h3>
          <b>{{ disRate }} %</b>
        </h3>
        <h5 style="margin-top: -20px !important; margin-bottom: 20px">
          <b>Saved</b>
        </h5>
      </radial-progress-bar></client-only
    >
    <div class="chart_detail">
      <div class="chart_detail_text">
        Your PDF are now {{ disRate }}% smaller!
      </div>
      <div class="chart_detail_size">
        {{
          originSize > 1024
            ? (originSize / 1024).toFixed(2) + " MB"
            : originSize + "KB"
        }}
        &rarr;
        {{
          resultSize > 1024
            ? (resultSize / 1024).toFixed(2) + " MB"
            : resultSize + "KB"
        }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: ["resultSize", "originSize"],
  data() {
    return {
      completedSteps: 0,
      rate: 0,
      disRate: 0,
    };
  },
  created() {
    this.rate = (
      ((this.originSize - this.resultSize) / this.originSize) *
      100
    ).toFixed(0);
    this.setStep();
  },
  mounted() {},
  methods: {
    setStep() {
      let intervalId = setInterval(() => {
        this.completedSteps = this.completedSteps + 1;
        this.disRate = this.completedSteps > 95 ? 95 : this.completedSteps;
        if (this.completedSteps >= this.rate) {
          clearInterval(intervalId);
        }
      }, 10);
    },
  },
};
</script>
<style scoped>
.chart_detail {
  margin-top: auto;
  margin-bottom: auto;
  margin-left: 20px;
  font-size: 18px;
}
.chart_detail_text {
  font-weight: 500;
}
.chart_detail_size {
  font-weight: 700;
  text-align: left;
  margin-top: 10px;
}
</style>
