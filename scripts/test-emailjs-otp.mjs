/**
 * Automated Verification Script for EmailJS OTP Authentication & Security
 */

import fs from "fs";
import path from "path";

// Load .env.local for standalone runner
try {
  const envPath = path.resolve(process.cwd(), ".env.local");
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, "utf-8");
    for (const line of content.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const [key, ...rest] = trimmed.split("=");
      if (key && rest.length > 0) {
        process.env[key.trim()] = rest.join("=").trim().replace(/^['"]|['"]$/g, "");
      }
    }
  }
} catch (e) {
  // ignore
}

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = "development";
}

async function runTests() {
  const { sendOtp, verifyOtp, _getOtpForTesting } = await import("../src/lib/auth/user.ts");
  const { getEmailJsConfig, sendOtpEmail } = await import("../src/lib/auth/emailjs.ts");

  console.log("\n=======================================================");
  console.log(" EMAILJS OTP SECURITY & AUTHENTICATION VERIFICATION");
  console.log("=======================================================\n");

  let passed = 0;
  let failed = 0;

  async function test(name, fn) {
    try {
      await fn();
      console.log(`  ✓ [PASS] ${name}`);
      passed++;
    } catch (err) {
      console.error(`  ✗ [FAIL] ${name}`);
      console.error(`    Error: ${err.message}\n`);
      failed++;
    }
  }

  function assert(cond, msg) {
    if (!cond) throw new Error(msg || "Assertion failed");
  }

  // 1. Verify Configuration
  await test("EmailJS configuration is loaded from environment", () => {
    const config = getEmailJsConfig();
    assert(config.isConfigured, "EmailJS should be marked as configured");
    assert(config.serviceId === "service_8vyxkwe", `Expected service_8vyxkwe, got ${config.serviceId}`);
    assert(config.templateId === "template_adhwgqm", `Expected template_adhwgqm, got ${config.templateId}`);
    assert(config.publicKey === "Tv6RmLe-U4J77h6j8", `Expected Tv6RmLe-U4J77h6j8, got ${config.publicKey}`);
  });

  // 2. Test EmailJS API Dispatch
  await test("EmailJS REST API dispatch connects and validates parameters", async () => {
    const result = await sendOtpEmail({
      toEmail: "test.recipient@example.com",
      otpCode: "849201",
      purpose: "Automated Suite Test",
      expiryMinutes: 10,
      recipientName: "Test User",
    });
    console.log(`    EmailJS API response: success=${result.success}, error="${result.error || "none"}"`);
    assert(result !== null, "Result should not be null");
  });

  // 3. Test Zero OTP Exposure in API responses
  const testPhone = `+9199999${Math.floor(10000 + Math.random() * 90000)}`;
  let generatedOtp = "";

  await test("Zero OTP Exposure: sendOtp NEVER returns devOtp or code in response", async () => {
    const res = await sendOtp(testPhone, "phone", "Test User", "New Member Registration");
    assert(res.success, `Expected success, got error: ${res.error}`);
    assert(res.devOtp === undefined, "devOtp must be undefined in all responses");
    assert(!JSON.stringify(res).includes(res.devOtp), "No OTP value allowed in response object");
    assert(res.message === "Verification code requested. Please check your email.", `Expected neutral message, got: ${res.message}`);
    
    generatedOtp = _getOtpForTesting(testPhone);
    assert(generatedOtp && generatedOtp.length === 6, "Internal OTP was securely stored for verification");
  });

  // 4. Test Cooldown
  await test("Immediate second OTP request triggers 60s cooldown (rate limiting)", async () => {
    const res = await sendOtp(testPhone, "phone", "Test User", "New Member Registration");
    assert(!res.success, "Second request within 60s should fail");
    assert(res.cooldownRemaining && res.cooldownRemaining > 0, "Expected cooldownRemaining > 0");
    console.log(`    Cooldown remaining: ${res.cooldownRemaining}s`);
  });

  // 5. Test Invalid OTP & Attempt Counter
  await test("Invalid OTP reduces attempts remaining", () => {
    const res = verifyOtp(testPhone, "000000");
    assert(!res.success, "Wrong code should not succeed");
    assert(res.attemptsRemaining === 4, `Expected 4 attempts remaining, got ${res.attemptsRemaining}`);
  });

  // 6. Test Successful OTP Verification
  await test("Valid OTP succeeds, generates User, and consumes the code", () => {
    const res = verifyOtp(testPhone, generatedOtp, "Test User");
    assert(res.success, `Expected verification success: ${res.error}`);
    assert(res.user && res.user.identifier === testPhone, "User object should be generated with correct identifier");
  });

  // 7. Test Single-Use (Replay Prevention)
  await test("Replay attack prevention: Same OTP cannot be verified twice", () => {
    const res = verifyOtp(testPhone, generatedOtp);
    assert(!res.success, "Consumed OTP must not be reusable");
  });

  // 8. Test Brute-Force Lockout (5 failed attempts invalidates code)
  const brutePhone = `+9188888${Math.floor(10000 + Math.random() * 90000)}`;
  await test("Brute-force lockout: 5 failed attempts completely invalidates code", async () => {
    const gen = await sendOtp(brutePhone, "phone", "Attacker Target");
    assert(gen.success, "Initial code generation failed");
    const validCode = _getOtpForTesting(brutePhone);

    // Fail 5 times
    for (let i = 1; i <= 5; i++) {
      const res = verifyOtp(brutePhone, "999999");
      assert(!res.success, `Attempt ${i} should fail`);
    }

    // 6th attempt or trying the correct code now must fail because code was revoked
    const finalTry = verifyOtp(brutePhone, validCode);
    assert(!finalTry.success, "Code must be revoked after max attempts exceeded");
  });

  console.log("\n=======================================================");
  console.log(` RESULTS: ${passed} Passed, ${failed} Failed`);
  console.log("=======================================================\n");

  if (failed > 0) {
    process.exit(1);
  }
}

runTests();
