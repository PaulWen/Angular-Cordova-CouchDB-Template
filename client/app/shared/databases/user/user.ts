import {SuperLoginClient} from "../../utils/super_login_client/super_login_client";
import {BoardDocument} from "../board/board_document";
import {Injectable} from "@angular/core";

@Injectable()
export class User {

////////////////////////////////////////////Properties////////////////////////////////////////////

    private superLoginClient: SuperLoginClient;

    private boards: BoardDocument[];

////////////////////////////////////////////Constructor////////////////////////////////////////////

    constructor(superLoginClient: SuperLoginClient) {
        this.superLoginClient = superLoginClient;
    }

/////////////////////////////////////////////Methods///////////////////////////////////////////////

}