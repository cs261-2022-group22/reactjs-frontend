import { CallOptions, ClientUnaryCall, credentials, Metadata, ServiceError } from "@grpc/grpc-js";
import { promisify } from "util";

export type RPCFunction<TArg, TResult> = (
    request: TArg,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (
        err: ServiceError | null,
        value: TResult
    ) => void
) => ClientUnaryCall;

export function WrapAsyncRPC<
    TClient,
    TFunc extends RPCFunction<TArg, TResult>,
    TArg = Parameters<TFunc>[0],
    TResult = Parameters<Parameters<TFunc>[3]>[1]>(instance: TClient, rpcFunction: TFunc): (arg: TArg) => Promise<TResult> {
    return (arg: TArg) => promisify(rpcFunction).bind(instance)(arg, new Metadata(), {});
}

export const getCredentials = (serviceName: string) => {
    const grpc_backend_use_tls: boolean = process.env[`GRPC_${serviceName}_BACKEND_TLS`] == "true"
    return grpc_backend_use_tls ? credentials.createSsl() : credentials.createInsecure();
}

export const getRpcBackendAddress = (serviceName: string) => {
    return process.env[`GRPC_${serviceName}_BACKEND_ADDRESS`] ?? "127.0.0.1:50051";
};
