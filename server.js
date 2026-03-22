import express from "express";
import compression from "compression";
import path from "path";
import rateLimit from "express-rate-limit";

const app = express();

const PORT = 3000;

app.use(compression());

const limiter = rateLimit({
    windowMs: 60 * 1000,
    max: 30,
});

app.use(limiter);

app.use(express.static(path.join(process.cwd(), "public")));

app.get("/health", (_req, res) => res.send("OK"));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
