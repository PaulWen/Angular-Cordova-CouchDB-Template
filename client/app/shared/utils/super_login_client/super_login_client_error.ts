export class SuperLoginClientError extends Error {

/////////////////////////////////////////////Constants/////////////////////////////////////////////

    public static get AUTH_ERR_1(): string {return "XXX";};
    public static get AUTH_ERR_2(): string {return "XXX";};
    public static get AUTH_ERR_3(): string {return "Password must be at least 6 characters";};
    public static get AUTH_ERR_4(): string {return "Email can't be blank";};
    public static get AUTH_ERR_5(): string {return "Password can't be blank";};
    public static get AUTH_ERR_6(): string {return "Name can't be blank";};

    public static get LOGIN_ERR_1(): string {return "Invalid username or password";};

////////////////////////////////////////////Properties////////////////////////////////////////////

    /** this property contains the complete error message from the SuperLogin server */
    private error: string;
public////////////////////////////////////////////Constructor////////////////////////////////////////////

    /**
     * The constructor of SuperLoginClientError.
     *
     * @param error JSON-object which represents the error from the SuperLogin server
     */
    constructor(error: any) {
        super();
        // super('SuperLoginClientException');
        this.name = 'SuperLoginClientException';
        // this.message = 'SuperLoginClientException';
        this.stack = (<any>new Error()).stack;

        Error.apply(this, arguments);
        this.error = error._body;
    }

/////////////////////////////////////////////Methods///////////////////////////////////////////////

    /**
     * The function checks if this error lists a specific error.
     *
     * @param error
     * @returns {boolean}
     */
    public checkForError(error: string): boolean {
        alert((this.error).includes(error));
        return (this.error).includes(error);
    }
}