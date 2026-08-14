import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import authRoutes from "./routes/auth.routes";
import leadRoutes from "./routes/lead.routes";
import planRoutes from "./routes/plan.routes";
//import planRoutes from "./routes/planRoutes";
import advisorRoutes from './routes/advisor.route';


const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(helmet());

app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
});

app.use(limiter);

app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "SecureLife API is running",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/leads", leadRoutes);
app.use("/api/plans", planRoutes);
app.use("/api/leads", leadRoutes);
app.use('/api/advisors', advisorRoutes);


export default app;