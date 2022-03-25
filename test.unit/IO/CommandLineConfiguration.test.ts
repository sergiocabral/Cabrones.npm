import {CommandLineConfiguration, InvalidArgumentError} from '../../ts';

describe('CommandLineConfiguration', () => {
    describe('Valores padrão', () => {
        test('caseInsensitiveForName', () => {
            // Arrange, Given

            const expectedValue = false;

            // Act, When

            const sut = new CommandLineConfiguration();

            // Assert, Then

            expect(sut.caseInsensitiveForName).toBe(expectedValue);
        });
        test('caseInsensitiveForValue', () => {
            // Arrange, Given

            const expectedValue = false;

            // Act, When

            const sut = new CommandLineConfiguration();

            // Assert, Then

            expect(sut.caseInsensitiveForValue).toBe(expectedValue);
        });
        test('attribution', () => {
            // Arrange, Given

            const expectedValue = '=';

            // Act, When

            const sut = new CommandLineConfiguration();

            // Assert, Then

            expect(sut.attribution).toBe(expectedValue);
        });
        test('quotes', () => {
            // Arrange, Given

            const expectedValue: Array<[string, string]> = [
                ['"', '"'],
                ["'", "'"],
                ['`', '`'],
                ['´', '´']
            ];

            // Act, When

            const sut = new CommandLineConfiguration();

            // Assert, Then

            expect(sut.quotes.length).toBe(expectedValue.length);
            for (let i = 0; i < sut.quotes.length; i++) {
                expect(sut.quotes[i]).toStrictEqual(expectedValue[i]);
            }
        });
    });
    describe('Informar propriedades no construtor da classe', () => {
        test('caseInsensitiveForName', () => {
            // Arrange, Given

            const expectedValue = true;

            // Act, When

            const sut = new CommandLineConfiguration({
                caseInsensitiveForName: expectedValue
            });

            // Assert, Then

            expect(sut.caseInsensitiveForName).toBe(expectedValue);
        });
        test('caseInsensitiveForValue', () => {
            // Arrange, Given

            const expectedValue = true;

            // Act, When

            const sut = new CommandLineConfiguration({
                caseInsensitiveForValue: expectedValue
            });

            // Assert, Then

            expect(sut.caseInsensitiveForValue).toBe(expectedValue);
        });
        test('attribution', () => {
            // Arrange, Given

            const expectedValue = Math.random().toString();

            // Act, When

            const sut = new CommandLineConfiguration({
                attribution: expectedValue
            });

            // Assert, Then

            expect(sut.attribution).toBe(expectedValue);
        });
        test('quotes', () => {
            // Arrange, Given

            const expectedValue: Array<[string, string]> = [
                ['"', '"']
            ];

            // Act, When

            const sut = new CommandLineConfiguration({
                quotes: expectedValue
            });

            // Assert, Then

            expect(sut.quotes).toStrictEqual(expectedValue);
        });
    })
    describe('Deve poder modificar as propriedades', () => {
        test('caseInsensitiveForName', () => {
            // Arrange, Given

            const sut = new CommandLineConfiguration();
            const initialValue = sut.caseInsensitiveForName;
            const newValue = !initialValue

            // Act, When

            sut.caseInsensitiveForName = newValue;

            // Assert, Then

            expect(sut.caseInsensitiveForName).not.toBe(initialValue);
            expect(sut.caseInsensitiveForName).toBe(newValue);
        });
        test('caseInsensitiveForValue', () => {
            // Arrange, Given

            const sut = new CommandLineConfiguration();
            const initialValue = sut.caseInsensitiveForValue;
            const newValue = !initialValue

            // Act, When

            sut.caseInsensitiveForValue = newValue;

            // Assert, Then

            expect(sut.caseInsensitiveForValue).not.toBe(initialValue);
            expect(sut.caseInsensitiveForValue).toBe(newValue);
        });
        test('attribution', () => {
            // Arrange, Given

            const sut = new CommandLineConfiguration();
            const initialValue = sut.attribution;
            const newValue = Math.random().toString();

            // Act, When

            sut.attribution = newValue;

            // Assert, Then

            expect(sut.attribution).not.toBe(initialValue);
            expect(sut.attribution).toBe(newValue);
        });
        test('quotes', () => {
            // Arrange, Given

            const sut = new CommandLineConfiguration();
            const initialValue = sut.quotes;
            const newValue: Array<[string, string]> = [
                ['[', ']'],
                ['<', '>']
            ];

            // Act, When

            sut.quotes = newValue;

            // Assert, Then

            expect(sut.quotes).not.toBe(initialValue);
            expect(sut.quotes).toStrictEqual(newValue);
        });
    });
    describe('Validação de valores', () => {
        test('attribution não pode ser vazio', () => {
            // Arrange, Given

            const sut = new CommandLineConfiguration();
            const emptyValue = '';

            // Act, When

            const action = () => sut.attribution = emptyValue;

            // Assert, Then

            expect(action).toThrow(InvalidArgumentError);
        });
        test('quotes não pode ser lista vazia', () => {
            // Arrange, Given

            const sut = new CommandLineConfiguration();
            const emptyValue: Array<[string, string]> = [];

            // Act, When

            const action = () => sut.quotes = emptyValue;

            // Assert, Then

            expect(action).toThrow(InvalidArgumentError);
        });
        test('quotes, aspa esquerda não pode ser vazia', () => {
            // Arrange, Given

            const sut = new CommandLineConfiguration();
            const invalidValue: Array<[string, string]> = [
                ['', '>']
            ];

            // Act, When

            const action = () => sut.quotes = invalidValue;

            // Assert, Then

            expect(action).toThrow(InvalidArgumentError);
        });
        test('quotes, aspa direita não pode ser vazia', () => {
            // Arrange, Given

            const sut = new CommandLineConfiguration();
            const invalidValue: Array<[string, string]> = [
                ['<', '']
            ];

            // Act, When

            const action = () => sut.quotes = invalidValue;

            // Assert, Then

            expect(action).toThrow(InvalidArgumentError);
        });
    });
});
