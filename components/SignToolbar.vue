<template>
  <div class="toolbar">
    <!-- Thumbnails Tool -->
    <div class="tool">
      <div class="modern-tool-item" :class="{ active: showThumbnails }" @click="toggleThumbnails">
        <div class="modern-tool-icon">
          <i class="fa-solid fa-th-large"></i>
        </div>
        <div class="modern-tool-label">Thumbnails</div>
      </div>
    </div>

    <div class="stepper">
      <div class="arrow">
        <i
          class="fa-solid fa-chevron-up"
          style="font-size: medium"
          @click="$emit('set_page', currentPage == 1 ? 1 : currentPage - 1)"
        ></i>
      </div>
      <div class="arrow">
        <i
          class="fa-solid fa-chevron-down"
          style="font-size: medium"
          @click="
            () => {
              let newPage =
                currentPage == pages ? currentPage : currentPage + 1;
              $emit('set_page', newPage);
            }
          "
        ></i>
      </div>
      <div class="info">
        <input
          type="number"
          :max="pages"
          :min="1"
          style="width: 40px; height: 24px; margin-right: 3px"
          v-model="currentPage"
          @change="() => $emit('set_page', currentPage * 1)"
        />
        / {{ pages }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["pages", "currentPageProps"],
  data() {
    return {
      currentPage: 1,
      showThumbnails: false,
    };
  },
  watch: {
    currentPageProps(newValue) {
      this.currentPage = newValue;
    },
  },
  methods: {
    toggleThumbnails() {
      this.showThumbnails = !this.showThumbnails;
      this.$emit("toggleThumbnails", this.showThumbnails);
    },
  },
};
</script>
<style scoped>
@import "@/assets/css/toolbar.css";

/* Modern Tool Item Styles */
.modern-tool-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 60px;
  padding: 8px 6px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: #f8f9fa;
  border: 2px solid transparent;
}

.modern-tool-item:hover {
  background-color: #e9ecef;
  transform: translateY(-1px);
}

.modern-tool-item.active {
  background-color: #0000ff;
  border-color: #0000ff;
  color: white;
}

.modern-tool-icon {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: #47474f;
  margin-bottom: 4px;
}

.modern-tool-item.active .modern-tool-icon {
  color: white;
}

.modern-tool-label {
  font-size: 11px;
  font-weight: 500;
  color: #47474f;
  text-align: center;
  line-height: 1.2;
  white-space: nowrap;
}

.modern-tool-item.active .modern-tool-label {
  color: white;
}

/* Responsive Design */
@media (max-width: 768px) {
  .modern-tool-item {
    min-width: 50px;
    padding: 6px 3px;
  }
  
  .modern-tool-icon {
    width: 22px;
    height: 22px;
    font-size: 15px;
  }
  
  .modern-tool-label {
    font-size: 10px;
  }
}

@media (max-width: 640px) {
  .modern-tool-item {
    min-width: 45px;
    padding: 4px 2px;
  }
  
  .modern-tool-icon {
    width: 20px;
    height: 20px;
    font-size: 14px;
  }
  
  .modern-tool-label {
    font-size: 9px;
  }
}

@media (max-width: 480px) {
  .modern-tool-item {
    min-width: 40px;
    padding: 3px 1px;
  }
  
  .modern-tool-icon {
    width: 18px;
    height: 18px;
    font-size: 13px;
  }
  
  .modern-tool-label {
    display: none;
  }
}
</style>
