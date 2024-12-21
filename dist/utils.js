"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMessagesWithSeverities = getMessagesWithSeverities;
function getMessagesWithSeverities(warning, maxSeverity) {
    const messagesWithSeverities = [];
    for (const violation of warning.violations) {
        messagesWithSeverities.push(getMessageWithSeverity(warning, violation, maxSeverity));
    }
    return messagesWithSeverities;
}
function getMessageWithSeverity(warning, violation, maxSeverity) {
    let message;
    if (violation.severity <= maxSeverity) {
        message = `::error file=${warning.fileName},line=${violation.line},endLine=${violation.endLine},title=${violation.ruleName}::${violation.category.toUpperCase()} ERROR, SEVERITY (${violation.severity}) ${violation.message} in ${warning.fileName} at line ${violation.line} - ${violation.ruleName} - ${violation.url}`;
    }
    else {
        message = `::warning file=${warning.fileName},line=${violation.line},endLine=${violation.endLine},title=${violation.ruleName}::${violation.category.toUpperCase()} WARNING, SEVERITY (${violation.severity}) ${violation.message} in ${warning.fileName} at line ${violation.line} - ${violation.ruleName} - ${violation.url}`;
    }
    message = message.replaceAll("\r", "").replaceAll("\n", "");
    const messageWithSeverity = { severity: violation.severity, message };
    return messageWithSeverity;
}
