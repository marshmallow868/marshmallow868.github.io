import express from "express";
import compression from "compression";
import path from "path";

const app = express();

const PORT = 3000;

app.use(compression());

app.use(express.static(path.join(process.cwd(), "public")));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
