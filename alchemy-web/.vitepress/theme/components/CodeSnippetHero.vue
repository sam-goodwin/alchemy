<template>
  <div class="vp-hero">
    <div class="gradient-bg"></div>
    <div class="vp-hero-content">
      <div class="left">
        <h1 class="name">{{ name }}</h1>
        <p class="text">{{ text }}</p>
        <p class="tagline">{{ tagline }}</p>
        <div class="actions">
          <div v-for="action in actions" :key="action.link" class="action">
            <a
              class="action-link"
              :class="[action.theme]"
              :href="action.link"
              >{{ action.text }}</a
            >
          </div>
        </div>
      </div>
      <div class="right">
        <div class="code-snippet code-hero">
          <div class="code-header">
            <div class="header-controls">
              <span class="control close"></span>
              <span class="control minimize"></span>
              <span class="control expand"></span>
            </div>
            <span class="file-name">alchemy.run.ts</span>
            <button
              class="copy-button"
              @click="copyCode"
              aria-label="Copy code"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path
                  d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
                ></path>
              </svg>
            </button>
          </div>
          <div class="code-content">
            <slot name="code"></slot>
          </div>
          <div v-if="copied" class="copied-indicator">Copied!</div>
          <div class="code-glow"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
  name: string;
  text: string;
  tagline: string;
  actions: Array<{
    theme: string;
    text: string;
    link: string;
  }>;
}>();

const copied = ref(false);

function copyCode() {
  if (window.isSecureContext) {
    // Try to find the code in the slot
    const codeElement = document.querySelector(".code-content pre code");
    const code = codeElement?.textContent || "";
    navigator.clipboard.writeText(code);
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 2000);
  }
}
</script>

<style scoped>
/* Root font size is typically 16px in browsers, so 1rem = 16px */

/* Prevent excessive zoom-out issues */
:global(html) {
  min-width: 320px;
}

:global(body) {
  min-width: 320px;
  overflow-x: hidden;
}

/* Base styles for all screen sizes */
.vp-hero {
  padding: 3rem 0rem 4.5rem;
  width: 100%;
  max-width: 100vw;
  position: relative;
  min-height: calc(100vh - 4rem);
  display: flex;
  align-items: flex-start;
  overflow: hidden;
  box-sizing: border-box;
}

.gradient-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  opacity: 0.4;
  z-index: -1;
}

.gradient-bg::before {
  content: "";
  position: absolute;
  width: 62.5rem;
  height: 62.5rem;
  background: radial-gradient(
    circle,
    rgba(189, 52, 254, 0.15) 0%,
    transparent 70%
  );
  top: -18.75rem;
  left: -12.5rem;
}

.gradient-bg::after {
  content: "";
  position: absolute;
  width: 50rem;
  height: 50rem;
  background: radial-gradient(
    circle,
    rgba(65, 209, 255, 0.15) 0%,
    transparent 70%
  );
  bottom: -12.5rem;
  right: -12.5rem;
}

.vp-hero-content {
  margin: 0 auto;
  max-width: 90rem;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  position: relative;
  z-index: 1;
  padding: 1.5rem 1.5rem 0;
  width: 100%;
  box-sizing: border-box;
}

.left,
.right {
  width: 100%;
}

.name {
  font-size: 3.6rem;
  font-weight: 700;
  line-height: 1;
  background: var(--vp-home-hero-name-background);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 0;
  letter-spacing: -0.01em;
  display: inline-block;
  width: auto;
}

.text {
  font-size: 3.5rem;
  font-weight: 700;
  line-height: 1.1;
  margin-top: 0.625rem;
  margin-bottom: 0.75rem;
  color: rgba(235, 235, 235, 0.9);
  letter-spacing: -0.01em;
  white-space: nowrap;
}

.tagline {
  font-size: 1.5rem;
  font-weight: 500;
  color: #98989f;
  margin-bottom: 1.25rem;
  max-width: 37.5rem;
  line-height: 1.5;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.action-link {
  display: inline-block;
  border: 0.0625rem solid transparent;
  text-align: center;
  font-weight: 500;
  white-space: nowrap;
  transition:
    color 0.25s,
    border-color 0.25s,
    background-color 0.25s,
    transform 0.25s;
  border-radius: 1.25rem;
  padding: 0 1.5rem;
  line-height: 2.5rem;
  font-size: 1rem;
  outline: none;
  text-decoration: none;
}

.action-link:hover {
  transform: translateY(-0.125rem);
  text-decoration: none;
}

.action-link.brand {
  border-color: var(--vp-button-brand-border);
  color: var(--vp-button-brand-text);
  background-color: var(--vp-button-brand-bg);
  text-decoration: none;
}

.action-link.brand:hover {
  border-color: var(--vp-button-brand-hover-border);
  color: var(--vp-button-brand-hover-text);
  background-color: var(--vp-button-brand-hover-bg);
  text-decoration: none;
}

.action-link.alt {
  border-color: var(--vp-c-gray-3);
  color: var(--vp-c-text-1);
  text-decoration: none;
  background-color: #333336;
}

.action-link.alt:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
  text-decoration: none;
  background-color: #3a3a3e;
}

