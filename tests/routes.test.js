const { test } = require("node:test");
const assert = require("node:assert/strict");
const http = require("node:http");
const { createApp } = require("../src/app");

function listen(app) {
  return new Promise((resolve) => {
    const server = app.listen(0, () => {
      resolve({ server, port: server.address().port });
    });
  });
}

function request(port, path) {
  return new Promise((resolve, reject) => {
    http
      .get(`http://127.0.0.1:${port}${path}`, (res) => {
        let body = "";
        res.on("data", (chunk) => {
          body += chunk;
        });
        res.on("end", () => {
          resolve({ status: res.statusCode, body: JSON.parse(body) });
        });
      })
      .on("error", reject);
  });
}

test("GET /health returns static health payload", async () => {
  const { server, port } = await listen(createApp());
  try {
    const res = await request(port, "/health");
    assert.equal(res.status, 200);
    assert.equal(res.body.status, "ok");
    assert.equal(res.body.service, "optimaai-sample-service");
  } finally {
    server.close();
  }
});

test("GET /hello returns static greeting", async () => {
  const { server, port } = await listen(createApp());
  try {
    const res = await request(port, "/hello");
    assert.equal(res.status, 200);
    assert.equal(res.body.message, "Hello from Optima AI sample service");
  } finally {
    server.close();
  }
});
