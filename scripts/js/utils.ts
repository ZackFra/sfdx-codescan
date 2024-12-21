export function getMessagesWithSeverities(warning: PmdWarning, maxSeverity: number): MessageWithSeverity[] {
    const messagesWithSeverities: MessageWithSeverity[] = [];
    for (const violation of warning.violations) {
      messagesWithSeverities.push(getMessageWithSeverity(warning, violation, maxSeverity));
    }
    return messagesWithSeverities;
}

function getMessageWithSeverity(warning: PmdWarning, violation: PmdViolation, maxSeverity: number): MessageWithSeverity {
    let message: string;
    if(violation.severity <= maxSeverity) {
      message = `::error file=${warning.fileName},line=${violation.line},endLine=${violation.endLine},title=${violation.ruleName}::${violation.category.toUpperCase()} ERROR, SEVERITY (${violation.severity}) ${violation.message} in ${warning.fileName} at line ${violation.line} - ${violation.ruleName} - ${violation.url}`;
    } else {
      message = `::warning file=${warning.fileName},line=${violation.line},endLine=${violation.endLine},title=${violation.ruleName}::${violation.category.toUpperCase()} WARNING, SEVERITY (${violation.severity}) ${violation.message} in ${warning.fileName} at line ${violation.line} - ${violation.ruleName} - ${violation.url}`;
    }
    message = message.replaceAll("\r", "").replaceAll("\n", "");
    const messageWithSeverity : MessageWithSeverity = { severity: violation.severity, message };
    return messageWithSeverity;
}