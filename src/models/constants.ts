import * as vscode from 'vscode';
interface Constants {
    APEX_FILTER: vscode.DocumentFilter[];
    FORCE_SERVICE: string;
    FORCECODE_KEYCHAIN: string;
    OUTPUT_CHANNEL: string;
    OUTPUT_CHANNEL_NAME: string;
    DEBUG_LEVEL_NAME: string;
    LOG_TYPE: string;
    API_VERSION: string;
}
const apexFilter: vscode.DocumentFilter[] = [
    {
        language: 'apex',
        scheme: 'file',
    }, {
        language: 'javascript',
        scheme: 'file',
    },
];
const constants: Constants = {
    FORCECODE_KEYCHAIN: 'yo-force',
    APEX_FILTER: apexFilter,
    FORCE_SERVICE: 'forceService',
    OUTPUT_CHANNEL: 'outputChannel',
    OUTPUT_CHANNEL_NAME: 'ForceCode',
    DEBUG_LEVEL_NAME: 'Execute_Anonymous_Debug',
    LOG_TYPE: 'DEVELOPER_LOG',
    API_VERSION: '42.0',
};
export default constants;
