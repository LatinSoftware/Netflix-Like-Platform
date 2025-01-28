export class DomainException extends Error {
    private _code: string;
    constructor(code: string, message: string) {
        super(message);
        this.name = "DomainException";
        this._code = code;
    }

    get code(): string {
        return this._code;
    }

    get message(): string {
        return this.message;
    }
}