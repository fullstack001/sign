<template>
  <div class="toolbar" role="toolbar" aria-label="Sign tools">
    <!-- Thumbnails Tool -->
    <div class="tool">
      <button class="modern-tool-item"
              :class="{ active: showThumbnails }"
              @click="toggleThumbnails"
              type="button"
              aria-pressed="showThumbnails"
              aria-label="Toggle thumbnails">
        <div class="modern-tool-icon">
          <i class="fa-solid fa-th-large"></i>
        </div>
        <div class="modern-tool-label">Thumbnails</div>
      </button>
    </div>

    <div class="stepper">
      <button class="arrow"
              type="button"
              :disabled="currentPage == 1"
              aria-label="Previous page"
              @click="$emit('set_page', currentPage == 1 ? 1 : currentPage - 1)">
        <i class="fa-solid fa-chevron-up"></i>
      </button>
      <button class="arrow"
              type="button"
              :disabled="currentPage == pages"
              aria-label="Next page"
              @click="() => { let newPage = currentPage == pages ? currentPage : currentPage + 1; $emit('set_page', newPage); }">
        <i class="fa-solid fa-chevron-down"></i>
      </button>
      <div class="info" aria-live="polite">
        <input
          type="number"
          :max="pages"
          :min="1"
          v-model="currentPage"
          class="page-input"
          aria-label="Current page"
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

/* Toolbar container improvements */
.toolbar {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
  border-bottom: 1px solid #eee;
  background: #fff;
}

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
  border: 1px solid #e6e8eb;
  box-shadow: 0 1px 2px rgba(0,0,0,0.04);
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

.modern-tool-item:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(0, 0, 255, 0.2);
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

/* Stepper (pager) */
.stepper {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-left: auto;
}
.arrow {
  border: 1px solid #e6e8eb;
  background: #f8f9fa;
  color: #222;
  width: 28px;
  height: 28px;
  border-radius: 6px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.15s ease, transform 0.05s ease;
}
.arrow:hover:not([disabled]) { background: #e9ecef; }
.arrow:active:not([disabled]) { transform: translateY(1px); }
.arrow[disabled] { opacity: 0.5; cursor: not-allowed; }

.info { color: #444; font-size: 13px; }
.page-input {
  width: 48px;
  height: 28px;
  padding: 2px 6px;
  border: 1px solid #e6e8eb;
  border-radius: 6px;
  margin-right: 6px;
}
.page-input:focus { outline: none; border-color: #0000ff; box-shadow: 0 0 0 2px rgba(0,0,255,0.15); }

/* Responsive Design */
@media (max-width: 768px) {
  .toolbar { gap: 8px; padding: 6px 8px; }
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
  .stepper { gap: 4px; }
  .arrow { width: 26px; height: 26px; }
  .page-input { width: 44px; height: 26px; }
}

@media (max-width: 640px) {
  .toolbar { gap: 6px; }
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
  .page-input { width: 40px; }
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
  .stepper { margin-left: 0; }
}
</style>
