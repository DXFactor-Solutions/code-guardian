const fs = require('fs');
const path = require('path');

// Function to parse the diff file
function parseDiffFile(filePath) {
    let data;
    try {
        data = fs.readFileSync(filePath, 'utf-8');
    } catch (error) {
        console.error("Error reading file:", error);
        return [];
    }

    const changes = [];
    let currentFile = '';
    let currentLine = 0;

    data.split('\n').forEach(line => {
        console.log("Processing line:", line); // Debug log for each line
        if (!line.trim()) return; // Skip empty lines

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

    // Print results for debugging
    console.log("Parsed Results:", parsedResults);

    // Ensure the results are valid JSON before converting
    if (Array.isArray(parsedResults) && parsedResults.length > 0) {
        console.log(JSON.stringify(parsedResults)); // Output JSON
    } else {
        console.error("Parsed results are empty or not an array.");
    }
}

// Call the main function to execute
main();
