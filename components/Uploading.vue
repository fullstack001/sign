<template>
  <div class="uploading">
    <img
      src="@/assets/img/vue-logo.png"
      class="progress-logo"
      width="200px"
      alt="Spinner"
    />
    <div class="process_title">Uploading file {{ number }} of {{ total }}</div>
    <div class="file-name">
      {{ file_name }} (
      {{
        size > 1000000
          ? (size / 1024000).toFixed(2) + "MB"
          : (size / 1024).toFixed(2) + "KB"
      }}
      )
    </div>

    <div class="shell">
      <div class="bar" :style="{ width: progress + '%' }"></div>
    </div>

    <div class="progress-des">{{ progress }} %</div>
    <div class="uploaded">Uploaded</div>
  </div>
</template>
<script>
export default {
  props: ["progress", "number", "total", "size", "file_name"],
};
</script>
<style scoped>
.uploading {
  background: #fefefe;
  width: 100%;
  height: 100vh;
  margin: auto;
  text-align: center;
}
.progress-logo {
  margin-top: 30px;
}
.shell {
  height: 20px;
  width: 500px;
  border: 1px solid #aaa;
  border-radius: 13px;
  padding: 0px;
  margin: auto;
  margin-top: 10px;
}

.bar {
  background: linear-gradient(to right, #0000ff, #0000ff);
  height: 20px;
  width: 15px;
  border-radius: 9px;
}
.process_title {
  font-size: 32px;
  font-weight: 600;
  margin: 20px;
  margin-top: 80px;
}

.file-name {
  font-size: 20px;
  font-weight: 500;
  padding: 0 20px;
}
.progress-des {
  font-size: 43px;
  font-weight: 600;
  margin: 20px 0;
}
.uploaded {
  font-size: 25px;
  font-weight: 500;
}

@media (max-width: 1024px) {
  .shell {
    width: 80%;
  }
  .process_title {
    font-size: 28px;
    margin-top: 60px;
  }
  .progress-des {
    font-size: 36px;
  }
  .uploaded {
    font-size: 22px;
  }
}

@media (max-width: 768px) {
  .shell {
    width: 85%;
  }
  .process_title {
    font-size: 24px;
    margin-top: 40px;
  }
  .progress-des {
    font-size: 32px;
  }
  .uploaded {
    font-size: 20px;
  }
  .file-name {
    font-size: 18px;
  }
  .progress-logo {
    width: 150px !important;
  }
}

@media (max-width: 640px) {
  .shell {
    width: 90%;
    margin: auto;
  }
  .process_title {
    font-size: 22px;
    margin-top: 30px;
  }
  .progress-des {
    font-size: 28px;
  }
  .uploaded {
    font-size: 18px;
  }
  .file-name {
    font-size: 16px;
  }
}

@media (max-width: 480px) {
  .process_title {
    font-size: 18px;
    margin: 15px;
    margin-top: 20px;
  }
  .progress-des {
    font-size: 24px;
  }
  .uploaded {
    font-size: 16px;
  }
  .file-name {
    font-size: 14px;
  }
  .progress-logo {
    width: 120px !important;
    margin-top: 20px;
  }
}
</style>
