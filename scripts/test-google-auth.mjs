import assert from "node:assert";

const BASE_URL = "http://localhost:3000";

async function run() {
  console.log("=== Testing Google Auth Endpoint ===");

  // 1. Missing email
  const res1 = await fetch(`${BASE_URL}/api/auth/google`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({}),
  });
  assert.strictEqual(res1.status, 400, "Should reject empty body");
  console.log("✓ Empty body rejected with 400");

  const testEmail = `test-${Date.now()}@digitalmarketingwithsid.com`;

  // 2. Request OTP for Google Account
  const res2 = await fetch(`${BASE_URL}/api/auth/google`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: testEmail, name: "Sid Test" }),
  });
  const data2 = await res2.json();
  assert.strictEqual(res2.status, 200, "Should accept valid email");
  assert.strictEqual(data2.success, true, "Should succeed in requesting OTP");
  assert.strictEqual(data2.code, undefined, "CRITICAL: OTP code must NEVER be returned in response!");
  assert.strictEqual(data2.otp, undefined, "CRITICAL: OTP must NEVER be returned in response!");
  console.log("✓ Google OTP requested successfully; NO plaintext code exposed in response");

  // 3. Invalid OTP verification attempt
  const res3 = await fetch(`${BASE_URL}/api/auth/google`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: testEmail, code: "000000" }),
  });
  const data3 = await res3.json();
  assert.strictEqual(res3.status, 400, "Should reject wrong code");
  assert.ok(data3.error, "Should return error message");
  console.log("✓ Invalid OTP code rejected properly with 400");

  console.log("\nALL GOOGLE AUTH TESTS PASSED!");
}

run().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});
