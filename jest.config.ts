import type { Config } from 'jest'

const config: Config = {
    testEnvironment: 'jest-environment-jsdom', // Define o ambiente de teste
    testMatch: ['**/*.test.{ts,tsx}'], // Casamento de arquivos de teste
    moduleNameMapper: {
        '^@common/(.*)$': '<rootDir>/src/common/$1',
    },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], // Arquivo de setup global
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest', // Suporte para TypeScript
    },
    collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.d.ts'], // Relatório de cobertura
    coverageDirectory: '<rootDir>/coverage', // Diretório de cobertura
}

export default config
