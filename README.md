# TDD - Arabic to English
A small test to change arabic numbers into english numbers (written form), using TDD pattern test validation.

## Index:

- TDD - Arabic to English
- Project Installation
- How does it work?
- Testing
- Technologies

## Project Installation:

This project is installed using Node's Package Manager (NPM). If you don't have it on your machine yet, you can download it here: https://nodejs.org/en/;

To do so, you have to use Linux or MAC's Terminal. If you are using Windows, the command prompt won't work. I recommend downloading Git Bash.

This project contains a package.json file, which means that the necessary libraries will be installed once you type the specified command. Being so, please go to the Terminal and access the root file of your project. Once done, run "npm install".

All libraries will be installed inside the node_modules folder.

## How does it work?

This project uses basically Javascript to convert a numeral (123) to its written form (one hundred and twenty-three). It is done using the command line in a simple command.

To use it, go to the root folder via terminal and type the command:

`node arabic2english.js <my_number_here_without_tags>`

Example: `node arabic2english.js 1345`.
It should return: `one thousand three hundred and forty-five`

## Testing:

As told before, this program uses Jest. So, to run the tests, just go to the root folder and type:

`npm test`
And it should be printed on your terminal.

## Technologies:

NPM
- Node Package Manager - a library that manages the available packages of node.

JEST
- Javascript testing framework.

ECMASCRIPT 6 (2015)
- JavaScript recent updates on language, released in 2015.

GIT
- Version control system, aiming on performance.