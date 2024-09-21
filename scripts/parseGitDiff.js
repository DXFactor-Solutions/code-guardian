const fs = require('fs');
const readline = require('readline');

async function parseDiff(filePath) {
    const diffStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({
        input: diffStream,
        crlfDelay: Infinity
    });

    let fileName = null;
    let lineNumber = null;
    const changes = [];

    for await (const line of rl) {
        // Match file name (e.g., "+++ b/file_name")
        const fileMatch = line.match(/^\+\+\+ (.+)/);
        if (fileMatch) {
            fileName = fileMatch[1];
            continue;
        }

        // Match line number block (e.g., "@@ -1,3 +1,9 @@")
        const lineMatch = line.match(/^@@ -\d+,\d+ \+(\d+)/);
        if (lineMatch) {
            lineNumber = parseInt(lineMatch[1], 10);
            continue;
        }

        // Match added lines (e.g., lines starting with '+')
        if (line.startsWith('+') && !line.startsWith('+++')) {
            const changedCode = line.slice(1).trim();
            changes.push({
                file: fileName,
                line: lineNumber,
                code: changedCode
            });
            lineNumber++;
        }
    }
    return changes;
}

// Export the function
module.exports = { parseDiff };
