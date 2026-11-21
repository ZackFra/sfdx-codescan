interface CodeAnalyzerLocation {
    file: string
    startLine: number
    startColumn?: number
    endLine?: number
    endColumn?: number
    comment?: string
}

interface CodeAnalyzerViolation {
    rule: string
    engine: string
    severity: 1 | 2 | 3 | 4 | 5
    tags?: string[]
    primaryLocationIndex: number
    locations: CodeAnalyzerLocation[]
    message: string
    resources?: string[]
}

interface CodeAnalyzerReport {
    violations?: CodeAnalyzerViolation[]
}
