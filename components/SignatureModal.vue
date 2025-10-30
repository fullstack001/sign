<template>
  <modal title="Set your signature details" @apply_sign="apply_signature">
    <div slot="body">
      <form v-show="!get_signature">
        <div class="name-initial">
          <i class="fa-regular fa-circle-user user-icon"></i>
          <!-- Name -->
          <div
            class="form-item name-input"
            :class="{ errorInput: $v.name.$error }"
          >
            <label>Full Name: </label>
            <input
              v-model="name"
              :class="{ error: $v.name.$error }"
              @change="changeName"
              @input="getInit"
              placeholder="Your name"
            />
            <!-- <p class="errorText" v-if="!$v.name.required">Field is required!</p> -->
          </div>
          <!-- Email -->
          <div class="form-item">
            <label>Initials: </label>
            <input v-model="init_name" placeholder="Your initials" />
          </div>
        </div>
      </form>
      <div v-show="get_signature">
        <img
          src="@/assets/img/805.gif"
          class="spinner"
          width="80px"
          alt="Spinner"
        />
      </div>
      <div class="tab-container tabs">
        <div class="tab">
          <input
            type="radio"
            name="css-tabs"
            id="tab-1"
            checked
            class="tab-switch"
          />
          <label for="tab-1" class="tab-label">
            <i class="fa-solid fa-pencil"></i>
            Signature
          </label>
          <div class="tab-content">
            <SinatureTabComponent
              :name="name"
              :get_sign="get_signature"
              @set_sign="set_signature"
            />
          </div>
        </div>
        <div class="tab">
          <input type="radio" name="css-tabs" id="tab-2" class="tab-switch" />
          <label for="tab-2" class="tab-label">
            <i class="fa-solid fa-spell-check"></i>
            Initial
          </label>
          <div class="tab-content">
            <InitTabComponent
              :name="init_name"
              :get_init="get_signature"
              @set_init="set_initials"
            />
          </div>
        </div>
        <div class="tab">
          <input type="radio" name="css-tabs" id="tab-3" class="tab-switch" />
          <label for="tab-3" class="tab-label">
            <i class="fa-solid fa-stamp"></i>
            Company Stamp
          </label>
          <div class="tab-content">
            <StampDropFile
              :get_stamp="get_signature"
              :data="'stamp_img'"
              @set_stamp="set_stamp"
            />
          </div>
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
import StampDropFile from "./StampDropFile.vue";
import { required } from "vuelidate/lib/validators";
import modal from "./Modal.vue";
import SinatureTabComponent from "./SinatureTabComponent.vue";
import InitTabComponent from "./InitTabComponent.vue";
import convert from "@/services/convertTextToImg.js";

