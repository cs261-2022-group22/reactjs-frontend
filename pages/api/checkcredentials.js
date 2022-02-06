export default async function handler(req, res) {
    return new Promise(function(authResolve, authReject) {
        if (req.method !== "POST") {
            res.status(405).send({ message: "Only POST requests allowed" });
            authResolve();
            return;
        }
        
        var PROTO_PATH = __dirname + '/../../../../authentication.proto';
        var grpc = require('@grpc/grpc-js');
        var protoLoader = require('@grpc/proto-loader');
        var packageDefinition = protoLoader.loadSync(
            PROTO_PATH,
            {keepCase: true,
            longs: String,
            enums: String,
            defaults: true,
            oneofs: true
            });
        var auth_proto = grpc.loadPackageDefinition(packageDefinition).authentication;
        var client = new auth_proto.Authenticate('localhost:50051',
                                            grpc.credentials.createInsecure());
        client.TryLogin({username: req.body.email, password: req.body.passwordHash}, function(err, response) {
            if (err) {
                console.log("An error has occurred");
                res.status(500).send({ message: "Internal Server Error." });
                authResolve();
                //don't log the user in
            }
            else {
                if (response.status === "SUCCESS") { //authenticated so log the user in
                    console.log("You are now logged in with id: " + response.id);
                    res.status(200).json({ authenticated: "True", id: response.id });
                    authResolve();
                }
                else { //not authenticated
                    console.log("Credentials were invalid.")
                    res.status(200).json({ authenticated: "False" });            
                    authResolve();
                }
            }
        });
        
    });
}
