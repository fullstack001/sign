<template>
  <modal title="Set your signature details" @apply_sign="apply_date">
    <div slot="body">
      <h1 class="mb-2">Edit text</h1>
      <input class="mt-3" type="text" v-model="text" @input="changeData" />
    </div>
  </modal>
</template>

<script>
import modal from "@/components/Modal.vue";

export default {
  components: {
    modal,
  },
  props: ["textProps"],
  data() {
    return {
      text: this.textProps,
    };
  },
  created() {
    this.text = this.textProps;
  },

  methods: {
    apply_date() {
      console.log(this.text);
      this.$emit("close", this.text);
    },
    changeData() {
      if (this.text.length > 20) {
        this.text = this.text.slice(0, 20); // Limiting text length to 10 characters
      }
    },
  },
};
</script>

<style scoped>
.modal-header {
  display: none;
}
.modal-content {
  min-width: 760px;
  min-height: 250px;
}
input {
  width: 100%;
  height: 41px;
  font-size: 20px;
  padding: 10px;
  border-radius: 5px;
}
</style>
