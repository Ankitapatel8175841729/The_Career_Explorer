const functions = require("firebase-functions");
const admin = require("firebase-admin");
const axios = require("axios");
const cors = require("cors")({ origin: true });

admin.initializeApp();
const db = admin.firestore();

async function verifyUser(req) {
    const token = req.headers.authentication?.split("Bearer")[1];
    if (!token) throw new Error("Unauthorized");

    return await admin.auth().verifyIdToken(token);
}

exports.submitQuiz = functions.https.onRequest((req, res) => {
    cors(req, res, async () => {
        try {
            const user = await verifyUser(req);

            const quizData = {
                interests: req.body.interests,
                marks: req.body.marks,
                location: req.body.location,
                timestamp: admin.firestore.FieldValue.serverTimestamp()
            };

            await db
                .collection("users")
                .doc(user.uid)
                .collection("quizResponses")
                .add(quizData);

            res.status(200).json({ message: "Quiz submitted successfully" });
        } catch (err) {
            res.status(401).json({ error: err.message });
        }
    });
});

exports.getRecommendations = functions.https.onRequest((req, res) => {
    cors(req, res, async () => {
        try {
            const user = await verifyUser(req);

            const mlResponse = await axios.post(
                "http://127.0.0.1:5000/recommend",
                {
                    interests: req.body.interests,
                    marks: req.body.marks
                }
            );

            const recommendations = mlResponse.data.recommendations;

            await db
                .collection("users")
                .doc(user.uid)
                .collection("recommendations")
                .add({
                    recommendations,
                    createdAt: admin.firestore.FieldValue.serverTimestamp()
                });
            res.status(200).json({ recommendations });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });
});

exports.getCareers = functions.https.onRequest(async (req, res) => {
    try {
        const snapshot = await db.collection("careers").get();
        const careers = [];

        snapshot.forEach(doc => {
            careers.push({ id: doc.id, ...doc.data() });
        });
        res.status(200).json(careers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

exports.addCarrer = functions.https.onRequest((req, res) => {
    cors(req, res, async () => {
        try {
            const user = await verifyUser(req);

            if (!user.admin) {
                return res.status(403).json({ error: "Admin access required" });
            }

            await db.collection("careers").add({
                name: req.body.name,
                stream: req.body.stream,
                eligibility: req.body.eligibility,
                exams: req.body.exams,
                salary: req.body.salary,
                scope: req.body.scope
            });

            res.status(200).json({ message: "Career added successfully" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });
});

exports.analytics = functions.https.onRequest(async (req, res) => {
    try {
        const snapshot = await db.collectioonGroup("recommendations").get();
        res.status(200).json({ totalRecommendations: snapshot.size });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});