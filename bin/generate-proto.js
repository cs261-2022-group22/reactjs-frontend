/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

// This file gets called by running `npm run build:gen_proto`, it generates corresponding typescript proto implementation
// modules for all proto files in ./common/

const path = require("path");
const shell = require("shelljs");
const process = require("process");

// https://github.com/shelljs/shelljs/issues/469
process.env.PATH +=
    path.delimiter + path.join(process.cwd(), "node_modules", ".bin");

const PROTO_DIR = path.join(__dirname, "../common");
const MODEL_DIR = path.join(__dirname, "../utils/proto");
const PROTOC_PATH = path.join(
    __dirname,
    "../node_modules/grpc-tools/bin/protoc"
);
const PLUGIN_PATH = path.join(
    __dirname,
    "../node_modules/.bin/protoc-gen-ts_proto"
);

// https://github.com/stephenh/ts-proto/blob/main/README.markdown
const protoConfig = [
    `--plugin="${PLUGIN_PATH}"`,
    "--ts_proto_opt=outputServices=grpc-js,env=node,exportCommonSymbols=false,esModuleInterop=true",
    `--ts_proto_out="${MODEL_DIR}"`,
    `--proto_path "${PROTO_DIR}" "${PROTO_DIR}"/*.proto`,
];

const command = `"${PROTOC_PATH}" ${protoConfig.join(" ")}`;

shell.exec(command, (code, stdout, stderr) => {
    if (code !== 0)
        console.error(code, stdout, stderr)
    else
        console.log("Generation Completed!")
});
