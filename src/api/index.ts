import express, { Application } from "express";
import bodyParser from "body-parser";
import tablesController from "./controllers/table.controller";
import columnController from "./controllers/column.controller";

const app: Application = express();

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.use("/api/table", tablesController);

app.use("/api/column", columnController);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
