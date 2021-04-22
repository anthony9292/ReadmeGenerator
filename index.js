var inquirer= require('inquirer'); 
var fs=require("fs"); 
const util=require("util"); 

const writeFileAsync=util.promisify(fs.writeFile); 


function promptUser(){ 
    return inquirer.prompt([
{ 
 type:"input", 
 message: "Whats you're Subject or Title ", 
 name:"title"
}, 
{ 
    type:"input", 
    message: "Tell me what's your document about ", 
    name:"description"
     }, 
   
   { 
    type:"input", 
    message: "Please provide installation instructions: ", 
    name:"install"
   }, 
   
   { 
    type:"input", 
    message: "How will this be used? ", 
    name:"usage"
   }, 
   
   { 
    type:"list", 
    message: "Please select one of these licenses: ", 
    name:"badge", 
    choices: [
        "Apache", 
        "IBM",
        "MIT", 
        "Perl"
    ]
   }, 
   { 
    type:"input", 
    message: "Please provide a description of the license use:", 
    name:"license"
   }, 
      
   { 
   type:"input", 
    message: "Any contributions on this project ", 
    name:"contributions"
   }, 
   { 
    type:"input", 
    message: "Please provide test instructions or notes: ", 
    name:"test"
   }, 
   { 
    type:"input", 
    message: "Provide our e-mail address: ", 
    name:"Email"
   }, 
   { 
    type:"input", 
    message: "Provide your github ID:", 
    name:"github"
   }, 
   ]);
}
function generateMD(answers){

    var profile=("https://github.com/"+answers.github)
return ` 
# ${answers.title}
${answers.badge ==="Apache" ? "Apache"+""+'<br>'+""+"[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)" : answers.badge ==="MIT" ? "MIT"+""+'<br>'+""+"[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)" : answers.badge==="IBM" ? "IBM"+""+'<br>'+""+"[![License: IPL 1.0](https://img.shields.io/badge/License-IPL%201.0-blue.svg)](https://opensource.org/licenses/IPL-1.0)" : "Perl"+""+'<br>'+""+"[![License: Artistic-2.0](https://img.shields.io/badge/License-Perl-0298c3.svg)](https://opensource.org/licenses/Artistic-2.0)"}
## Description
${answers.description} 
## Table of contents
* [Description](#description)
* [Installation](#installation)
* [Usage](#usage)
* [License](#license)
* [Contributing](#contributing)
* [Tests](#tests)
* [Questions](#questions)

## Installation
        ${answers.install}
## Usage 
        ${answers.usage}
## License
        ${answers.badge}
        ${answers.license}
## Contributing
        ${answers.contributions}
## Tests
        ${answers.test}
## Questions
For questions regarding this application please contact me at:
    - E-mail ${answers.Email}
    - Github:
    <${profile}>

    `; 
}
 async function init() { 
     console.log("Welcome to my ReadME generator!"); 
     try{ 
               const answers=await promptUser(); 
               const md=generateMD(answers); 
               await writeFileAsync("README.md",md); 
               console.log("Successfully writing to  README.md !!"); 
      } catch(err){ 
          console.log(err); 
      }
 }
 init(); 