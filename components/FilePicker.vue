<template>
  <div class="file-selector">
    <button class="md-icon-button gdrive_btn" @click="open_add_local()">
      <i class="fa fa-laptop" style="font-size: 16px !important"></i>
      <md-tooltip md-direction="right">
        {{ $t("toolTip.upload_local") }}
      </md-tooltip>
    </button>
  </div>
</template>

<script>
export default {
  name: "FileAttachment",
  props: [],
  data() {
    return {};
  },

  methods: {
    open_add_local() {
      this.$emit("open_add_local");
    },
  },
};
</script>

<style scoped>
.gdrive_btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: solid 2px #0000ff;

  cursor: pointer;
  background-color: #fefefe;
}

.gdrive_btn i {
  color: #000 !important;
}

.gdrive_btn:hover {
  background-color: #0000ff;
}
</style>
