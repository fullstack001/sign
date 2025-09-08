<template>
  <div class="highlight-toolbar">
    <div class="toolbar-section">
      <label class="toolbar-label">Highlight Color:</label>
      <div class="color-picker-container">
        <input
          type="color"
          :value="highlightColor"
          @input="updateHighlightColor"
          class="color-picker"
        />
        <div class="color-presets">
          <div
            v-for="color in highlightColors"
            :key="color"
            :style="{ backgroundColor: color }"
            :class="{ active: highlightColor === color }"
            @click="setHighlightColor(color)"
            class="color-preset"
          ></div>
        </div>
      </div>
    </div>

    <div class="toolbar-section">
      <label class="toolbar-label">Opacity:</label>
      <div class="opacity-control">
        <input
          type="range"
          min="0.1"
          max="1"
          step="0.1"
          :value="highlightOpacity"
          @input="updateHighlightOpacity"
          class="opacity-slider"
        />
        <span class="opacity-value">{{ Math.round(highlightOpacity * 100) }}%</span>
      </div>
    </div>

    <div class="toolbar-section">
      <label class="toolbar-label">Instructions:</label>
      <div class="instructions">
        Click and drag to create highlight rectangles over text areas
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HighlightToolBar",
  data() {
    return {
      highlightColor: "#ffff00",
      highlightOpacity: 0.3,
      highlightColors: [
        "#ffff00", // Yellow
        "#ff6b6b", // Red
        "#4ecdc4", // Teal
        "#45b7d1", // Blue
        "#96ceb4", // Green
        "#feca57", // Orange
        "#ff9ff3", // Pink
        "#54a0ff", // Light Blue
      ],
    };
  },
  methods: {
    updateHighlightColor(event) {
      this.highlightColor = event.target.value;
      this.$emit("set_highlight_color", this.highlightColor);
    },
    setHighlightColor(color) {
      this.highlightColor = color;
      this.$emit("set_highlight_color", this.highlightColor);
    },
    updateHighlightOpacity(event) {
      this.highlightOpacity = parseFloat(event.target.value);
      this.$emit("set_highlight_opacity", this.highlightOpacity);
    },
  },
};
</script>

<style scoped>
.highlight-toolbar {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 15px 20px;
  background-color: #f8f9fa;
  border-top: 1px solid #e0e0e0;
  border-radius: 0 0 8px 8px;
  flex-wrap: wrap;
}

.toolbar-section {
  display: flex;
  align-items: center;
  gap: 10px;
}

.toolbar-label {
  font-size: 14px;
  font-weight: 500;
  color: #333;
  white-space: nowrap;
}

.color-picker-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

.color-picker {
  width: 40px;
  height: 40px;
  border: 2px solid #ddd;
  border-radius: 6px;
  cursor: pointer;
  background: none;
  padding: 0;
}

.color-picker::-webkit-color-swatch-wrapper {
  padding: 0;
}

.color-picker::-webkit-color-swatch {
  border: none;
  border-radius: 4px;
}

.color-presets {
  display: flex;
  gap: 6px;
}

.color-preset {
  width: 24px;
  height: 24px;
  border-radius: 4px;
  cursor: pointer;
  border: 2px solid transparent;
  transition: all 0.2s ease;
}

.color-preset:hover {
  transform: scale(1.1);
  border-color: #333;
}

.color-preset.active {
  border-color: #0000ff;
  box-shadow: 0 0 0 1px #0000ff;
}

.opacity-control {
  display: flex;
  align-items: center;
  gap: 10px;
}

.opacity-slider {
  width: 100px;
  height: 6px;
  border-radius: 3px;
  background: #ddd;
  outline: none;
  cursor: pointer;
}

.opacity-slider::-webkit-slider-thumb {
  appearance: none;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #0000ff;
  cursor: pointer;
  border: 2px solid white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.opacity-slider::-moz-range-thumb {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #0000ff;
  cursor: pointer;
  border: 2px solid white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.opacity-value {
  font-size: 12px;
  font-weight: 500;
  color: #666;
  min-width: 35px;
}

.instructions {
  font-size: 12px;
  color: #666;
  font-style: italic;
  max-width: 200px;
}

/* Responsive Design */
@media (max-width: 768px) {
  .highlight-toolbar {
    gap: 15px;
    padding: 12px 15px;
  }

  .toolbar-section {
    gap: 8px;
  }

  .toolbar-label {
    font-size: 13px;
  }

  .color-picker {
    width: 35px;
    height: 35px;
  }

  .color-preset {
    width: 20px;
    height: 20px;
  }

  .opacity-slider {
    width: 80px;
  }

  .instructions {
    font-size: 11px;
    max-width: 150px;
  }
}

@media (max-width: 640px) {
  .highlight-toolbar {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    padding: 10px 12px;
  }

  .toolbar-section {
    width: 100%;
    justify-content: space-between;
  }

  .instructions {
    max-width: 100%;
    text-align: center;
  }
}
</style>
