import { processCsvInStreaming } from "./helpers/csvProcessor.js"; // Lê o CSV em streaming
import { rowToJson } from "./helpers/jsonConverter.js"; // Converte a linha para JSON
import fs from 'fs';

const inputFilePath = "data.csv";

const outputCSVFilePath = "processed_data.csv";
const outputJSONFilePath = "processed_data.json";


const outputCSVStream = fs.createWriteStream(outputCSVFilePath);
const outputJSONStream = fs.createWriteStream(outputJSONFilePath);

const onData = (row) => {
    const jsonData = rowToJson(row);

    // to json
    outputJSONStream.write(jsonData + "\n");

    // to csv
    const csvLine = Object.values(JSON.parse(jsonData)).join(",");
    outputCSVStream.write(csvLine + "\n");
};

const onEnd = () => {
    outputJSONStream.end();
    console.log("Processamento concluído e arquivo salvo em:", outputJSONFilePath);
    outputCSVStream.end();
    console.log("Processamento concluído e arquivo salvo em:", outputCSVFilePath);
};

const onError = (error) => {
    console.error("Erro ao processar o arquivo CSV:", error);
};

processCsvInStreaming(inputFilePath, onData, onEnd, onError);
