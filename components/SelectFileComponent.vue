<template>
  <div class="dropzone-container" @dragover.prevent @drop="handleDrop">
    <div class="upload_btn_area">
      <div class="upload-buttons">
        <h1 class="page-title">
          {{ title }}
        </h1>
        <h2 class="page-description">
          {{ description }}
        </h2>
        <div class="drop-area">
          <div class="drop-img">
            <img :src="featureImgUrl" alt="Select File" />
          </div>
          <div class="upload_btn">
            <div class="uploader__btn md-raised" @click="open_add_local">
              {{buttonText|| "Select PDF Files" }}
            </div>
            <div class="cloud-upload">
              <GDriveSelector
                @picked="onPickedGoogleDriver"
                :buttonStyle="'download'"
              />

              <VueDropboxPicker
                class="cloud-dropBox"
                link-type="direct"
                :buttonType="'chooser'"
                :multiselect="true"
                :extensions="['.pdf', '.doc']"
                :folderselect="false"
                style="margin-top: 5px"
                @picked="onPickedDropbox"
              />
            </div>
          </div>
          <div>
            {{dragText|| "Or Drop PDFs Here" }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import GDriveSelector from "./GDriveSelector.vue";
import VueDropboxPicker from "./DropboxPicker.vue";
export default {
  components: {
    GDriveSelector,
    VueDropboxPicker,
  },
  props: ["title", "description","buttonText","dragText", "featureImgUrl"],
  data() {
    return {
      isDragging: false,
    };
  },
  methods: {
    open_add_local() {
      this.$emit("open_add_local");
    },
    onPickedGoogleDriver(data) {
      this.$emit("onPickedGoogleDriver", data);
    },
    onPickedDropbox(data) {
      this.$emit("onPickedDropbox", data);
    },
    handleDrop(event) {
      event.preventDefault();
      const files = event.dataTransfer.files;
      this.$emit("handleFile", files);
    },
  },
};
</script>
<style scoped>
body {
  font-family: "Montserrat", sans-serif !important;
}
.dropzone-container {
  width: 100%;
  min-height: 89vh;
  padding: 1rem 0rem 0rem;
  text-align: center;
}
.upload_btn_area {
  position: relative;
  height: 82vh;
}

.page-title {  
  font-size: 42px;
  margin-top: 50px;
  line-height: 52px;
  text-align: center;
  color: #000000;
  font-weight: bold !important;
  font-family: "Montserrat", sans-serif !important;
  text-align: center;
}

.page-description {
  margin: 15px auto 0;
  line-height: 32px;
  font-size: 30px;
  color: #000000;
  font-weight: bold !important;
  font-family: "Montserrat", sans-serif !important;
  text-align: center;
}

.uploader__btn {
  cursor: pointer;
  align-items: center;
  padding: 24px 48px;
  font-size: 24px;
  background: #0000ff;
  color: #fff !important;
  margin-bottom: 12px;
  border-radius: 12px;
  cursor: pointer;
  font-weight: bold;
  font-size: 24px;
  line-height: 28px;
}
.drop-area {
  border-radius: 8px;
  border: 1px dotted #0000ff;
  width: 50%;
  margin: auto;
  padding: 50px 0;
  margin-top: 20px;
  background-color: #fffbf8;
}

.drop-img {
  width: 96px;
  margin: auto;
  margin-bottom: 30px;
}

.upload_btn {
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  text-align: center;
  margin: auto;
  position: relative;
  cursor: pointer;
  font-size: 22px;
  font-weight: 600;
  padding-left: 50px;
}
.cloud-dropBox {
  margin-left: 7px !important;
}
@media only screen and(max-width: 1026px) {
  .upload_btn_area {
    height: 88vh;
  }
  .dropzone-container {
    min-height: 91px;
  }
}

@media only screen and (max-width: 991px) {
  .dropzone-container {
    min-height: 55vh;
  }
  .upload_btn_area {
    height: 89vh;
  }

  .page-title {
    font-size: 25px;
    margin-top: 0px;
  }
  .page-description {
    font-size: 15px;
    line-height: 1.5;
    width: 95%;
    margin: auto;
  }
  .drop-area {
    width: 95%;
    margin-left: 8px !important;
    margin-right: 8px !important;
    padding: 20px;
  }
  .upload_btn {
    display: contents;
  }
  .drop-img {
    width: 60px;
    margin: auto;
    margin-bottom: 12px;
  }
  .cloud-upload {
    display: inline-flex;
    text-align: center;
  }
  .cloud-dropBox {
    margin-top: 0 !important;
  }
}

/* Additional Mobile Responsive Styles */
@media (max-width: 640px) {
  .page-title {
    font-size: 20px !important;
    margin-top: 10px;
  }
  
  .page-description {
    font-size: 14px !important;
    line-height: 1.4;
    margin: 10px auto 0;
  }
  
  .drop-area {
    width: 95%;
    padding: 30px 10px;
    margin: 15px auto 0;
  }
  
  .drop-img {
    width: 50px;
    margin-bottom: 20px;
  }
  
  .uploader__btn {
    padding: 15px 30px;
    font-size: 18px;
    margin-bottom: 10px;
  }
  
  .upload_btn {
    padding-left: 0;
    flex-direction: column;
    align-items: center;
  }
  
  .cloud-upload {
    flex-direction: column;
    gap: 10px;
  }
}

@media (max-width: 480px) {
  .page-title {
    font-size: 18px !important;
  }
  
  .page-description {
    font-size: 12px !important;
  }
  
  .drop-area {
    padding: 20px 5px;
  }
  
  .drop-img {
    width: 40px;
    margin-bottom: 15px;
  }
  
  .uploader__btn {
    padding: 12px 25px;
    font-size: 16px;
  }
}
</style>
