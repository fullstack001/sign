<template>
  <div>
    <div class="shell">
      <div
        class="bar"
        :style="{
          width: (loadingPage * 100) / page + '%',
        }"
      ></div>
    </div>
    <div class="rendering-spinner" style="text-align: center">
      <div class="process_title">Your file is loading.</div>

      <img src="@/assets/img/805.gif" class="spinner" width="100px" alt="Spinner" />
      <div class="progress-des">
        Please wait until the file is loaded to make changes.
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["page", "loadingPage"],
};
</script>
<style scoped>
.shell {
  height: 5px;
  width: 79%;
  border: none;
  border-radius: 13px;
  padding: 0px;
  margin: auto;
  margin-top: 10px;
  position: absolute;
  left: 0;
  top: 52px;
  z-index: 11;
}

.bar {
  background: linear-gradient(to right, #0000ff, #0000ff);
  height: 5px;
  width: 15px;
  border-radius: 9px;
  max-width: 100% !important;
}
.progress-logo {
  margin-top: 30px;
}
.process_title {
  font-size: 32px;
  font-weight: 600;
  margin: 20px;
  margin-top: 80px;
}
.spinner {
  margin-bottom: 30px;
}
.progress-des {
  font-size: 25px;
  font-weight: 500;
}
@media (max-width: 640px) {
  .progress-des {
    font-size: 20px;
    font-weight: 500;
  }
}
</style>
