import { rowToJson } from './jsonConverter'

describe('JSON Converter', () => {
    test('Should convert a JavaScript object to JSON string', () => {

        const mockRow = {
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

        const result = rowToJson(mockRow);

        const expectedJson = JSON.stringify(mockRow);

        expect(result).toBe(expectedJson);

        expect(typeof result).toBe('string');
    });
});