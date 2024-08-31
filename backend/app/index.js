import express from "express";
import { router as api } from "./api/v1/index.js";
import cors from "cors";
export const app = express();

// cors
app.use(cors());
// parse json request body
app.use(express.json());

app.use("/api", api);
app.use("/api/v1", api);

// not found and error handler
app.use((req, res, next) => {
  next({
    message: "Not found",
    status: 404,
  });
});

// error handler
app.use((err, req, res, next) => {
  const { message = "", status = 500 } = err;
  res.status(status);
  res.json({
    error: {
      message,
      status,
    },
  });
});