/* Enhanced code snippet styling */
.code-snippet {
  background: linear-gradient(
    145deg,
    rgba(30, 30, 35, 0.95),
    rgba(15, 15, 20, 0.95)
  );
  border-radius: 1rem;
  box-shadow:
    0 0.625rem 1.875rem rgba(0, 0, 0, 0.2),
    0 0.3125rem 0.9375rem rgba(0, 0, 0, 0.1),
    0 0 0 0.0625rem rgba(255, 255, 255, 0.05) inset;
  overflow: hidden;
  position: relative;
  transform: perspective(75rem) rotateY(-5deg) rotateX(2deg);
  transition:
    transform 0.4s cubic-bezier(0.17, 0.67, 0.83, 0.67),
    box-shadow 0.4s ease;
  max-width: 100%;
  z-index: 1;
}

.code-snippet:hover {
  transform: perspective(75rem) rotateY(0deg) rotateX(0deg)
    translateY(-0.3125rem);
  box-shadow:
    0 0.9375rem 2.5rem rgba(0, 0, 0, 0.25),
    0 0.5rem 1.25rem rgba(0, 0, 0, 0.15),
    0 0 0 0.0625rem rgba(255, 255, 255, 0.07) inset;
}

.code-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(30, 30, 35, 0.8);
  backdrop-filter: blur(0.625rem);
  padding: 0.75rem 1rem;
  border-bottom: 0.0625rem solid rgba(255, 255, 255, 0.05);
  font-family: var(--vp-font-family-mono);
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.6);
  position: relative;
}

