
import { Battler } from "./battler";
import { ErrorResponse } from "./errorResponse";

export interface AuthenticationResponse extends ErrorResponse{
    battler: Battler;
    status: string;
    jwtoken: string;
}
