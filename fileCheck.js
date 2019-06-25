/* eslint-disable no-console */
'use strict';
import fs from 'fs';
import url from 'url';
import childProcess from 'child_process';
import path from 'path';
import {openLogFile} from './logging';
import util from 'util';

const stat = util.promisify(fs.stat);

async function isExecutableCheck({fileURL}) {
    // The UIDs are GIDs are bit masks which should be check with bit
    // wise operators
    /* eslint-disable no-bitwise */
    const fileStat = await stat(fileURL);
    const pUID = process.getuid();
    const pGIDs = process.getgroups();
    // create a comparison mask to see if anyone can execute the file
    let comparisonMask = fs.constants.S_IXOTH;
    // If the owner of the file is the executing user add the
    // executable user constant to the comparison mask
    if (fileStat.uid === pUID) {
        comparisonMask |= fs.constants.S_IXUSR;
    }
    // If the group of the file is in the users groups add
    // the executable group constant to the comparison mask
    if (pGIDs.includes(fileStat.gid)) {
        comparisonMask |= fs.constants.S_IXGRP;
    }
    // Bitwise and the comparison mask against the current mode
    //  if the return value is zero then the file is not executable
    const resultMask = fileStat.mode & comparisonMask;
    if (resultMask === 0) {
        return false;
    } else {
        return 'Executable';
    }
    /* eslint-enable no-bitwise */
}

function executeProcess(fileLocation, name, parentDirectories) {
    const directory = path.dirname(fileLocation);
    process.chdir(directory);
    const child = childProcess.spawn(fileLocation);
    openLogFile(
        fileLocation,
        name,
        parentDirectories,
        child.stdout,
        child.stderr
    );
    child.stdout.on('data', ( data ) => {
        console.log(`stdout: ${data}`);
    });

    child.stderr.on('data', ( data ) => {
        console.error(`stderr: ${data}`);
    });

    child.on('close', ( code ) => {
        console.log(`child process exited with code ${code}`);
    });
}

export const isExecutable = {
    check: isExecutableCheck,
    execute: executeProcess,
    display: 'Executables',
    type: 'Executable',
};

function isHTMLCheck({file}) {
    if (file.endsWith('.html')) {
        return 'HTML';
    } else {
        return false;
    }
}

function htmlExecute(fileLocation, name, parentDirectories) {
    const fullName = `${parentDirectories}-${name}`;
    const fileURL = url.format({
        pathname: fileLocation,
        protocol: 'file:',
        slashes: true,
    });
    window.open(fileURL, fullName);
}

export const isHTML = {
    check: isHTMLCheck,
    execute: htmlExecute,
    display: 'HTML pages',
    type: 'HTML',
};

function isSWFCheck({file}) {
    if (file.endsWith('.swf')) {
        return 'SWF';
    } else {
        return false;
    }
}

function swfExecute(fileLocation, name, parentDirectories) {
    const fullName = `${parentDirectories}-${name}`;
    const directory = path.dirname(fileLocation);
    process.chdir(directory);
    const fileURL = url.format({
        pathname: fileLocation,
        protocol: 'file:',
        slashes: true,
    });
    window.open(fileURL, fullName, 'nodeIntegration=no, contextIsolation=yes');
}

export const isSWF = {
    check: isSWFCheck,
    execute: swfExecute,
    display: 'SWF pages',
    type: 'SWF',
};

export const fileChecks = [
    isSWF,
    isHTML,
    isExecutable,
];

export function getTypes(fileChecks) {
    const fileTypes = fileChecks.map(({type}) => type);
    return new Set(fileTypes);
}
