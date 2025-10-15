# Word Square Coding Challenge

This repository contains a JavaScript implementation of the **Word Square Coding Challenge**.

The goal is to generate an _n × n_ word square where each row equals its corresponding column, using only the supplied set of letters and valid dictionary words.

## Command-Line Usage Instructions

This project includes a standalone Node.js command-line interface (`cli.js`) that executes the complete word square solver.

### Requirements
- Node.js version 18 or later.
- A dictionary text file containing one word per line.  
  A sample file named `sample-dict.txt` is included for demonstration purposes.

### Running the Program
The application is executed from the terminal using the following syntax:

`node cli.js <n> <letters> <dictionaryPath>`

**Parameters**

| Argument | Description |
|-----------|-------------|
| `<n>` | The size of the square (for example, `4` for a 4×4 word square). |
| `<letters>` | The set of letters to be used for building the square. This must contain exactly *n × n* letters (letters only). |
| `<dictionaryPath>` | The path to a text file containing dictionary words, one per line. |

### Example
To reproduce the 4×4 example word square from the original challenge brief, run:

`node cli.js 4 moanonceacmeneed sample-dict.txt`

**Expected output**

`moan
once
acme
need`

### Testing
To verify the solution and utility functions using Jest, run:

`npm install`

`npm test`

### Additional Notes
- Input letters are automatically converted to lowercase and non-alphabetic characters are ignored.  
- The dictionary file must be in plain text format with one word per line.  
- If no valid word square can be constructed, the program will output:
`No solution found.`
