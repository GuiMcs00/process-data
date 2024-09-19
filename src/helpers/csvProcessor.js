import fs from 'fs';
import csvParser from 'csv-parser';

export const processCsvInStreaming = (inputFile, onData, onEnd, onError) => {
  const readStream = fs.createReadStream(inputFile);

  readStream
      .pipe(csvParser())
      .on('data', onData)
      .on('end', onEnd)
      .on('error', onError);
};
