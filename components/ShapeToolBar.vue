<template>
  <div class="modern-sub-toolbar shape-toolbar">
    <!-- Arrow -->
    <div class="modern-tool-item" :class="{ active: tool_show == 'arrow' }" @click="enableAddArrow">
      <div class="modern-tool-icon">
        <i class="fa fa-long-arrow-right"></i>
      </div>
      <div class="modern-tool-label">Arrow</div>
    </div>

    <!-- Rectangle -->
    <div class="modern-tool-item" :class="{ active: tool_show == 'rect' }" @click="enableRectangle">
      <div class="modern-tool-icon">
        <i class="fa-regular fa-square"></i>
      </div>
      <div class="modern-tool-label">Rectangle</div>
    </div>

    <!-- Circle -->
    <div class="modern-tool-item" :class="{ active: tool_show == 'circle' }" @click="enableCircle">
      <div class="modern-tool-icon">
        <i class="fa-regular fa-circle"></i>
      </div>
      <div class="modern-tool-label">Circle</div>
    </div>

    <!-- Line -->
    <div class="modern-tool-item" :class="{ active: tool_show == 'line' }" @click="enableLine">
      <div class="modern-tool-icon">
        <i class="fa-solid fa-minus"></i>
      </div>
      <div class="modern-tool-label">Line</div>
    </div>

    <!-- Triangle -->
    <div class="modern-tool-item" :class="{ active: tool_show == 'triangle' }" @click="enableTriangle">
      <div class="modern-tool-icon">
        <i class="fa-solid fa-play"></i>
      </div>
      <div class="modern-tool-label">Triangle</div>
    </div>

    <!-- Star -->
    <div class="modern-tool-item" :class="{ active: tool_show == 'star' }" @click="enableStar">
      <div class="modern-tool-icon">
        <i class="fa-solid fa-star"></i>
      </div>
      <div class="modern-tool-label">Star</div>
    </div>

    <!-- Color Picker -->
    <div class="modern-tool-item modern-tool-item-inline">
      <div class="modern-tool-icon">
        <i class="fa-solid fa-palette"></i>
      </div>
      <div class="modern-tool-label">Color</div>
      <input
        type="color"
        class="modern-color-picker-inline"
        v-model="color_pallet"
        @change="set_color"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "ShapeToolBar",
  data() {
    return {
      color_pallet: "#212121",
      tool_show: null,
    };
  },
  methods: {
    enableAddArrow(e) {
      this.tool_show = "arrow";
      this.$emit("enableAddArrow", e);
    },
    enableRectangle(e) {
      this.tool_show = "rect";
      this.$emit("enableRectangle", e);
    },
    enableCircle(e) {
      this.tool_show = "circle";
      this.$emit("enableCircle", e);
    },
    enableLine(e) {
      this.tool_show = "line";
      this.$emit("enableLine", e);
    },
    enableTriangle(e) {
      this.tool_show = "triangle";
      this.$emit("enableTriangle", e);
    },
    enableStar(e) {
      this.tool_show = "star";
      this.$emit("enableStar", e);
    },
    set_color() {
      this.$emit("set_color", this.color_pallet);
    },
  },
};
</script>
<style scoped>
/* Modern Sub-toolbar Design */
.modern-sub-toolbar {
  display: flex;
  align-items: center;
  background-color: #f8f9fa;
  border-top: 1px solid #e0e0e0;
  padding: 15px 20px;
  gap: 16px;
  overflow-x: auto;
  overflow-y: hidden;
  min-height: 60px;
  flex-wrap: wrap;
}

.modern-tool-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 60px;
  padding: 8px 4px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  background-color: transparent;
}

.modern-tool-item:hover {
  background-color: #e8e8e8;
}

.modern-tool-item.active {
  background-color: #d0d0ff;
  color: #0000ff;
}

.modern-tool-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  font-size: 16px;
  color: #47474f;
  margin-bottom: 4px;
}

.modern-tool-item.active .modern-tool-icon {
  color: #0000ff;
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
  color: #0000ff;
}

.modern-color-picker {
  width: 30px;
  height: 30px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-top: 4px;
  cursor: pointer;
}

/* Inline color picker layout */
.modern-tool-item-inline {
  flex-direction: row !important;
  align-items: center !important;
  gap: 8px !important;
  min-width: auto !important;
  padding: 6px 8px !important;
}

.modern-tool-item-inline .modern-tool-icon {
  margin-bottom: 0 !important;
  margin-right: 4px;
}

