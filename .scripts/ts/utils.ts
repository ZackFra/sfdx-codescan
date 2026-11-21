export function getMessagesWithSeverities(violations: CodeAnalyzerViolation[], maxSeverity: number): MessageWithSeverity[] {
    const messagesWithSeverities: MessageWithSeverity[] = []
    for (const violation of violations) {
        const messageWithSeverity = getMessageWithSeverity(violation, maxSeverity)
        if (messageWithSeverity) {
            messagesWithSeverities.push(messageWithSeverity)
        }
    }
    return messagesWithSeverities
}

function getMessageWithSeverity(violation: CodeAnalyzerViolation, maxSeverity: number): MessageWithSeverity | undefined {
    const location = violation.locations[violation.primaryLocationIndex] ?? violation.locations[0]
    if (!location?.file || location.startLine == null) {
        return undefined
    }

    const endLine = location.endLine ?? location.startLine
    const category = (violation.tags?.find(tag => tag !== 'Recommended') ?? violation.engine).toUpperCase()
    const url = violation.resources?.[0] ?? ''
    const failed = violation.severity <= maxSeverity
    const level = failed ? 'error' : 'warning'
    const label = failed ? 'ERROR' : 'WARNING'
    const message = `::${level} file=${location.file},line=${location.startLine},endLine=${endLine},title=${violation.rule}::${category} ${label}, SEVERITY (${violation.severity}) ${violation.message} in ${location.file} at line ${location.startLine} - ${violation.rule} - ${url}`
        .replaceAll('\r', '')
        .replaceAll('\n', '')

    return { severity: violation.severity, message }
}
