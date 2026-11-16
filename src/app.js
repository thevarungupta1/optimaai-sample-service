const express = require("express");

function createApp() {
  const app = express();

  app.disable("x-powered-by");

  app.get("/health", (_req, res) => {
    res.status(200).json({
      status: "ok",
      service: "optimaai-sample-service",
    });
  });

  app.get("/hello", (_req, res) => {
    res.status(200).json({
      message: "Hello from Optima AI sample service",
    });
  });

  return app;
}

module.exports = { createApp };
