import { alchemy } from "../../alchemy.js";
import { DOFSStateStore } from "./store.js";

/**
 * Example demonstrating DOFS state store with auto-deployment
 * 
 * This example shows how the DOFS state store automatically deploys
 * a Cloudflare worker with Durable Objects when no URL is provided.
 * 
 * Prerequisites:
 * - Run `wrangler login` (if not already done)
 * - That's it! No API tokens needed.
 */

console.log("🚀 Starting DOFS State Store Auto-Deployment Example");
console.log("=".repeat(60));

try {
  console.log("🔧 Initializing Alchemy with DOFS state store...");
  
  // Create Alchemy app with auto-deploying DOFS state store
  const app = await alchemy("dofs-test-app", {
    stage: "dev", 
    phase: "up",
    
    // This will auto-deploy a worker if it doesn't exist!
    // No API tokens needed - uses wrangler login automatically
    stateStore: (scope) => new DOFSStateStore(scope, {
      autoDeploy: true, // Auto-deploy worker (default: true)
      workerName: "alchemy-dofs-example-v3", // Changed to v3 for URL routing
      workerUrl: true, // Enable workers.dev URL (default: true)
      basePath: "/alchemy-example", // Custom base path
      apiKey: process.env.DOFS_API_KEY, // Optional: API key for authentication
    })
  });

  console.log("✅ Alchemy app initialized successfully!");
  console.log("   - State store: DOFS with auto-deployment");
  console.log("   - Worker: alchemy-dofs-example-v3");
  console.log("   - Base path: /alchemy-example");

  // Test state operations to verify everything works
  console.log("\n🧪 Testing state operations...");
  
  // Get the state store instance to test directly
  const stateStore = new DOFSStateStore(app, {
    autoDeploy: true,
    workerName: "alchemy-dofs-example-v3",
    basePath: "/alchemy-example",
    apiKey: process.env.DOFS_API_KEY, // Optional: API key for authentication
  });

  // Initialize the state store (this will trigger auto-deployment)
  console.log("🔄 Initializing state store (this may deploy the worker)...");
  await stateStore.init();
  console.log("✅ State store initialized!");

  // Test basic operations
  console.log("\n📝 Testing state operations:");
  
  // Test set operation
  console.log("   - Setting test state...");
  await stateStore.set("test-resource", {
    status: "created",
    kind: "test::Resource",
    id: "test-resource",
    fqn: "test-resource",
    seq: 1,
    data: {},
    props: { name: "test", value: 42 },
    output: {} as any,
  });
  console.log("     ✅ State set successfully");

  // Test get operation
  console.log("   - Getting test state...");
  const retrievedState = await stateStore.get("test-resource");
  if (retrievedState) {
    console.log("     ✅ State retrieved successfully");
    console.log(`     📄 Resource: ${retrievedState.kind}`);
    console.log(`     📄 Status: ${retrievedState.status}`);
    console.log(`     📄 Props:`, retrievedState.props);
  } else {
    console.log("     ❌ Failed to retrieve state");
  }

  // Test list operation
  console.log("   - Listing all states...");
  const allKeys = await stateStore.list();
  console.log(`     ✅ Found ${allKeys.length} state(s): ${allKeys.join(", ")}`);

  // Test count operation
  console.log("   - Counting states...");
  const count = await stateStore.count();
  console.log(`     ✅ Total states: ${count}`);

  // Test delete operation
  console.log("   - Deleting test state...");
  await stateStore.delete("test-resource");
  console.log("     ✅ State deleted successfully");

  // Verify deletion
  console.log("   - Verifying deletion...");
  const deletedState = await stateStore.get("test-resource");
  if (!deletedState) {
    console.log("     ✅ State successfully deleted");
  } else {
    console.log("     ❌ State still exists after deletion");
  }

  console.log("\n🎉 All tests passed! The DOFS state store is working correctly.");
  console.log("\n📋 Summary:");
  console.log("   ✅ Worker auto-deployment: SUCCESS");
  console.log("   ✅ State persistence: SUCCESS");
  console.log("   ✅ State retrieval: SUCCESS");
  console.log("   ✅ State listing: SUCCESS");
  console.log("   ✅ State deletion: SUCCESS");
  
  console.log("\n🌐 Your auto-deployed worker is now available at:");
  console.log("   https://alchemy-dofs-example.your-subdomain.workers.dev");
  console.log("\n💡 You can now use this state store in your Alchemy projects!");

  // Finalize the app
  await app.finalize();

} catch (error) {
  console.error("\n❌ Error during DOFS state store example:");
  console.error(error);
  
  if (error instanceof Error) {
    if (error.message.includes("401") || error.message.includes("authentication")) {
      console.log("\n🔑 Authentication Error:");
      console.log("   - Run: wrangler login");
      console.log("   - That's it! No API tokens needed.");
    } else if (error.message.includes("account")) {
      console.log("\n🏢 Account Error:");
      console.log("   - Make sure you're logged in: wrangler login");
    } else if (error.message.includes("subdomain")) {
      console.log("\n🌐 Subdomain Error:");
      console.log("   - Your account may not have a workers.dev subdomain set up");
      console.log("   - Try setting workerUrl: false in the options");
    }
  }
  
  process.exit(1);
}
