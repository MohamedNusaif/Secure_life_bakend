import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import authRoutes from "./routes/auth.routes";
import leadRoutes from "./routes/lead.routes";
import planRoutes from "./routes/plan.routes";
import advisorRoutes from "./routes/advisor.route";

const app = express();


// ===============================
// CORS
// ===============================

const allowedOrigins = [
  "http://localhost:3000",
  "https://secure-life-frontend-q13z8wwlh-mohamednusaifs-projects.vercel.app",
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error(`CORS blocked: ${origin}`));
    },

    credentials: true,

    methods: [
      "GET",
      "POST",
      "PUT",
      "PATCH",
      "DELETE",
      "OPTIONS",
    ],

    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],
  })
);


// ===============================
// SECURITY
// ===============================

app.use(helmet());


// ===============================
// BODY PARSER
// ===============================

app.use(express.json());


// ===============================
// RATE LIMIT
// ===============================

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
});

app.use(limiter);


// ===============================
// HEALTH CHECK
// ===============================

app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "SecureLife API is running",
  });
});


// ===============================
// ROUTES
// ===============================

app.use("/api/auth", authRoutes);

app.use("/api/leads", leadRoutes);

app.use("/api/plans", planRoutes);

app.use("/api/advisors", advisorRoutes);


// ===============================
// EXPORT
// ===============================

export default app;