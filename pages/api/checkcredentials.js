export default function handler(req, res) {
    if (req.method !== "POST") {
        res.status(405).send({ message: "Only POST requests allowed" });
        return;
    }
    if (req.body.email == "test@gmail.com" && req.body.passwordHash == "test") {
        res.status(200).json({ authenticated: "True", id: "0" });
    } else {
        res.status(200).json({ authenticated: "False" });
    }
}
