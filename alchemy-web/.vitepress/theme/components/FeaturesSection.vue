<template>
  <section class="features-section">
    <div class="features-container">
      <h2 class="section-title">Why Developers Choose Alchemy</h2>
      
      <!-- Feature 1: TypeScript-first (description-left, code-right) -->
      <FeatureItem
        :reverse="false"
        title="TypeScript-first Infrastructure"
        description="Write cloud infrastructure as simple async functions, not complicated graph abstractions. Get autocomplete, refactoring, and error checking with native TypeScript."
        ctaText="Get Started"
        ctaLink="/docs/getting-started"
      >
        <template #code>
          <div class="language-typescript">
            <pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> D1Database<span class="token punctuation">,</span> Worker <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"alchemy/cloudflare"</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> Product<span class="token punctuation">,</span> Customer <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"alchemy/stripe"</span><span class="token punctuation">;</span>

<span class="token comment">// Type-safe resource definitions</span>
<span class="token keyword">const</span> database <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">D1Database</span><span class="token punctuation">(</span><span class="token string">"app-db"</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  name<span class="token operator">:</span> <span class="token string">"my-application-database"</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> api <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">Worker</span><span class="token punctuation">(</span><span class="token string">"api-server"</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  name<span class="token operator">:</span> <span class="token string">"api"</span><span class="token punctuation">,</span>
  bindings<span class="token operator">:</span> <span class="token punctuation">{</span> DB<span class="token operator">:</span> database <span class="token punctuation">}</span><span class="token punctuation">,</span>
  entrypoint<span class="token operator">:</span> <span class="token string">"./src/api.ts"</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>
          </div>
        </template>
      </FeatureItem>

      <!-- Feature 2: AI-friendly (code-left, description-right) -->
      <FeatureItem
        :reverse="true"
        title="AI-friendly Architecture"
        description="Generate new cloud resource providers in minutes with Alchemy's llms.txt and vibe-rules. Built from the ground up to work seamlessly with AI assistants."
        ctaText="Learn More"
        ctaLink="/docs/getting-started"
      >
        <template #code>
          <div class="language-typescript">
            <pre><code><span class="token comment">// llms.txt enables instant resource generation</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> Resource <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"alchemy"</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">const</span> CustomResource <span class="token operator">=</span> <span class="token function">Resource</span><span class="token punctuation">(</span>
  <span class="token string">"provider::resource"</span><span class="token punctuation">,</span>
  <span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">id<span class="token punctuation">,</span> props</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// AI generates this implementation</span>
    <span class="token keyword">const</span> resource <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">createResource</span><span class="token punctuation">(</span>props<span class="token punctuation">)</span><span class="token punctuation">;</span>
    
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      id<span class="token punctuation">,</span>
      urn<span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">provider::resource::</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>id<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span>
      resourceId<span class="token operator">:</span> resource<span class="token punctuation">.</span>id
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>
          </div>
        </template>
      </FeatureItem>

      <!-- Feature 3: Cloudflare Support (description-left, code-right) -->
      <FeatureItem
        :reverse="false"
        title="First-class Cloudflare Support"
        description="Native Cloudflare integration without code generation. Get complete type safety between your infrastructure and runtime code."
        ctaText="Try Cloudflare"
        ctaLink="/docs/guides/cloudflare-worker"
      >
        <template #code>
          <div class="language-typescript">
            <pre><code><span class="token comment">// worker.ts - your runtime code</span>
<span class="token keyword">import</span> <span class="token keyword">type</span> <span class="token punctuation">{</span> worker <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"../alchemy.run.ts"</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token keyword">async</span> <span class="token function">fetch</span><span class="token punctuation">(</span>
    <span class="token parameter">request<span class="token operator">:</span> Request<span class="token punctuation">,</span>
    env<span class="token operator">:</span> <span class="token keyword">typeof</span> worker<span class="token punctuation">.</span>Env</span>
  <span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// Full type safety for all bindings</span>
    <span class="token keyword">const</span> users <span class="token operator">=</span> <span class="token keyword">await</span> env<span class="token punctuation">.</span>DB<span class="token punctuation">.</span><span class="token function">prepare</span><span class="token punctuation">(</span>
      <span class="token string">"SELECT * FROM users"</span>
    <span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">all</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    
    <span class="token keyword">return</span> Response<span class="token punctuation">.</span><span class="token function">json</span><span class="token punctuation">(</span>users<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre>
          </div>
        </template>
      </FeatureItem>

      <!-- Feature 4: Web Framework Support (code-left, description-right) -->
      <FeatureItem
        :reverse="true"
        title="Deploy Any Web Framework"
        description="Deploy Vite, TanStack Start, Redwood, React Router, and more to Cloudflare with just a few lines. Full-stack apps made simple."
        ctaText="Try with Vite"
        ctaLink="/docs/guides/cloudflare-vitejs"
      >
        <template #code>
          <div class="language-typescript">
            <pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> Website<span class="token punctuation">,</span> Worker <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"alchemy/cloudflare"</span><span class="token punctuation">;</span>

<span class="token comment">// Deploy any web framework</span>
<span class="token keyword">const</span> app <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">Website</span><span class="token punctuation">(</span><span class="token string">"my-app"</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  name<span class="token operator">:</span> <span class="token string">"react-router-app"</span><span class="token punctuation">,</span>
  buildCommand<span class="token operator">:</span> <span class="token string">"npm run build"</span><span class="token punctuation">,</span>
  buildOutput<span class="token operator">:</span> <span class="token string">"./dist"</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// Works with: Vite, TanStack Start,</span>
<span class="token comment">// Redwood, Remix, SvelteKit, Astro</span>
<span class="token keyword">const</span> api <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">Worker</span><span class="token punctuation">(</span><span class="token string">"api"</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  name<span class="token operator">:</span> <span class="token string">"backend"</span><span class="token punctuation">,</span>
  entrypoint<span class="token operator">:</span> <span class="token string">"./api/index.ts"</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>
          </div>
        </template>
      </FeatureItem>
    </div>
  </section>
</template>

<script setup lang="ts">
import FeatureItem from './FeatureItem.vue';
</script>

<style scoped>
.features-section {
  padding: 4.5rem 0 4rem;
  position: relative;
}

.features-container {
  margin: 0 auto;
  max-width: 90rem;
  padding: 0 1.5rem;
}

.section-title {
  text-align: center;
  font-size: 3rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin-bottom: 4rem;
  background: var(--vp-home-hero-name-background);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1.1;
  padding: 0.25rem 0;
}

@media (max-width: 768px) {
  .features-section {
    padding: 4rem 0 3rem;
  }
  
  .features-container {
    padding: 0 1rem;
  }
  
  .section-title {
    font-size: 2.5rem;
    margin-bottom: 3rem;
  }
}

@media (max-width: 480px) {
  .section-title {
    font-size: 2rem;
    margin-bottom: 2rem;
  }
}
</style>