import { FileSystemFields, HelperFileSystem } from '../../../ts';
import fs from 'fs';

describe('Classe FileSystemFields', () => {
  const originals: Record<string, any> = {};

  beforeEach(() => {
    originals['FileSystemFields.isEquals'] = FileSystemFields.isEquals;
    originals['FileSystemFields.diff'] = FileSystemFields.diff;
  });

  afterEach(() => {
    FileSystemFields.isEquals = originals['FileSystemFields.isEquals'];
    FileSystemFields.diff = originals['FileSystemFields.diff'];

    const items = fs.readdirSync('.').filter(item => item.startsWith('test-'));
    for (const item of items) {
      HelperFileSystem.deleteRecursive(item);
    }
  });
  describe('Construtor', () => {
    test('deve poder instanciar sem parâmetros', () => {
      // Arrange, Given
      // Act, When

      const sut = new FileSystemFields();

      // Assert, Then

      expect(sut.path).toBeUndefined();
    });
    test('deve poder instanciar especificando o caminho', () => {
      // Arrange, Given

      const path = Math.random().toString();

      // Act, When

      const sut = new FileSystemFields(path);

      // Assert, Then

      expect(sut.path).toBe(path);
    });
  });
  describe('isEquals', () => {
    test('isEquals deve chamar diff', () => {
      // Arrange, Given

      const mockFunction = jest.fn(() => []);
      FileSystemFields.diff = mockFunction;

      // Act, When

      FileSystemFields.isEquals(undefined, undefined);

      // Assert, Then

      expect(mockFunction).toBeCalledTimes(1);
    });
    test('isEquals da instância deve chamar o método estático', () => {
      // Arrange, Given

      const mockFunction = jest.fn();
      FileSystemFields.isEquals = mockFunction;

      // Act, When

      new FileSystemFields().isEquals(undefined);

      // Assert, Then

      expect(mockFunction).toBeCalledTimes(1);
    });
    test('isEquals deve ser TRUE quando o array de diff NÃO TEM ITENS', () => {
      // Arrange, Given

      const expectedResult = true;

      const mockFunction = jest.fn(() => []);
      FileSystemFields.diff = mockFunction;

      // Act, When

      const result = FileSystemFields.isEquals(undefined, undefined);

      // Assert, Then

      expect(result).toBe(expectedResult);
    });
    test('isEquals deve ser FALSE quando o array de diff TEM ITENS', () => {
      // Arrange, Given

      const expectedResult = false;

      const mockFunction = jest.fn(() => ['123']);
      FileSystemFields.diff = mockFunction;

      // Act, When

      const result = FileSystemFields.isEquals(undefined, undefined);

      // Assert, Then

      expect(result).toBe(expectedResult);
    });
  });
  describe('diff', () => {
    test('diff da instância deve chamar o método estático', () => {
      // Arrange, Given

      const mockFunction = jest.fn();
      FileSystemFields.diff = mockFunction;

      // Act, When

      new FileSystemFields().diff(undefined);

      // Assert, Then

      expect(mockFunction).toBeCalledTimes(1);
    });
  });
  describe('diff', () => {
    test('dois valores undefined retorna vazio', () => {
      // Arrange, Given

      const fields1 = undefined;
      const fields2 = undefined;

      // Act, When

      const changes = FileSystemFields.diff(fields1, fields2);

      // Assert, Then

      expect(changes.length).toBe(0);
    });
    test('se pelo menos um é undefined retorna todos os campos', () => {
      // Arrange, Given

      const expectedFields = Object.keys(new FileSystemFields());
      const fields1 = undefined;
      const fields2 = {} as FileSystemFields;

      // Act, When

      const changes1 = FileSystemFields.diff(fields1, fields2);
      const changes2 = FileSystemFields.diff(fields2, fields1);

      // Assert, Then

      expect(changes1).toStrictEqual(expectedFields);
      expect(changes2).toStrictEqual(expectedFields);
    });
    test('Todos os campos iguais', () => {
      // Arrange, Given

      const fields1 = new FileSystemFields('.');
      const fields2 = new FileSystemFields('.');

      // Act, When

      const changes = FileSystemFields.diff(fields1, fields2);

      // Assert, Then

      expect(changes.length).toBe(0);
    });
    describe('Teste de campos diferentes', () => {
      test('exists', () => {
        // Arrange, Given

        const fileExists = '.';
        const fileNotExists = 'not-exists';

        const fileExistsFields = new FileSystemFields(fileExists);
        const fileNotExistsFields = new FileSystemFields(fileNotExists);

        // Act, When

        const changes = FileSystemFields.diff(
          fileExistsFields,
          fileNotExistsFields
        );

        // Assert, Then

        expect(changes).toContain('exists');
      });
    });
    describe('Verificação de campos', () => {
      test('quando não informado', () => {
        // Arrange, Given
        // Act, When

        const sut: Record<string, unknown> = new FileSystemFields() as Record<
          keyof FileSystemFields,
          unknown
        >;

        // Assert, Then

        for (const fieldName of Object.keys(sut)) {
          expect(sut[fieldName]).toBeUndefined();
        }
      });
      describe('path', () => {
        test('valor é igual ao informado.', () => {
          // Arrange, Given

          const path = Math.random().toString();

          // Act, When

          const sut = new FileSystemFields(path);

          // Assert, Then

          expect(sut.path).toBe(path);
        });
      });
      describe('exists', () => {
        test('deve existir', () => {
          // Arrange, Given

          const fileExists = '.';

          // Act, When

          const sut = new FileSystemFields(fileExists);

          // Assert, Then

          expect(sut.exists).toBe(true);
        });
        test('não deve existir', () => {
          // Arrange, Given

          const fileExists = 'not-exists';

          // Act, When

          const sut = new FileSystemFields(fileExists);

          // Assert, Then

          expect(sut.exists).toBe(false);
        });
      });
    });
  });
});
