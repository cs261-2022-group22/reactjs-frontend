// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
    return new Promise(function(authResolve, authReject) {
        setTimeout(() => {
            res.status(200).json({ name: "John Doe" });
            authResolve();
        }, 3000);
    });
    // setTimeout(() => {
    //     res.status(200).json({ name: "John Doe" });
    // }, 10000);
}
