/* eslint-disable */
import Long from "long";
import {
  makeGenericClientConstructor,
  ChannelCredentials,
  ChannelOptions,
  UntypedServiceImplementation,
  handleUnaryCall,
  Client,
  ClientUnaryCall,
  Metadata,
  CallOptions,
  ServiceError,
} from "@grpc/grpc-js";
import _m0 from "protobufjs/minimal";

export interface AuthenticateRequest {
  username: string;
  password: string;
}

export interface AuthenticateReply {
  status: boolean;
  id: number;
}

function createBaseAuthenticateRequest(): AuthenticateRequest {
  return { username: "", password: "" };
}

export const AuthenticateRequest = {
  encode(
    message: AuthenticateRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.username !== "") {
      writer.uint32(10).string(message.username);
    }
    if (message.password !== "") {
      writer.uint32(18).string(message.password);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AuthenticateRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAuthenticateRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.username = reader.string();
          break;
        case 2:
          message.password = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AuthenticateRequest {
    return {
      username: isSet(object.username) ? String(object.username) : "",
      password: isSet(object.password) ? String(object.password) : "",
    };
  },

  toJSON(message: AuthenticateRequest): unknown {
    const obj: any = {};
    message.username !== undefined && (obj.username = message.username);
    message.password !== undefined && (obj.password = message.password);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<AuthenticateRequest>, I>>(
    object: I
  ): AuthenticateRequest {
    const message = createBaseAuthenticateRequest();
    message.username = object.username ?? "";
    message.password = object.password ?? "";
    return message;
  },
};

function createBaseAuthenticateReply(): AuthenticateReply {
  return { status: false, id: 0 };
}

export const AuthenticateReply = {
  encode(
    message: AuthenticateReply,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.status === true) {
      writer.uint32(8).bool(message.status);
    }
    if (message.id !== 0) {
      writer.uint32(16).int32(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AuthenticateReply {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAuthenticateReply();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.status = reader.bool();
          break;
        case 2:
          message.id = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AuthenticateReply {
    return {
      status: isSet(object.status) ? Boolean(object.status) : false,
      id: isSet(object.id) ? Number(object.id) : 0,
    };
  },

  toJSON(message: AuthenticateReply): unknown {
    const obj: any = {};
    message.status !== undefined && (obj.status = message.status);
    message.id !== undefined && (obj.id = Math.round(message.id));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<AuthenticateReply>, I>>(
    object: I
  ): AuthenticateReply {
    const message = createBaseAuthenticateReply();
    message.status = object.status ?? false;
    message.id = object.id ?? 0;
    return message;
  },
};

export const AuthenticateService = {
  tryLogin: {
    path: "/authentication.Authenticate/TryLogin",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: AuthenticateRequest) =>
      Buffer.from(AuthenticateRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => AuthenticateRequest.decode(value),
    responseSerialize: (value: AuthenticateReply) =>
      Buffer.from(AuthenticateReply.encode(value).finish()),
    responseDeserialize: (value: Buffer) => AuthenticateReply.decode(value),
  },
} as const;

export interface AuthenticateServer extends UntypedServiceImplementation {
  tryLogin: handleUnaryCall<AuthenticateRequest, AuthenticateReply>;
}

export interface AuthenticateClient extends Client {
  tryLogin(
    request: AuthenticateRequest,
    callback: (error: ServiceError | null, response: AuthenticateReply) => void
  ): ClientUnaryCall;
  tryLogin(
    request: AuthenticateRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: AuthenticateReply) => void
  ): ClientUnaryCall;
  tryLogin(
    request: AuthenticateRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: AuthenticateReply) => void
  ): ClientUnaryCall;
}

export const AuthenticateClient = makeGenericClientConstructor(
  AuthenticateService,
  "authentication.Authenticate"
) as unknown as {
  new (
    address: string,
    credentials: ChannelCredentials,
    options?: Partial<ChannelOptions>
  ): AuthenticateClient;
  service: typeof AuthenticateService;
};

type Builtin =
  | Date
  | Function
  | Uint8Array
  | string
  | number
  | boolean
  | undefined;

type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
type Exact<P, I extends P> = P extends Builtin
  ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & Record<
        Exclude<keyof I, KeysOfUnion<P>>,
        never
      >;

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
