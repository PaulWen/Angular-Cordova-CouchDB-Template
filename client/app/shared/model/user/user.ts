import {SuperLoginClient} from "../../utils/super_login_client/super_login_client";
import {BoardDataObject} from "../board/board_data_object";
import {Injectable} from "@angular/core";

@Injectable()
export class User {

////////////////////////////////////////////Properties////////////////////////////////////////////

    private superLoginClient: SuperLoginClient;

    private boards: BoardDataObject[];

////////////////////////////////////////////Constructor////////////////////////////////////////////

    constructor(superLoginClient: SuperLoginClient) {
        this.superLoginClient = superLoginClient;
    }

/////////////////////////////////////////////Methods///////////////////////////////////////////////

}