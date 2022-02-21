import { CallOptions, ClientUnaryCall, Metadata, ServiceError } from "@grpc/grpc-js";
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

export default function WrapAsyncRPC<
    TClient,
    TFunc extends RPCFunction<TArg, TResult>,
    TArg = Parameters<TFunc>[0],
    TResult = Parameters<Parameters<TFunc>[3]>[1]>(instance: TClient, rpcFunction: TFunc): (arg: TArg) => Promise<TResult> {
    return (arg: TArg) => promisify(rpcFunction).bind(instance)(arg, new Metadata(), {});
}
