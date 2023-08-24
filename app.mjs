import express from "express";
import cron from "node-cron";
import { publishTask } from "./service/cron.service.mjs";
import { db } from "./models/index.mjs";
import PatternModel from "./models/pattern.model.mjs";
import cors from "cors";

const app = express();

const port = 4040;

const cronJob = cron;

app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

try {
  db.sequelize.authenticate();
  console.log("DB Connected");
} catch (error) {
  console.log("DB Error");
}

var jobs;

// routes
app.get("/cron/pattern", async (req, res) => {
  const pattern = await PatternModel.findOne({});

  if (pattern) {
    return res.json({
      status: "SUCCESS",
      message: "Cron Pattern",
      data: pattern,
    });
  }

  return res.json({
    status: "FAILED",
    message: "Empty Pattern",
    data: null,
  });
});

app.post("/cron/pattern/set", async (req, res) => {
  try {
    const pattern = await PatternModel.findOne({});
    if (!pattern) {
      // create
      await PatternModel.create({
        format: req.body.pattern,
      });

      return res.json({
        status: "SUCCESS",
        message: "Pattern setted",
      });
    }

    // update
    await pattern.update({
      format: req.body.pattern,
    });

    return res.json({
      status: "SUCCESS",
      message: "Pattern setted",
    });
  } catch (error) {
    return res.json({
      status: "FAILED",
      message: "Bad Request",
    });
  }
});

app.post("/cron/start", async (req, res) => {
  try {
    // stop when task is available
    if (!!jobs && jobs) {
      jobs.stop();
    }

    const pattern = await PatternModel.findOne({});

    if (pattern) {
      // new task
      jobs = cronJob.schedule(pattern?.format, publishTask);

      jobs.start();

      return res.json({
        status: "SUCCESS",
        message: "Cron Service Started",
      });
    }

    return res.json({
      status: "FAILED",
      message: "Pattern Not Set",
    });
  } catch (error) {
    return res.json({
      status: "FAILED",
      message: "Bad Request",
    });
  }
});

app.post("/cron/stop", async (req, res) => {
  try {
    jobs.stop();

    return res.json({
      status: "SUCCESS",
      message: "Cron Service Stoped",
    });
  } catch (error) {
    return res.json({
      status: "FAILED",
      message: "Cron doesn't have task",
    });
  }
});

// server
app.listen(port, () => {
  console.log(`Server running on port ${4040}`);
});
