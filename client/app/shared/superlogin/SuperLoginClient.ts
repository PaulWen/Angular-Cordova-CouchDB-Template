export class SuperLoginClient {
////////////////////////////////////////////Properties////////////////////////////////////////////

    private token: string;
    private password: string;

    private message: string;

////////////////////////////////////////////Constructor////////////////////////////////////////////

    constructor() {
    }

/////////////////////////////////////////////Methods///////////////////////////////////////////////

    /**
     * The function uses superlogin-client to register the user with the given information.
     *
     * @param name of the user
     * @param email of the user
     * @param password of the user
     */
    public register(name: string, email: string, password: string) {
    }

    /**
     * The function uses superlogin-client to login the user withe the given credentials.
     *
     * @param username of the user
     * @param password of the user
     */
    public login(username: string, password: string)  {
    }

    public logout()  {
    }

    public getMessage(): string {
        return this.message;
    }

}