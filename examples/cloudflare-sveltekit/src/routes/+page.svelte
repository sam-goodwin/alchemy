<script lang="ts">
  import "../app.css";
  import type { PageData } from "./$types";

  interface Props {
    data: PageData;
  }

  let { data }: Props = $props();

  let getResponse = $state("");
  let postResponse = $state("");
  let isLoadingGet = $state(false);
  let isLoadingPost = $state(false);
  let kvKey = $state("demo-key");
  let kvValue = $state("Hello from SvelteKit!");
  let fileContent = $state("This is a test file created from SvelteKit API");

  async function testGetAPI() {
    isLoadingGet = true;
    try {
      const response = await fetch("/api");
      const result = await response.json();
      getResponse = JSON.stringify(result, null, 2);
    } catch (error) {
      getResponse = `Error: ${error instanceof Error ? error.message : "Unknown error"}`;
    }
    isLoadingGet = false;
  }

  async function testPostAPI() {
    isLoadingPost = true;
    try {
      const response = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          key: kvKey,
          value: kvValue,
          fileContent: fileContent,
        }),
      });
      const result = await response.json();
      postResponse = JSON.stringify(result, null, 2);
    } catch (error) {
      postResponse = `Error: ${error instanceof Error ? error.message : "Unknown error"}`;
    }
    isLoadingPost = false;
  }
</script>

<svelte:head>
  <title>SvelteKit + Cloudflare + Alchemy</title>
  <meta
    name="description"
    content="This demo shows SvelteKit running on Cloudflare Workers with Alchemy-managed resources."
  />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</svelte:head>

<main class="container">
  <div
    style="display: flex; justify-content: center; align-items: center; gap: 1rem; padding: 1rem;"
  >
    <img
      src="/svelte-logo.svg"
      alt="Svelte Logo"
      style="width: 80px; height: 80px;"
    />
    <img
      src="/alchemist.webp"
      alt="Alchemy Logo"
      style="width: 130px; height: 130px;"
    />
    <img
      src="/cloudflare-icon.svg"
      alt="Cloudflare Logo"
      style="width: 80px; height: 80px;"
    />
  </div>
  <div>
    <h1>SvelteKit + Cloudflare + Alchemy</h1>
    <p>
      This demo shows SvelteKit running on Cloudflare Workers with
      Alchemy-managed resources.
    </p>
  </div>

  <article>
    <h3>Platform Status</h3>
    <div class="status-list">
      <div class="status-item">
        <span class="status-label">KV Namespace</span>
        <span class="badge"
          >{data.platform.hasKV ? "Connected" : "Not available"}</span
        >
      </div>
      <div class="status-item">
        <span class="status-label">R2 Bucket</span>
        <span class="badge"
          >{data.platform.hasR2 ? "Connected" : "Not available"}</span
        >
      </div>
      <div class="status-item">
        <span class="status-label">Execution Context</span>
        <span class="badge"
          >{data.platform.hasContext ? "Available" : "Not available"}</span
        >
      </div>
    </div>
  </article>

  <article>
    <h3>GET API Demo</h3>
    <p>Test the GET endpoint to read current data</p>

    <button onclick={testGetAPI} disabled={isLoadingGet}>
      {isLoadingGet ? "Loading..." : "Test GET /api"}
    </button>

    {#if getResponse}
      <div>
        <h4 style="margin: 1rem 0 0.5rem 0; color: #ffffff; font-size: 1rem;">
          GET Response:
        </h4>
        <pre><code>{getResponse}</code></pre>
      </div>
    {/if}
  </article>

  <article>
    <h3>POST API Demo</h3>
    <p>Test the POST endpoint to store new data</p>

    <div class="form-grid">
      <label>
        KV Key
        <input bind:value={kvKey} placeholder="demo-key" />
      </label>
      <label>
        KV Value
        <input bind:value={kvValue} placeholder="Hello from SvelteKit!" />
      </label>
    </div>

    <label>
      File Content
      <textarea bind:value={fileContent} placeholder="Content to store in R2"
      ></textarea>
    </label>

    <button onclick={testPostAPI} disabled={isLoadingPost}>
      {isLoadingPost ? "Storing..." : "Store Data"}
    </button>

    {#if postResponse}
      <div>
        <h4 style="margin: 1rem 0 0.5rem 0; color: #ffffff; font-size: 1rem;">
          POST Response:
        </h4>
        <pre><code>{postResponse}</code></pre>
      </div>
    {/if}
  </article>

  <div class="content-grid">
    {#if data.kv}
      <article>
        <h3>KV Store Demo</h3>
        <pre><code>{JSON.stringify(data.kv, null, 2)}</code></pre>
      </article>
    {/if}

    {#if data.r2}
      <article>
        <h3>R2 Storage Demo</h3>
        {#if data.r2.error}
          <p><strong>Error:</strong> {data.r2.error}</p>
        {:else}
          <div style="margin-bottom: 1rem;">
            <div>Bucket Status: {data.r2.bucketName}</div>
            <div>Objects in bucket: {data.r2.objectCount}</div>
          </div>

          {#if data.r2.objects && data.r2.objects.length > 0}
            <div>
              <div style="font-weight: 500; margin-bottom: 0.5rem;">
                Recent Objects
              </div>
              <div class="object-list">
                {#each data.r2.objects as obj}
                  <div class="object-item">
                    <a href="/api/r2/{obj.key}" target="_blank">{obj.key}</a> - {obj.size}
                    bytes
                  </div>
                  <small style="display: block;">{obj.modified}</small>
                {/each}
              </div>
            </div>
          {:else}
            <p><em>No objects in bucket yet</em></p>
          {/if}
        {/if}
      </article>
    {/if}
  </div>

  <article>
    <h3>Documentation</h3>
    <div style="display: flex; flex-direction: column; gap: 0.75rem;">
      <div>
        Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read
        the SvelteKit documentation
      </div>
      <div>
        Visit <a href="https://alchemy.run">alchemy.run</a> to learn more about Alchemy
      </div>
    </div>
  </article>
</main>
