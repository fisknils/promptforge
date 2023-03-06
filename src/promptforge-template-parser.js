const fs = require('fs').promises;
const path = require('path');

// This function will recursively parse a file and all its includes
async function parseFile(filepath, variables = {}) {
    // Read the file contents
    const content = await fs.readFile(filepath, 'utf-8');

    // Replace any variables in the content
    let parsedContent = content;
    for (const [variable, value] of Object.entries(variables)) {
        parsedContent = parsedContent.replace(new RegExp(`{{${variable}}}`, 'g'), value);
    }

    // Find all include statements in the content
    const includeRegex = /{{\s*include\s*"([^"]+)"\s*}}/g;
    let match = includeRegex.exec(parsedContent);
    while (match !== null) {
        // Get the included file path
        const includedFilepath = path.join(path.dirname(filepath), match[1]);

        // Parse the included file and replace the include statement with its content
        const includedContent = await parseFile(includedFilepath, variables);
        parsedContent = parsedContent.replace(match[0], includedContent);

        // Find the next include statement
        match = includeRegex.exec(parsedContent);
    }

    return parsedContent;
}

module.exports = parseFile;