.modern-tool-item-inline .modern-tool-label {
  margin-bottom: 0 !important;
  white-space: nowrap;
}

.modern-color-picker-inline {
  width: 24px;
  height: 24px;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 4px;
}

/* Enhanced Responsive Design */
@media (max-width: 1024px) {
  .modern-sub-toolbar {
    gap: 15px;
    padding: 12px 18px;
    min-height: 55px;
    overflow-x: auto;
    overflow-y: hidden;
    scrollbar-width: thin;
  }
  
  .modern-tool-item {
    min-width: 55px;
    padding: 8px 4px;
    flex-shrink: 0;
  }
  
  .modern-tool-icon {
    width: 24px;
    height: 24px;
    font-size: 16px;
  }
  
  .modern-tool-label {
    font-size: 11px;
  }
  
  .modern-color-picker {
    width: 26px;
    height: 26px;
  }
  
  .modern-color-picker-inline {
    width: 24px;
    height: 24px;
  }
  
  .modern-tool-item-inline {
    gap: 8px !important;
    padding: 6px 8px !important;
  }
}

@media (max-width: 768px) {
  .modern-sub-toolbar {
    gap: 12px;
    padding: 10px 15px;
    min-height: 50px;
    overflow-x: auto;
    overflow-y: hidden;
    scrollbar-width: thin;
    -webkit-overflow-scrolling: touch;
  }
  
  .modern-tool-item {
    min-width: 50px;
    padding: 6px 3px;
    flex-shrink: 0;
  }
  
  .modern-tool-icon {
    width: 22px;
    height: 22px;
    font-size: 15px;
  }
  
  .modern-tool-label {
    font-size: 10px;
  }
  
  .modern-color-picker {
    width: 25px;
    height: 25px;
  }
  
  .modern-color-picker-inline {
    width: 22px;
    height: 22px;
  }
  
  .modern-tool-item-inline {
    gap: 6px !important;
    padding: 4px 6px !important;
  }
}

@media (max-width: 640px) {
  .modern-sub-toolbar {
    gap: 8px;
    padding: 8px 12px;
    min-height: 45px;
    overflow-x: auto;
    overflow-y: hidden;
    scrollbar-width: thin;
    -webkit-overflow-scrolling: touch;
  }
  
  .modern-tool-item {
    min-width: 45px;
    padding: 4px 2px;
    flex-shrink: 0;
    touch-action: manipulation;
  }
  
  .modern-tool-icon {
    width: 20px;
    height: 20px;
    font-size: 14px;
  }
  
  .modern-tool-label {
    font-size: 9px;
  }
  
  .modern-color-picker {
    width: 22px;
    height: 22px;
  }
  
  .modern-color-picker-inline {
    width: 20px;
    height: 20px;
  }
  
  .modern-tool-item-inline {
    gap: 4px !important;
    padding: 3px 4px !important;
  }
  
  /* Hide labels on small screens to save space */
  .modern-tool-label {
    display: none;
  }
  
  .modern-tool-item {
    min-width: 40px;
    padding: 6px 4px;
  }
}

@media (max-width: 480px) {
  .modern-sub-toolbar {
    gap: 6px;
    padding: 6px 10px;
    min-height: 40px;
    overflow-x: auto;
    overflow-y: hidden;
    scrollbar-width: thin;
    -webkit-overflow-scrolling: touch;
  }
  
  .modern-tool-item {
    min-width: 38px;
    padding: 4px 2px;
    flex-shrink: 0;
    touch-action: manipulation;
  }
  
  .modern-tool-icon {
    width: 18px;
    height: 18px;
    font-size: 13px;
  }
  
  .modern-tool-label {
    display: none;
  }
  
  .modern-color-picker {
    width: 20px;
    height: 20px;
  }
  
  .modern-color-picker-inline {
    width: 18px;
    height: 18px;
  }
  
  .modern-tool-item-inline {
    gap: 3px !important;
    padding: 2px 3px !important;
  }
}

/* Ultra-small screens */
@media (max-width: 360px) {
  .modern-sub-toolbar {
    gap: 4px;
    padding: 4px 8px;
    min-height: 36px;
  }
  
  .modern-tool-item {
    min-width: 36px;
    padding: 3px 1px;
  }
  
  .modern-tool-icon {
    width: 16px;
    height: 16px;
    font-size: 12px;
  }
  
  .modern-color-picker {
    width: 18px;
    height: 18px;
  }
  
  .modern-color-picker-inline {
    width: 16px;
    height: 16px;
  }
}
</style>
