const fs = require('fs');
const path = require('path');

// Function to parse the diff file
function parseDiffFile(filePath) {
    const data = fs.readFileSync(filePath, 'utf-8');
    const changes = [];
    let currentFile = '';
    let currentLine = 0;

    data.split('\n').forEach(line => {
        if (line.startsWith('+++ ')) {
            currentFile = line.split(' ')[1]; // Get the file name from the diff
        } else if (line.startsWith('@@')) {
            const match = line.match(/@@ -\d+,\d+ \+(\d+),\d+ @@/);
            if (match) {
                currentLine = parseInt(match[1], 10); // Start line number for changes
            }
        } else if (line.startsWith('+') && !line.startsWith('++')) {
            // This line is added code
            changes.push({
                file: currentFile,
                line: currentLine,
                code: line.substring(1) // Remove the leading '+'
            });
            currentLine++; // Increment the line number for next change
        }
    });

    return changes;
}

// Main execution
function main() {
    const diffFilePath = path.join(__dirname, '../../diff.txt'); // Adjust this if needed
    const parsedResults = parseDiffFile(diffFilePath);
    console.log(JSON.stringify(parsedResults)); // Output JSON
}

// Call the main function to execute
main();
