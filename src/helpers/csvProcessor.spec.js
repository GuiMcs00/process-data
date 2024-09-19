import { processCsvInStreaming } from './csvProcessor';
import fs from 'fs';
import csvParser from 'csv-parser';

jest.mock("fs");
jest.mock("csv-parser");

describe("CSV readCsvInStreaming", () => {
    let onDataMock, onEndMock, onErrorMock

    beforeEach(() => {
        onDataMock = jest.fn();
        onEndMock = jest.fn();
        onErrorMock = jest.fn();
    })

    test("Should call onData for each CSV line", () => {
        const mockData = {
            nrInst: "31",
            nrAgencia: "16",
            cdClient: "28843",
            nrCpfCnpj: "792608117956",
            qtPrestacoes: "10",
            vlTotal: "40370.2",
            vlPresta: "4037.02",
            vlMora: "0",
            vlMulta: "0",
            vlAtual: "40370.2",
        };

        const mockStream = {
            pipe: jest.fn().mockReturnThis(),
            on: jest.fn((event, callback) => {
                if (event === 'data') {
                    callback(mockData);
                }
                if (event === 'end') {
                    callback();
                }
                return mockStream;
            }),
        }

        fs.createReadStream.mockReturnValue(mockStream);

        processCsvInStreaming('data.csv', onDataMock, onEndMock, onErrorMock);

        expect(onDataMock).toHaveBeenCalledWith(mockData);

        expect(onEndMock).toHaveBeenCalled();

        expect(onErrorMock).not.toHaveBeenCalled();
    });

});
