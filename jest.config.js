module.exports = {
    testEnvironment: "jest-environment-jsdom",
    setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
    moduleNameMapper: {
      "^@/components/(.*)$": "<rootDir>/components/$1",
      "^@/lib/(.*)$": "<rootDir>/lib/$1",  // Add this line to map the lib folder
    },
    transform: {
      "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
    },
  };
  