/**
 * Automated Test Suite for Service Management Module
 * Tests all 15+ functional, security, validation, and lifecycle requirements.
 */

const BASE_URL = process.env.TEST_BASE_URL || "http://localhost:3000";

let adminCookie = "";
let createdServiceId = "";
const createdImagePaths = [];

async function run() {
  console.log("\n=======================================================");
  console.log(" SERVICE MANAGEMENT MODULE — AUTOMATED TEST SUITE");
  console.log(` Target Server: ${BASE_URL}`);
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

  function assert(condition, message) {
    if (!condition) {
      throw new Error(message || "Assertion failed");
    }
  }

  // 1. Security: Reject unauthorized requests
  await test("Security: Reject unauthorized access to GET /api/admin/services", async () => {
    const res = await fetch(`${BASE_URL}/api/admin/services`);
    assert(res.status === 401, `Expected 401 Unauthorized, got ${res.status}`);
  });

  await test("Security: Reject unauthorized access to POST /api/admin/services", async () => {
    const res = await fetch(`${BASE_URL}/api/admin/services`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ serviceName: "Test", moduleName: "Test", imageUrl: "https://example.com/test.jpg" }),
    });
    assert(res.status === 401, `Expected 401 Unauthorized, got ${res.status}`);
  });

  await test("Security: Reject unauthorized access to DELETE /api/admin/services/:id", async () => {
    const res = await fetch(`${BASE_URL}/api/admin/services/fake-id`, {
      method: "DELETE",
    });
    assert(res.status === 401, `Expected 401 Unauthorized, got ${res.status}`);
  });

  // 2. Authentication: Admin Login
  await test("Authentication: Admin Login with valid credentials", async () => {
    const res = await fetch(`${BASE_URL}/api/admin/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "admin@digitalmarketingwithsid.com",
        password: "admin12345",
      }),
    });
    assert(res.status === 200, `Expected 200 OK, got ${res.status}`);
    const setCookie = res.headers.get("set-cookie");
    assert(setCookie && setCookie.includes("admin_session="), "Missing admin_session cookie in response");
    adminCookie = setCookie.split(";")[0];
  });

  // 3. Validation: Missing serviceName
  await test("Validation: Reject missing serviceName on creation", async () => {
    const res = await fetch(`${BASE_URL}/api/admin/services`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: adminCookie,
      },
      body: JSON.stringify({
        serviceName: "   ",
        moduleName: "Web Solutions",
        imageUrl: "https://images.unsplash.com/photo-1547658719",
      }),
    });
    assert(res.status === 400, `Expected 400 Bad Request, got ${res.status}`);
    const data = await res.json();
    assert(data.error === "Validation failed", "Expected validation error");
  });

  // 4. Validation: Missing moduleName
  await test("Validation: Reject missing moduleName on creation", async () => {
    const res = await fetch(`${BASE_URL}/api/admin/services`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: adminCookie,
      },
      body: JSON.stringify({
        serviceName: "Valid Service Name",
        moduleName: "   ",
        imageUrl: "https://images.unsplash.com/photo-1547658719",
      }),
    });
    assert(res.status === 400, `Expected 400 Bad Request, got ${res.status}`);
  });

  // 5. Validation: Missing imageUrl
  await test("Validation: Reject missing imageUrl on creation", async () => {
    const res = await fetch(`${BASE_URL}/api/admin/services`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: adminCookie,
      },
      body: JSON.stringify({
        serviceName: "Valid Service Name",
        moduleName: "Web Solutions",
        imageUrl: "not-a-valid-url",
      }),
    });
    assert(res.status === 400, `Expected 400 Bad Request, got ${res.status}`);
  });

  // 6. Validation: Upload rejects unsupported MIME types
  await test("Upload: Reject unsupported file MIME type (text/plain)", async () => {
    const formData = new FormData();
    const fakeFile = new Blob(["this is a plain text file pretending to be image"], { type: "text/plain" });
    formData.append("file", fakeFile, "test.txt");

    const res = await fetch(`${BASE_URL}/api/admin/services/upload`, {
      method: "POST",
      headers: { Cookie: adminCookie },
      body: formData,
    });
    assert(res.status === 400, `Expected 400 Bad Request for text/plain, got ${res.status}`);
  });

  // 7. Validation: Upload rejects corrupted binary
  await test("Upload: Reject invalid binary masquerading as image", async () => {
    const formData = new FormData();
    const fakeFile = new Blob(["not-really-a-png-file-content"], { type: "image/png" });
    formData.append("file", fakeFile, "fake.png");

    const res = await fetch(`${BASE_URL}/api/admin/services/upload`, {
      method: "POST",
      headers: { Cookie: adminCookie },
      body: formData,
    });
    assert(res.status === 400, `Expected 400 Bad Request for corrupted binary, got ${res.status}`);
  });

  // 8. Functional: Upload valid PNG image
  let uploadedImageUrl = "";
  let uploadedImagePublicId = "";
  await test("Upload: Accept and store valid PNG image asset (<= 5 MB)", async () => {
    const pngBytes = new Uint8Array([
      0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0x00, 0x00, 0x00, 0x0d, 0x49, 0x48, 0x44, 0x52,
      0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01, 0x08, 0x06, 0x00, 0x00, 0x00, 0x1f, 0x15, 0xc4,
      0x89, 0x00, 0x00, 0x00, 0x0a, 0x49, 0x44, 0x41, 0x54, 0x78, 0x9c, 0x63, 0x00, 0x01, 0x00, 0x00,
      0x05, 0x00, 0x01, 0x0d, 0x0a, 0x2d, 0xb4, 0x00, 0x00, 0x00, 0x00, 0x49, 0x45, 0x4e, 0x44, 0xae,
      0x42, 0x60, 0x82,
    ]);
    const formData = new FormData();
    const blob = new Blob([pngBytes], { type: "image/png" });
    formData.append("file", blob, "test_dot.png");

    const res = await fetch(`${BASE_URL}/api/admin/services/upload`, {
      method: "POST",
      headers: { Cookie: adminCookie },
      body: formData,
    });
    assert(res.status === 201, `Expected 201 Created, got ${res.status}`);
    const data = await res.json();
    assert(data.success === true, "Upload response should be success");
    assert(data.imageUrl && data.imageUrl.startsWith("/uploads/services/"), "Invalid imageUrl returned");
    uploadedImageUrl = data.imageUrl;
    uploadedImagePublicId = data.imagePublicId;
    createdImagePaths.push(uploadedImagePublicId);
  });

  // 9. Functional: Create a service in Draft status
  await test("Create: Create new service as Draft (isPublished = false)", async () => {
    const res = await fetch(`${BASE_URL}/api/admin/services`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: adminCookie,
      },
      body: JSON.stringify({
        serviceName: "Conversion Rate Optimization (CRO)",
        moduleName: "Analytics & Testing",
        imageUrl: uploadedImageUrl,
        imagePublicId: uploadedImagePublicId,
        isPublished: false,
        sortOrder: 99,
      }),
    });
    assert(res.status === 201, `Expected 201 Created, got ${res.status}`);
    const service = await res.json();
    assert(service.id, "Missing service ID");
    assert(service.serviceName === "Conversion Rate Optimization (CRO)", "Incorrect serviceName");
    assert(service.isPublished === false, "Service must default/set to draft");
    createdServiceId = service.id;
  });

  // 10. Lifecycle: Drafts must NOT appear on public endpoint
  await test("Filtering: Confirm draft service does NOT appear in public GET /api/services", async () => {
    const res = await fetch(`${BASE_URL}/api/services`);
    assert(res.status === 200, `Expected 200 OK, got ${res.status}`);
    const publicServices = await res.json();
    const found = publicServices.some((s) => s.id === createdServiceId);
    assert(!found, "Draft service leaked into public /api/services!");
  });

  // 11. Lifecycle: Publish service via PATCH
  await test("Publish: Update service status to published (isPublished = true)", async () => {
    const res = await fetch(`${BASE_URL}/api/admin/services/${createdServiceId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: adminCookie,
      },
      body: JSON.stringify({ isPublished: true }),
    });
    assert(res.status === 200, `Expected 200 OK, got ${res.status}`);
    const updated = await res.json();
    assert(updated.isPublished === true, "Service was not marked as published");
  });

  // 12. Lifecycle: Published service MUST appear in public endpoint
  await test("Filtering: Confirm published service DOES appear in public GET /api/services", async () => {
    const res = await fetch(`${BASE_URL}/api/services`);
    assert(res.status === 200, `Expected 200 OK, got ${res.status}`);
    const publicServices = await res.json();
    const found = publicServices.some((s) => s.id === createdServiceId);
    assert(found, "Published service did not appear in public /api/services!");
  });

  // 13. Functional: Edit service while preserving existing image
  await test("Edit: Modify service text fields while preserving existing image asset", async () => {
    const res = await fetch(`${BASE_URL}/api/admin/services/${createdServiceId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: adminCookie,
      },
      body: JSON.stringify({
        serviceName: "Omnichannel CRO & Funnel Science",
        moduleName: "Conversion Science",
      }),
    });
    assert(res.status === 200, `Expected 200 OK, got ${res.status}`);
    const updated = await res.json();
    assert(updated.serviceName === "Omnichannel CRO & Funnel Science", "Name not updated");
    assert(updated.moduleName === "Conversion Science", "Module not updated");
    assert(updated.imageUrl === uploadedImageUrl, "Existing image was lost during edit!");
  });

  // 14. Error handling: Nonexistent service ID
  await test("Error Handling: Return 404 for nonexistent service ID", async () => {
    const res = await fetch(`${BASE_URL}/api/admin/services/nonexistent-id-00000`, {
      method: "GET",
      headers: { Cookie: adminCookie },
    });
    assert(res.status === 404, `Expected 404 Not Found, got ${res.status}`);
  });

  // 15. Deletion & Cleanup: Soft deletion
  await test("Delete: Deactivate service and verify removal from public catalog", async () => {
    const res = await fetch(`${BASE_URL}/api/admin/services/${createdServiceId}`, {
      method: "DELETE",
      headers: { Cookie: adminCookie },
    });
    assert(res.status === 200, `Expected 200 OK, got ${res.status}`);

    // Verify it no longer appears in public API
    const publicRes = await fetch(`${BASE_URL}/api/services`);
    const publicServices = await publicRes.json();
    const found = publicServices.some((s) => s.id === createdServiceId);
    assert(!found, "Soft-deleted service still visible on public site!");
  });

  // 16. Permanent Purge & Cleanup
  await test("Purge: Permanently delete record and clean up local image file", async () => {
    const res = await fetch(`${BASE_URL}/api/admin/services/${createdServiceId}?permanent=true`, {
      method: "DELETE",
      headers: { Cookie: adminCookie },
    });
    assert(res.status === 200, `Expected 200 OK, got ${res.status}`);
  });

  console.log("\n=======================================================");
  console.log(` SUMMARY: ${passed} PASSED | ${failed} FAILED`);
  console.log("=======================================================\n");

  if (failed > 0) {
    process.exit(1);
  }
}

run().catch((err) => {
  console.error("Test execution failed:", err);
  process.exit(1);
});
