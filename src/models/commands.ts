import * as vscode from 'vscode';
import * as commands from './../commands';
import { updateDecorations } from '../decorators/testCoverageDecorator';
import { getFileName } from './../parsers';

export default [
    {
        commandName: 'ForceCode.openOrg',
        name: 'Opening org in browser',
        hidden: false,
        description: 'Open project org',
        detail: 'Open the org this project is associated with in a browser.',
        icon: 'browser',
        label: 'Open Org in browser',
        command: function (context, selectedResource?) {
            return vscode.window.forceCode.dxCommands.openOrg();
        }
    },
    {
        commandName: 'ForceCode.find',
        name: 'Finding in files',
        hidden: false,
        description: 'Find in files',
        detail: 'Search salesforce source files for a string.',
        icon: 'search',
        label: 'Find',
        command: function (context, selectedResource?) {
            return commands.find();
        }
    },
    // Open File
    {
        commandName: 'ForceCode.open',
        name: 'Opening file',
        hidden: false,
        description: 'Open Classes, Pages, Triggers, and Components',
        detail: 'Open a file from the cloud (aka "refresh from org").',
        icon: 'desktop-download',
        label: 'Open Salesforce File',
        command: function (context, selectedResource?) {
            return commands.open(context);
        }
    },
    // Create Classes
    {
        commandName: 'ForceCode.createClass',
        name: 'Creating class',
        hidden: false,
        description: 'Create a Repository, Model, Service, Controller, or Custom class.',
        detail: 'Creates classes based on common separation of concerns patterns',
        icon: 'plus',
        label: 'Create Class',
        command: function (context, selectedResource?) {
            return commands.createClass(context);
        }
    },
    // Execute Anonymous 
    // Execute Selected Code
    {
        commandName: 'ForceCode.executeAnonymous',
        name: 'Executing anonymous code',
        hidden: false,
        description: 'Execute code and get the debug log',
        detail: 'If you have a block of text selected, it will run that, otherwise it will use the text of the active file.',
        icon: 'terminal',
        label: 'Execute Anonymous',
        command: function (context, selectedResource?) {
            return commands.executeAnonymous();
        }
    },
    // Get Log(s)
    {
        commandName: 'ForceCode.getLogs',
        name: 'Retrieving logs',
        hidden: false,
        description: 'Display a list of the last ten logs.',
        detail: 'Get recent logs',
        icon: 'unfold',
        label: 'Get Logs',
        command: function (context, selectedResource?) {
            return commands.getLog(context);
        }
    },
    {
        commandName: 'ForceCode.getCodeCoverage',
        name: 'Retriving code coverage',
        hidden: false,
        description: 'Get code coverage',
        detail: 'Retrieve the current code coverage for all files in the src folder.',
        icon: 'file-text',
        label: 'Get current code coverage',
        command: function (context, selectedResource?) {
            return commands.apexTestResults();
        }
    },
    {
        commandName: 'ForceCode.getOverallCoverage',
        name: 'Retrieving code coverage',
        hidden: false,
        description: 'Get overall code coverage',
        detail: 'Retrieve the current code coverage for all files in the org and save in the coverage folder as a txt file.',
        icon: 'checklist',
        label: 'Get current overall code coverage',
        command: function (context, selectedResource?) {
            return commands.getOverallCoverage();
        }
    },
    // Run SOQL
    {
        commandName: 'ForceCode.soql',
        name: 'Executing SOQL query',
        hidden: false,
        description: 'Run a SOQL query',
        detail: 'The SOQL query results will be dumped to a json file in the soql directory',
        icon: 'telescope',
        label: 'SOQL Query',
        command: function (context, selectedResource?) {
            return commands.soql();
        }
    },
    // Diff Files
    {
        commandName: 'ForceCode.diff',
        name: 'Diffing file', //+ getFileName(vscode.window.activeTextEditor.document),
        hidden: false,
        description: 'Diff the current file with what is on the server',
        detail: 'Diff the file',
        icon: 'diff',
        label: 'Diff',
        command: function (context, selectedResource?) {
            if(selectedResource) {
                return commands.diff(selectedResource, context);
            }
            return commands.diff(vscode.window.activeTextEditor.document, context);
        }
    },
    // Compile/Deploy
    {
        commandName: 'ForceCode.compile',
        name: 'Saving ',
        hidden: false,
        description: 'Save the active file to your org.',
        detail: 'If there is an error, you will get notified. To automatically compile Salesforce files on save, set the autoCompile flag to true in your settings file',
        icon: 'rocket',
        label: 'Compile/Deploy',
        command: function (context, selectedResource?) {
            if (selectedResource && selectedResource.path) {
                return vscode.workspace.openTextDocument(selectedResource)
                    .then(doc => commands.compile(doc, context));
            } else {
                return commands.compile(vscode.window.activeTextEditor.document, context);
            }
        }
    },
    // Build/Deploy Resource Bundle(s)
    {
        commandName: 'ForceCode.staticResource',
        name: 'Retrieving static resource',
        hidden: false,
        description: 'Build and Deploy a resource bundle.',
        detail: 'Create the Static Resource from the resource-bundle folder and deploy it to your org.',
        icon: 'file-zip',
        label: 'Build Resource Bundle',
        command: function (context, selectedResource?) {
            return commands.staticResource(context);
        }
    },
    // Retrieve Package
    {
        commandName: 'ForceCode.retrievePackage',
        name: 'Retrieving package',
        hidden: false,
        description: 'Retrieve metadata to your src directory.',
        detail: 'You will be prompted for the package name or you can choose to retrieve by your package.xml or to retrieve all metadata',
        icon: 'cloud-download',
        label: 'Retrieve Package/Metadata',
        command: function (context, selectedResource?) {
            return commands.retrieve(context);
        }
    },
    // Export Package (Deploy via Metadata API, using Package.xml)
    {
        commandName: 'ForceCode.deployPackage',
        name: 'Deploying package',
        hidden: false,
        description: 'Deploy your package.',
        detail: 'If you have a directory with a package.xml, you will get the option to deploy it.',
        icon: 'package',
        label: 'Deploy Package',
        command: function (context, selectedResource?) {
            return commands.deploy(context);
        }
    },
    // Run Tooling Query
    {
        commandName: 'ForceCode.toql',
        name: 'Executing TOQL query',
        hidden: false,
        description: 'Run a Tooling API query',
        detail: 'The Tooling API query (Select SymbolTable From ApexClass) results will be dumped to a json file in the toql directory',
        icon: 'telescope',
        label: 'Tooling Query',
        command: function (context, selectedResource?) {
            return commands.toql();
        }
    },
    {
        commandName: 'ForceCode.dx',
        name: 'Running DX command',
        hidden: false,
        description: 'Salesforce DX Commands',
        detail: 'Run DX commands, just like on a command line.',
        icon: 'broadcast',
        label: 'Salesforce DX',
        command: function (context, selectedResource?) {
            return commands.dx();
        }
    },
    {
        commandName: 'ForceCode.codeCompletionRefresh',
        name: 'Refreshing Code Completion',
        hidden: false,
        description: 'Refresh objects from org',
        detail: 'You must login to DX first or if you receive errors. Allows code completion with custom fields and objects by downloading org data.',
        icon: 'code',
        label: 'Code Completion Refresh',
        command: function (context, selectedResource?) {
            return commands.codeCompletionRefresh();
        }
    },
    {
        commandName: 'ForceCode.dxLogout',
        name: 'Logging out',
        hidden: false,
        description: 'Log out from current org',
        detail: 'Log out of the current org in this project.',
        icon: 'x',
        label: 'Log out of Salesforce',
        command: function (context, selectedResource?) {
            return commands.dxLogout();
        }
    },
    // Enter Salesforce Credentials
    {
        commandName: 'ForceCode.enterCredentials',
        name: 'Logging in',
        hidden: false,
        description: 'Enter the credentials you wish to use.',
        detail: 'If you are already logged in, you will be logged out of your previous session.',
        icon: 'key',
        label: 'Log in to Salesforce',
        command: function (context, selectedResource?) {
            return commands.credentials();
        }
    },
    {
        commandName: 'ForceCode.refresh',
        name: 'Retrieving file',
        hidden: true,
        command: function (context, selectedResource?) {
            return commands.retrieve(context, vscode.window.activeTextEditor.document.uri);
        }
    },
    {
        commandName: 'ForceCode.showMenu',
        hidden: true,
        command: function (context, selectedResource?) {
            return commands.showMenu(context);
        }
    },
    {
        commandName: 'ForceCode.documentMethod',
        hidden: true,
        command: function (context, selectedResource?) {
            return commands.documentMethod(context);
        }
    },
    {
        commandName: 'ForceCode.toggleCoverage',
        hidden: true,
        command: function (context, selectedResource?) {
            vscode.window.forceCode.config.showTestCoverage = !vscode.window.forceCode.config.showTestCoverage;
            return updateDecorations();
        }
    },
    {
        commandName: 'sfdx.force.apex.test.class.run.delegate',
        hidden: true,
        command: function (context, selectedResource?) {
            return commands.apexTestClass(context);
        }
    },
    {
        commandName: 'sfdx.force.apex.test.method.run.delegate',
        hidden: true,
        command: function (context, selectedResource?) {
            return commands.apexTestMethod(context);
        }
    },
    {
        commandName: 'ForceCode.showFileOptions',
        name: 'Opening file',
        hidden: true,
        command: function (context, selectedResource?) {
            return commands.showFileOptions(context);
        }
    },
    {
        commandName: 'ForceCode.apexTest',
        name: 'Running apex test',
        hidden: true,
        command: function (context, selectedResource?) {
            return commands.apexTest(context, selectedResource);
        }
    },
    {
        commandName: 'ForceCode.fileModified',
        name: 'Modified file',
        hidden: true,
        command: function (context, selectedResource?) {
            return vscode.workspace.openTextDocument(context).then(theDoc => {
                return vscode.window.showWarningMessage('Someone else has changed ' + getFileName(theDoc), 'Refresh', 'Diff', 'Dismiss').then(s => {
                    if (s === 'Refresh') {
                        return commands.retrieve(selectedResource, theDoc.uri);
                    } else if(s === 'Diff') {
                        return commands.diff(theDoc, selectedResource);
                    }
                });
            });
        }
    },
]
