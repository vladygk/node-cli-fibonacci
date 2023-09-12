#!/usr/bin/env node


import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import gradient from "gradient-string";
import inquirer from "inquirer";
import { createSpinner } from 'nanospinner'
import figlet from 'figlet';


let number;
const memo = {};

const sleep = (ms = 3000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
    const message = chalkAnimation.neon('Welcome to Even-Above-54 Fibonacci Calculator! a.k.a. EA54FC');
    await sleep();
    message.stop();

    console.log(`
    This software was developed 
    to help ${chalk.greenBright('Demetrios')} calculate
    a seemingly ${chalk.redBright('impossible')} calculations 🫠  🙃 🫣
    of the ${chalk.cyan('Fibonacci')} sequence ☠️  ☠️  ☠️.
    `);
}

function calculateFibonacci(num) {
    if (num <= 2) {
        return 1;
    }

    if (memo[num]) {
        return memo[num];
    }

    const value = calculateFibonacci(num - 1) + calculateFibonacci(num - 2);
    memo[num] = value;

    return value
}

async function getNumber() {
    const answer = await inquirer.prompt({
        name: 'number',
        type: 'input',
        message: `Enter a ${chalk.greenBright('number')} and I will tell you the ${chalk.cyan('fibonacci')} of that number (I can do it even with ${chalk.red('54')}): \n`
    });
    number = answer.number;

    await handleInput(number);
}


async function handleInput(num) {
    const spinner = createSpinner('Not really loading, I\'m just pretending...').start()
    await sleep(2000);
    if (num < 0) {
        spinner.error({ text: chalk.redBright('There is no fibonacci of negative numbers, silly') });
        process.exit(1);

    } else if (num == 0) {
        spinner.warn({ text: 'Kind of a border case!' });
        chalkAnimation.rainbow(`Answer is 0\n`);
        await sleep(3000);
        await goodbye();

    } else {
        spinner.success();
        const result = calculateFibonacci(num);
        chalkAnimation.rainbow(`Answer is ${result}\n`);
        await sleep(3000);


    }

}

function goodbye() {
    //console.clear();
    const msg = 'Powered by Fibonacci technology';
    figlet(msg, function (err, data) {

        console.log(gradient.instagram.multiline(data));
        process.exit(0);
    });

}

await welcome();
await getNumber();
goodbye();

