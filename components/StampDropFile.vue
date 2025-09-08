<template>
  <div class="stamp-area">
    <div
      class="stamp-dropzone-container"
      @dragover="dragover"
      @dragleave="dragleave"
      @drop="drop"
      :style="
        () => {
          isDragging && 'border-color: green;';
          !img && 'padding:4rem';
        }
      "
    >
      <input
        type="file"
        :name="data"
        :id="data"
        hidden
        @change="onChange"
        ref="file1"
        accept=".jpg,.jpeg,.png"
      />

      <label :for="data" class="file-label" v-if="!img">
        <div v-if="isDragging">Release to drop files here.</div>
        <div v-else>Drop files here or <u>click here</u> to upload.</div>
      </label>
      <div class="stamp-preview-container" v-if="img">
        <img
          class="stamp-preview-img"
          :src="generateURL(img)"
          width="100"
          alt="Stamp"
        />
        <div class="stamp-remove-btn" @click="remove" title="Remove file">
          <i class="fa fa-trash"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import resizeImage from "@/services/reSizeImage";

export default {
  data() {
    return {
      isDragging: false,
      img: null,
      originalImg: null,
      resizeImage: null,
    };
  },
  props: ["data"],
  methods: {
    async onChange() {
      this.img = document.getElementById(this.data).files[0];
      this.fileName = this.img.name;

      const reader = new FileReader();
      reader.onload = (e) => (this.originalImg = e.target.result);
      reader.readAsDataURL(this.img); // convert to base64 string
      // END: preview original

      // START: preview resized
      await resizeImage({ file: this.img, maxSize: 150 })
        .then((resizedImage) => {
          // this.resizedImg = URL.createObjectURL(resizedImage);
          this.resizeImg = resizedImage;
          this.$emit("set_stamp", this.resizeImg);
        })
        .catch((err) => {
          console.error(err);
        });
      // END: preview resized
    },
    dragover(e) {
      e.preventDefault();
      this.isDragging = true;
    },
    dragleave() {
      this.isDragging = false;
    },
    drop(e) {
      e.preventDefault();
      this.$refs.file1.files = e.dataTransfer.files;
      this.isDragging = false;
    },
    remove() {
      this.img = null;
      this.$emit("set_stamp", null);
    },
    generateURL(file) {
      let fileSrc = URL.createObjectURL(file);
      setTimeout(() => {
        URL.revokeObjectURL(fileSrc);
      }, 1000);
      return fileSrc;
    },
  },
};
</script>
<style scoped>
.stamp-area {
  background-color: #e2d5d5;
  margin: 25px;
  text-align: center;
}
.file-label {
  font-size: 20px;
  display: block;
  cursor: pointer;
  margin-top: 80px;
}
.stamp-dropzone-container {
  padding: 30px;
  position: relative;
}
.stamp-remove-btn {
  position: absolute;
  right: 30px;
  top: 30px;
  font-size: 18px;
  cursor: pointer;
}
.stamp-remove-btn:hover {
  color: #f00;
}
.stamp-preview-container {
  height: 200px;
}
.stamp-preview-img {
  position: absolute;
  bottom: 80px;
  right: 328px;
}
</style>
