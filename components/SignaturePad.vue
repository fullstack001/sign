<!-- components/SignaturePad.vue -->
<template>
  <div style="margin-top: 50px">
    <canvas class="sin" ref="canvas"></canvas>
  </div>
</template>

<script>
import SignaturePad from "signature_pad";

export default {
  mounted() {
    // Get canvas element
    const canvas = this.$refs.canvas;

    // Set canvas width and height
    canvas.width = this.width;
    canvas.height = this.height;

    // Create SignaturePad instance
    this.signaturePad = new SignaturePad(canvas, {
      backgroundColor: "rgba(0,0,0,0)",
    });
  },
  props: {
    width: {
      type: Number,
      default: 600, // Default width
    },
    height: {
      type: Number,
      default: 100, // Default height
    },
  },
  methods: {
    updateColor(newColor) {
      if (this.signaturePad) {
        this.signaturePad.penColor = newColor;
      }
    },
    clear() {
      this.signaturePad.clear();
    },
    getAllStrokes() {
      // Create a temporary canvas element
      const tempCanvas = document.createElement("canvas");
      const tempCtx = tempCanvas.getContext("2d");

      // Set the temporary canvas size to the maximum desired width
      const maxWidth = 150;
      const scaleFactor = maxWidth / this.$refs.canvas.width;
      tempCanvas.width = maxWidth;
      tempCanvas.height = this.$refs.canvas.height * scaleFactor;

      // Draw the signature onto the temporary canvas with the scaled size
      tempCtx.drawImage(
        this.$refs.canvas,
        0,
        0,
        tempCanvas.width,
        tempCanvas.height
      );

      // Convert the temporary canvas to a data URL
      return tempCanvas.toDataURL("image/png");
    },
  },
};
</script>
<style scoped>
.sin {
  background-color: #f5f5fa;
  width: 100%;
  max-width: 100%;
  height: auto;
}

@media (max-width: 768px) {
  .sin {
    max-width: 100%;
  }
}

@media (max-width: 480px) {
  .sin {
    max-width: 100%;
  }
}
</style>
