interface PmdViolation {
    category: string;
    endLine: number;
    line: number;
    message: string;
    ruleName: string;
    severity: 0 | 1 | 2 | 3 | 4 | 5;
    url: string;
}