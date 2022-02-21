import { credentials } from "@grpc/grpc-js";
import WrapAsyncRPC from "./gRPCHelpers";

import { AccountServiceClient } from "./proto/account";
import { FeedbackServiceClient } from "./proto/feedback";
import { MatchingServiceClient } from "./proto/matching";
import { MeetingServiceClient } from "./proto/meeting";
import { OtherServiceClient } from "./proto/other";

const grpc_backend_address: string = process.env["GRPC_BACKEND_ADDRESS"] ?? "127.0.0.1:50051"
const grpc_backend_use_tls: boolean = process.env["GRPC_BACKEND_TLS"] == "true"

const getCredentials = () => {
    return grpc_backend_use_tls ? credentials.createSsl() : credentials.createInsecure();
}

export class AccountClient extends AccountServiceClient {
    constructor() { super(grpc_backend_address, getCredentials()); }

    tryLoginAsync = WrapAsyncRPC(this, this.tryLogin);
    registerUserAsync = WrapAsyncRPC(this, this.registerUser);
}

export class FeedbackClient extends FeedbackServiceClient {
    constructor() { super(grpc_backend_address, getCredentials()); }
}

export class MatchingClient extends MatchingServiceClient {
    constructor() { super(grpc_backend_address, getCredentials()); }
}

export class MeetingClient extends MeetingServiceClient {
    constructor() { super(grpc_backend_address, getCredentials()); }
}

export class OtherClient extends OtherServiceClient {
    constructor() { super(grpc_backend_address, getCredentials()); }
}
