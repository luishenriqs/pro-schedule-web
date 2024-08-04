/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs')
const { exec } = require('child_process')

// Check the current limit
fs.promises
    .open('somefile', 'w')
    .then((file) => {
        console.log('Initial file descriptor limit:', file.fd)
        file.close()
    })
    .catch((err) => console.error('Error opening file:', err))

// Increase the limit (Windows example)
exec(
    'powershell -Command "Get-ItemProperty HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Policies\\Explorer"',
    (error, stdout, stderr) => {
        if (error) {
            console.error(`Error increasing limit: ${error.message}`)
            return
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`)
            return
        }
        console.log('File descriptor limit increased')
    }
)
