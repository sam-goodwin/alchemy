<template>
  <div class="feature-item" :class="{ reverse }">
    <div class="feature-content">
      <div class="text-content">
        <h3 class="feature-title">{{ title }}</h3>
        <p class="feature-description">{{ description }}</p>
        <a 
          :href="ctaLink" 
          class="cta-button"
          :aria-label="`${ctaText} - ${title}`"
        >
          {{ ctaText }}
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            stroke-width="2" 
            stroke-linecap="round" 
            stroke-linejoin="round"
          >
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </a>
      </div>
      
      <div class="code-content">
        <div class="code-snippet">
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
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
            </button>
          </div>
          <div class="code-body">
            <slot name="code"></slot>
          </div>
          <div v-if="copied" class="copied-indicator">Copied!</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  reverse?: boolean;
}>();

const copied = ref(false);

function copyCode() {
  if (window.isSecureContext) {
    const codeElement = document.querySelector('.code-body .language-typescript pre code');
    const code = codeElement?.textContent || '';
    navigator.clipboard.writeText(code);
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 2000);
  }
}
</script>

<style scoped>
.feature-item {
  margin-bottom: 6rem;
}

.feature-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.reverse .feature-content {
  direction: rtl;
}

.reverse .text-content {
  direction: ltr;
}

.reverse .code-content {
  direction: ltr;
}

.text-content {
  max-width: 100%;
}

.feature-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin-bottom: 1.5rem;
  line-height: 1.2;
}

.feature-description {
  font-size: 1.25rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin-bottom: 2rem;
}

.cta-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 2rem;
  background: linear-gradient(135deg, var(--vp-c-brand-1), var(--vp-c-brand-2));
  color: white;
  text-decoration: none;
  border-radius: 2rem;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  text-decoration: none;
}

.cta-button svg {
  transition: transform 0.3s ease;
}

.cta-button:hover svg {
  transform: translateX(2px);
}

/* Code snippet styles */
.code-snippet {
  background: var(--vp-c-bg-alt);
  border-radius: 1rem;
  box-shadow: 
    0 10px 30px rgba(0, 0, 0, 0.1),
    0 5px 15px rgba(0, 0, 0, 0.05),
    0 0 0 1px var(--vp-c-border) inset;
  overflow: hidden;
  position: relative;
  transform: perspective(1000px) rotateY(-2deg) rotateX(1deg);
  transition: transform 0.4s ease, box-shadow 0.4s ease;
}

.code-snippet:hover {
  transform: perspective(1000px) rotateY(0deg) rotateX(0deg) translateY(-4px);
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.15),
    0 10px 20px rgba(0, 0, 0, 0.1),
    0 0 0 1px var(--vp-c-border) inset;
}

.reverse .code-snippet {
  transform: perspective(1000px) rotateY(2deg) rotateX(1deg);
}

.reverse .code-snippet:hover {
  transform: perspective(1000px) rotateY(0deg) rotateX(0deg) translateY(-4px);
}

.code-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--vp-c-bg-soft);
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--vp-c-border);
  font-family: var(--vp-font-family-mono);
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.header-controls {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.control {
  width: 12px;
  height: 12px;
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
  color: var(--vp-c-text-3);
  border-radius: 0.375rem;
  transition: color 0.25s, background-color 0.25s;
}

.copy-button:hover {
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-bg-mute);
}

.code-body {
  background-color: var(--vp-code-bg);
  position: relative;
  overflow: hidden;
}

.code-body :deep(div[class*="language-"]) {
  margin: 0;
  border-radius: 0;
  background: transparent !important;
}

.code-body :deep(pre) {
  margin: 0;
  padding: 1.5rem;
  overflow-x: auto;
  background: transparent !important;
}

.code-body :deep(code) {
  font-family: var(--vp-font-family-mono);
  font-size: 0.9rem !important;
  line-height: 1.6;
  font-weight: 400;
}

.code-body .language-typescript {
  margin: 0;
  border-radius: 0;
  background: transparent !important;
}

.code-body .language-typescript pre {
  margin: 0;
  padding: 1.5rem;
  overflow-x: auto;
  background: transparent !important;
}

.code-body .language-typescript code {
  font-family: var(--vp-font-family-mono);
  font-size: 0.9rem !important;
  line-height: 1.6;
  font-weight: 400;
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
  box-shadow: 0 4px 12px rgba(189, 52, 254, 0.3);
  animation: fadeIn 0.2s ease;
  z-index: 10;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive Design */
@media (max-width: 1024px) {
  .feature-content {
    gap: 3rem;
  }
  
  .feature-title {
    font-size: 2.25rem;
  }
  
  .feature-description {
    font-size: 1.125rem;
  }
}

@media (max-width: 768px) {
  .feature-content {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
  
  .reverse .feature-content {
    direction: ltr;
  }
  
  .feature-item {
    margin-bottom: 4rem;
  }
  
  .feature-title {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
  
  .feature-description {
    font-size: 1rem;
    margin-bottom: 1.5rem;
  }
  
  .code-snippet {
    transform: none !important;
  }
  
  .code-snippet:hover {
    transform: translateY(-2px) !important;
  }
}

@media (max-width: 480px) {
  .feature-item {
    margin-bottom: 3rem;
  }
  
  .feature-title {
    font-size: 1.75rem;
  }
  
  .cta-button {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
  }
  
  .code-body :deep(pre) {
    padding: 1rem;
  }
  
  .code-body :deep(code) {
    font-size: 0.8rem !important;
  }
}
</style>