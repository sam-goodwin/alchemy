import assert from "node:assert";

export async function test({ url }: { url: string | undefined }) {
  console.log("Running Next.js 🙃 E2E test...");

  assert(url, "URL is not set");

  await pollUntilReady(url);

  const key = crypto.randomUUID();
  const value = crypto.randomUUID();

  const putRes = await fetch(`${url}/api/kv/${key}`, {
    method: "PUT",
    body: value,
  });
  assert.equal(putRes.status, 201, "Failed to put key-value pair");

  const getRes = await fetch(`${url}/api/kv/${key}`);
  assert.equal(getRes.status, 200, "Failed to get key-value pair");
  assert.equal(await getRes.text(), value, "Value is not correct");

  const deleteRes = await fetch(`${url}/api/kv/${key}`, {
    method: "DELETE",
  });
  assert.equal(deleteRes.status, 204, "Failed to delete key-value pair");

  const getRes2 = await fetch(`${url}/api/kv/${key}`);
  assert.equal(getRes2.status, 404, "Key-value pair is not deleted");

  console.log("Next.js (😡) E2E test passed");
}

async function pollUntilReady(url: string) {
  let i = 0;
  while (true) {
    const res = await fetch(url);
    if (res.ok) {
      break;
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));
    i++;
    if (i > 10) {
      throw new Error(
        `Worker is not ready after 10 seconds (status: ${res.status}): ${url}`,
      );
    }
  }
}
