# Zlapps Inc. Technical Assestments

[![Build Status](https://secure.travis-ci.org/SebaSOFT/ZlappsTest.png?branch=master)](https://travis-ci.org/SebaSOFT/ZlappsTest)
[![Coverage Status](https://coveralls.io/repos/github/SebaSOFT/ZlappsTest/badge.svg?branch=master)](https://coveralls.io/github/SebaSOFT/ZlappsTest?branch=master)
[![Dependency Status](https://david-dm.org/SebaSOFT/ZlappsTest/status.svg)](https://david-dm.org/SebaSOFT/ZlappsTest)
[![Dev-Dependency Status](https://david-dm.org/SebaSOFT/ZlappsTest/dev-status.svg)](https://david-dm.org/SebaSOFT/ZlappsTest?type=dev)

## Getting Started

### Prerequisites: deploying

- [Git](https://git-scm.com/)
- [Node.js and npm](nodejs.org) Node >= 6.x.x, npm >= 3.10.x
- [Gulp](http://gulpjs.com/) (`npm install --global gulp`)
- [MongoDB](https://www.mongodb.org/) - Keep a running daemon with `mongod`

### Developing

1. Run `npm install` to install server dependencies.
2. Run `mongod` in a separate shell to keep an instance of the MongoDB Daemon running
3. Run `gulp serve` to start the development server. It should automatically open the client in your browser when ready.

## Build & development

Run `gulp build` for building and `gulp serve` for preview.

## Testing

Running `npm test` will run the unit tests with karma.