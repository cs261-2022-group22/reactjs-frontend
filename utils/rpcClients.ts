import { WrapAsyncRPC, getCredentials, getRpcBackendAddress } from "./gRPCHelpers";

import { AccountServiceClient } from "./proto/account";
import { FeedbackServiceClient } from "./proto/feedback";
import { MatchingServiceClient } from "./proto/matching";
import { MeetingServiceClient } from "./proto/meeting";
import { OtherServiceClient } from "./proto/other";


export class AccountClient extends AccountServiceClient {
    static SERVICE_NAME = "ACCOUNT";

    constructor() {
        super(
            getRpcBackendAddress(AccountClient.SERVICE_NAME),
            getCredentials(AccountClient.SERVICE_NAME)
        );
    }

    tryLoginAsync = WrapAsyncRPC(this, this.tryLogin);
    listAccountProfilesAsync = WrapAsyncRPC(this, this.accountProfiles);
    registerUserAsync = WrapAsyncRPC(this, this.registerUser);
    listBusinessAreasAsync = WrapAsyncRPC(this, this.listBusinessAreas);
    listNotificationsAsync = WrapAsyncRPC(this, this.getNotifications);
    getMenteesByMentorIdAsync = WrapAsyncRPC(this, this.getMenteesByMentorId);
}

export class FeedbackClient extends FeedbackServiceClient {
    static SERVICE_NAME = "FEEDBACK";

    constructor() {
        super(getRpcBackendAddress(FeedbackClient.SERVICE_NAME), getCredentials(FeedbackClient.SERVICE_NAME));
    }
}

export class MatchingClient extends MatchingServiceClient {
    static SERVICE_NAME = "MATCHING";

    constructor() {
        super(getRpcBackendAddress(MatchingClient.SERVICE_NAME), getCredentials(MatchingClient.SERVICE_NAME));
    }

    getMatchingMentorAsync = WrapAsyncRPC(this, this.getMatchingMentor);
}

export class MeetingClient extends MeetingServiceClient {
    static SERVICE_NAME = "MEETING";

    constructor() {
        super(getRpcBackendAddress(MeetingClient.SERVICE_NAME), getCredentials(MeetingClient.SERVICE_NAME));
    }

    list5AppointmentsByUserIDAsync = WrapAsyncRPC(this, this.list5AppointmentsByUserID);
}

export class OtherClient extends OtherServiceClient {
    static SERVICE_NAME = "OTHER";

    constructor() {
        super(getRpcBackendAddress(OtherClient.SERVICE_NAME), getCredentials(OtherClient.SERVICE_NAME));
    }
}
