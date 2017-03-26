# Zlapps Inc. Technical Assestments

[![Build Status](https://secure.travis-ci.org/SebaSOFT/ZlappsTest.png?branch=master)](https://travis-ci.org/SebaSOFT/ZlappsTest)
[![Dependency Status](https://david-dm.org/SebaSOFT/ZlappsTest/status.svg)](https://david-dm.org/SebaSOFT/ZlappsTest)
[![Dev-Dependency Status](https://david-dm.org/SebaSOFT/ZlappsTest/dev-status.svg)](https://david-dm.org/SebaSOFT/ZlappsTest?type=dev)

## Getting Started

### Prerequisites: deploying

- [Git](https://git-scm.com/)
- [Node.js and npm](nodejs.org) Node >= 6.x.x, npm >= 3.10.x
- [MongoDB](https://www.mongodb.org/) - Keep a running daemon with `mongod`

### Developing

1. Run `npm install` to install server dependencies.
2. Run `mongod` in a separate shell to keep an instance of the MongoDB Daemon running
3. Run `npm run dev` to start the development server.

## Testing

Running `npm test` will run _eslint_ source code validation and the unit/integration tests with _mocha_.