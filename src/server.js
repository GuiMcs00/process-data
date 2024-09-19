import express from "express";
import multer from "multer";
import { processCsvInStreaming } from "./helpers/csvProcessor.js";
import { rowToJson } from "./helpers/jsonConverter.js";

const app = express();
const upload = multer({ dest: "uploads/" });


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

app.post("/upload", upload.single("csv"), async (req, res) => {
  try {
    if (req.file) {

      const filePath = req.file.path;

      const onData = (row) => {
        const jsonData = rowToJson(row);
        res.write(jsonData + "\n")
      }

      const onEnd = () => { res.end() };

      const onError = (error) => {
        console.error("Erro ao ler o CSV", error);
        res.status(500).send("Erro ao processar o CSV");
      }
    }

    processCsvInStreaming(filePath, onData, onEnd, onError);

  } catch (error) {
    res.status(500).send("Error processing file");
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
