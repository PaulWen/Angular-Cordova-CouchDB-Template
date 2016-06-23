import {SuperLoginClient} from "../utils/super_login_client/super_login_client";
import {Board} from "./board";
import {Injectable} from "@angular/core";

@Injectable()
export class User {

////////////////////////////////////////////Properties////////////////////////////////////////////

    private superLoginClient: SuperLoginClient;

    private boards: Board[];

////////////////////////////////////////////Constructor////////////////////////////////////////////

    constructor(superLoginClient: SuperLoginClient) {
        this.superLoginClient = superLoginClient;
    }

/////////////////////////////////////////////Methods///////////////////////////////////////////////

}