.header-controls {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.control {
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
  display: inline-block;
}

.control.close {
  background-color: #ff5f56;
}

.control.minimize {
  background-color: #ffbd2e;
}

.control.expand {
  background-color: #27c93f;
}

.file-name {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.8rem;
  opacity: 0.8;
}

.copy-button {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0.375rem;
  color: rgba(255, 255, 255, 0.5);
  border-radius: 0.375rem;
  transition:
    color 0.25s,
    background-color 0.25s;
  z-index: 2;
}

.copy-button:hover {
  color: rgba(255, 255, 255, 0.9);
  background-color: rgba(255, 255, 255, 0.1);
}

.code-content {
  position: relative;
  overflow: hidden;
  background-color: rgba(20, 20, 25, 0.95);
}

.code-content :deep(div[class*="language-"]) {
  margin: 0;
  border-radius: 0;
  height: 100%;
  overflow: visible;
  background: transparent !important;
}

.code-content :deep(pre) {
  margin: 0;
  padding: 1.5rem 0.1rem;
  overflow-x: auto;
  background: transparent !important;
}

.code-content :deep(code) {
  font-family: var(--vp-font-family-mono);
  font-size: 0.9rem !important;
  line-height: 1.6;
  font-weight: 400;
  letter-spacing: 0.3px;
  text-shadow: 0 0.0625rem 0.125rem rgba(0, 0, 0, 0.3);
}

.code-content :deep(.line-numbers),
.code-content :deep(.highlight-lines),
.code-content :deep(.copy) {
  display: none;
}

.copied-indicator {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  background: linear-gradient(135deg, #bd34fe, #41d1ff);
  color: white;
  padding: 0.375rem 0.75rem;
  border-radius: 0.375rem;
  font-size: 0.8rem;
  font-weight: 500;
  box-shadow:
    0 0.25rem 0.75rem rgba(189, 52, 254, 0.3),
    0 0.125rem 0.375rem rgba(65, 209, 255, 0.2);
  animation: fadeIn 0.2s ease;
  z-index: 10;
}

.code-glow {
  position: absolute;
  width: 150%;
  height: 150%;
  top: -25%;
  left: -25%;
  background: radial-gradient(
    circle at center,
    rgba(189, 52, 254, 0.08) 0%,
    rgba(65, 209, 255, 0.05) 25%,
    transparent 70%
  );
  pointer-events: none;
  z-index: 0;
  opacity: 0;
  transition: opacity 0.5s ease;
}

.code-snippet:hover .code-glow {
  opacity: 1;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(0.5rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Large Desktops (1200px+) */
@media (min-width: 75rem) {
  .vp-hero-content {
    flex-direction: row;
    align-items: center;
    gap: 3rem;
    justify-content: space-between;
    padding: 2rem 2rem 0;
  }

  .left {
    width: 55%;
  }

  .right {
    width: 45%;
    max-width: 31.25rem;
  }
}

/* Regular Desktops and Laptops (992px - 1199px) */
@media (min-width: 62rem) and (max-width: 74.9375rem) {
  .vp-hero-content {
    flex-direction: row;
    align-items: center;
    gap: 2.5rem;
    justify-content: space-between;
    padding: 1.75rem 1.75rem 0;
  }

  .left {
    width: 55%;
  }

  .right {
    width: 45%;
    max-width: 28.125rem;
  }

  .name {
    font-size: 3.2rem;
  }

  .text {
    font-size: 3.1rem;
  }
}

/* Tablets and Small Laptops (768px - 991px) */
@media (min-width: 48rem) and (max-width: 61.9375rem) {
  .vp-hero-content {
    flex-direction: row;
    align-items: center;
    gap: 2rem;
    padding: 1.5rem 1.5rem 0;
  }

  .left {
    width: 50%;
  }

  .right {
    width: 50%;
    max-width: 25rem;
  }

  .name {
    font-size: 2.8rem;
  }

  .text {
    font-size: 2.7rem;
    white-space: normal;
  }

  .tagline {
    font-size: 1.25rem;
    max-width: 100%;
  }
}

/* Large Phones and Small Tablets (576px - 767px) */
@media (min-width: 36rem) and (max-width: 47.9375rem) {
  .vp-hero {
    min-height: auto;
    padding: 2.5rem 0 3rem;
  }

  .vp-hero-content {
    flex-direction: column;
    gap: 2rem;
    padding: 1.25rem 1.25rem 0;
  }

  .left,
  .right {
    width: 100%;
  }

  .name {
    font-size: 2.4rem;
  }

  .text {
    font-size: 2.3rem;
    white-space: normal;
  }

  .tagline {
    font-size: 1.125rem;
    max-width: 100%;
  }

  .code-snippet {
    transform: perspective(75rem) rotateY(-3deg) rotateX(1deg);
  }

  .code-content :deep(code) {
    font-size: 0.85rem !important;
  }
}

/* Medium to Small Phones (400px - 575px) */
@media (min-width: 25rem) and (max-width: 35.9375rem) {
  .vp-hero {
    min-height: auto;
    padding: 2rem 0 2.5rem;
  }

  .vp-hero-content {
    flex-direction: column;
    gap: 1.75rem;
    padding: 1rem 1rem 0;
  }

  .left,
  .right {
    width: 100%;
  }

  .name {
    font-size: 2rem;
  }

  .text {
    font-size: 1.9rem;
    white-space: normal;
  }

  .tagline {
    font-size: 1rem;
    line-height: 1.4;
    margin-bottom: 1rem;
  }

  .actions {
    gap: 0.75rem;
  }

  .action-link {
    font-size: 0.9rem;
    padding: 0 1.125rem;
    line-height: 2.25rem;
  }

  .code-snippet {
    transform: perspective(75rem) rotateY(-2deg) rotateX(1deg);
  }

  .code-header {
    padding: 0.625rem 0.75rem;
  }

  .code-content :deep(code) {
    font-size: 0.8rem !important;
  }
}

/* Extra Small Phones (< 400px) */
@media (max-width: 24.9375rem) {
  .vp-hero {
    min-height: auto;
    padding: 1.5rem 0 2rem;
  }

  .vp-hero-content {
    flex-direction: column;
    gap: 1.5rem;
    padding: 0.75rem 0.75rem 0;
  }

  .left,
  .right {
    width: 100%;
  }

  .name {
    font-size: 1.6rem;
  }

  .text {
    font-size: 1.5rem;
    margin-top: 0.5rem;
    white-space: normal;
  }

  .tagline {
    font-size: 0.9rem;
    line-height: 1.4;
    margin-bottom: 0.875rem;
  }

  .actions {
    flex-direction: column;
    width: 100%;
    gap: 0.625rem;
  }

  .action {
    width: 100%;
  }

  .action-link {
    width: 100%;
    display: block;
    font-size: 0.875rem;
    padding: 0 1rem;
    line-height: 2.125rem;
    border-radius: 1rem;
  }

  .code-snippet {
    transform: none !important;
    box-shadow:
      0 0.375rem 1rem rgba(0, 0, 0, 0.2),
      0 0.25rem 0.5rem rgba(0, 0, 0, 0.1),
      0 0 0 0.0625rem rgba(255, 255, 255, 0.05) inset;
  }

  .code-header {
    padding: 0.5rem 0.625rem;
  }

  .control {
    width: 0.625rem;
    height: 0.625rem;
  }

  .file-name {
    font-size: 0.7rem;
  }

  .code-content :deep(pre) {
    padding: 1.25rem 0.1rem;
  }

  .code-content :deep(code) {
    font-size: 0.75rem !important;
    line-height: 1.5;
  }

  .copied-indicator {
    bottom: 0.75rem;
    right: 0.75rem;
    padding: 0.25rem 0.5rem;
    font-size: 0.7rem;
  }
}
</style>