export default {
  components: {
    StampDropFile,
    modal,
    SinatureTabComponent,
    InitTabComponent,
  },
  props: ["nameProps"],
  created() {
    if (this.nameProps) {
      this.name = this.nameProps;
      this.getInit();
    }
  },
  data() {
    return {
      name: "",
      init_name: "",
      repeatPassword: "",
      sign_picked_family: "Reenie Beanie",
      init_picked_family: false,
      font_families: [
        "Reenie Beanie",
        "Satisfy",
        "Zeyada",
        "Shadows Into Light",
        "Alex Brush",
        "Allura",
        "Handlee",
        "Kristi",
        "La Belle Aurore",
        "Marck Script",
      ],
      get_signature: false,
      sign_png: null,
      init_png: null,
      stamp_png: null,
    };
  },
  watch: {
    async sign_png(newValue) {
      if (newValue != null) {
        const name_img = await convert(this.name);

        const data = {
          sign: this.sign_png,
          init: this.init_png,
          stamp: this.stamp_png,
          name: name_img,
          name_text: this.name,
        };
        this.$emit("close", data);
      }
    },
  },
  validations: {
    name: {
      required,
    },
  },
  methods: {
    set_signature(data) {
      this.sign_png = data;
    },
    set_initials(data) {
      this.init_png = data;
    },
    set_stamp(data) {
      this.stamp_png = data;
    },
    getInit() {
      const name = this.name;
      let temp = name.split(" ");
      let init_name = "";
      temp.forEach((word) => {
        init_name = init_name + word.charAt(0).toUpperCase();
      });
      this.init_name = init_name;
    },
    changeName() {
      this.$v.name.$touch();
      this.getInit();
    },
    async apply_signature() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.get_signature = true;
        this.$v.$reset();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.user-icon {
  font-size: 27px;
  margin-top: 45px;
  margin-right: 11px;
}

.sign-option {
  border: 1px solid;
  border-color: #9e9e9e;
  padding-top: 10px;
}
.name-initial {
  display: inline-flex;
}
.name-input {
  width: 400px;
}
.name-input input {
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
}
.name-input input:focus {
  outline: none;
  border-color: #0000ff;
  box-shadow: 0 0 0 2px rgba(0, 0, 255, 0.1);
}
.form-item .errorText {
  display: none;
  margin-bottom: 8px;
  font-size: 13.4px;
  color: red;
}

.form-item {
  &.errorInput .errorText {
    display: block;
  }
}
.form-item {
  margin: 20px;
  text-align: left;
  display: grid;
}

input.error {
  border-color: red;
}

.tabs {
  position: relative;
  background: #1abc9c;
  height: 304px;
  align-content: center;
  // border: solid 1px;
}
.tab-label i {
  margin-right: 6px;
}
.tabs::before,
.tabs::after {
  content: "";
  display: table;
}
.tabs::after {
  clear: both;
}
.tab {
  float: left;
}
.tab-switch {
  display: none;
}
.tab-label {
  position: relative;
  display: block;
  line-height: 2.75em;
  height: 3em;
  padding: 0 1.618em;
  background: #1abc9c;
  border-right: 0.125rem solid #16a085;
  color: #fff;
  cursor: pointer;
  top: 0;
  transition: all 0.25s;
}
.tab-label:hover {
  top: -0.25rem;
  transition: all 0.25s;
}
.tab-content {
  background: #fff;
  color: #2c3e50;
  border-bottom: 0.25rem solid #bdc3c7;
  height: 100%;
  overflow-y: hidden;
  width: 100%;
  position: absolute;
  z-index: 1;
  top: 2.75em;
  left: 0;
  opacity: 0;
  transition: all 0.35s;
  text-align: left;
  display: grid;
}
.tab-content::-webkit-scrollbar {
  width: 8px;
}
.tab-content::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
}
.tab-switch:checked + .tab-label {
  background: #fff;
  color: #2c3e50;
  border-bottom: 0;
  border-top: 0.25rem solid #d60a0a;
  transition: all 0.35s;
  z-index: 2;
  top: -0.0625rem;
}
.tab-switch:checked + .tab-label:hover {
  top: -0.0625rem;
}
.tab-switch:checked + .tab-label + .tab-content {
  opacity: 1;
  transition: all 0.35s;
  z-index: 3;
}
input {
  padding: 10px;
  border-radius: 5px;
  border-width: thin;
  border: 1px solid !important;
}
.file-label {
  cursor: pointer;
}

@media (max-width: 1024px) {
  .user-icon {
    font-size: 24px;
    margin-top: 35px;
  }
  .name-input {
    width: 100%;
    max-width: 350px;
  }
  .form-item {
    margin: 15px;
  }
}

@media (max-width: 768px) {
  .user-icon {
    font-size: 22px;
    margin-top: 30px;
  }
  .name-input {
    width: 100%;
    max-width: 100%;
  }
  .name-initial {
    flex-direction: column;
  }
  .form-item {
    margin: 12px;
  }
  .tabs {
    height: auto;
    min-height: 280px;
  }
  .tab-label {
    font-size: 14px;
    padding: 0 1em;
    line-height: 2.5em;
    height: 2.5em;
  }
}

@media (max-width: 640px) {
  .user-icon {
    font-size: 20px;
    margin-top: 25px;
  }
  .form-item {
    margin: 10px;
  }
  .name-input input {
    padding: 8px;
  }
  .tabs {
    min-height: 260px;
  }
  .tab-label {
    font-size: 13px;
    padding: 0 0.8em;
    line-height: 2.25em;
    height: 2.25em;
  }
}

@media (max-width: 480px) {
  .user-icon {
    font-size: 18px;
    margin-top: 20px;
    margin-right: 8px;
  }
  .form-item {
    margin: 8px;
  }
  .name-input input {
    padding: 6px;
    font-size: 14px;
  }
  .tabs {
    min-height: 240px;
  }
  .tab-label {
    font-size: 12px;
    padding: 0 0.6em;
    line-height: 2em;
    height: 2em;
  }
  input {
    padding: 8px;
    font-size: 14px;
  }
}
</style>
