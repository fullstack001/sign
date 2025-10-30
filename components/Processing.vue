<template>
  <div class="process">
    <img
      src="@/assets/img/vue-logo.png"
      class="progress-logo"
      width="200px"
      alt="Spinner"
    />
    <div class="process_title">{{ progress }} PDFs...</div>

    <!-- <img src="@/assets/img/Fidget-spinner.gif" class="spinner" width="150px" />
    <img src="@/assets/img/Skype loader.gif" class="spinner" width="150px" />
    <img src="@/assets/img/Spinner-3.gif" class="spinner" width="150px" /> -->
    <img src="@/assets/img/805.gif" class="spinner" width="100px" alt="Spinner" />
    <div class="progress-des">
      {{
        text
          ? text
          : "Do not close your browser. Wait until your files are uploaded and processed! This may take a few moments."
      }}
    </div>
  </div>
</template>
<script>
export default {
  props: ["progress", "text"],
};
</script>
<style scoped>
.process {
  background: #fefefe;
  width: 100%;
  height: 100vh;
  margin: auto;
  text-align: center;
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
  padding: 0 20px;
}

@media (max-width: 1024px) {
  .process_title {
    font-size: 28px;
    margin-top: 60px;
  }
  .progress-des {
    font-size: 22px;
  }
}

@media (max-width: 768px) {
  .process_title {
    font-size: 24px;
    margin-top: 40px;
  }
  .progress-des {
    font-size: 20px;
    font-weight: 500;
  }
  .spinner {
    width: 80px !important;
  }
  .progress-logo {
    width: 150px !important;
  }
}

@media (max-width: 640px) {
  .progress-des {
    font-size: 18px;
    font-weight: 500;
  }
  .process_title {
    font-size: 22px;
    margin-top: 30px;
  }
  .spinner {
    width: 60px !important;
  }
}

@media (max-width: 480px) {
  .process_title {
    font-size: 18px;
    margin: 15px;
    margin-top: 20px;
  }
  .progress-des {
    font-size: 16px;
    padding: 0 15px;
  }
  .spinner {
    width: 50px !important;
  }
  .progress-logo {
    width: 120px !important;
    margin-top: 20px;
  }
}
</style>
