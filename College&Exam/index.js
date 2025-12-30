const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();

exports.getExamsByStream = functions.https.onCall(async (data) => {
    const { stream } = data;

    const snapshot = await db
        .collection("exams")
        .where("stream", "==", stream)
        .get();

    return snapshot.docs.map(doc => doc.data());
});

exports.getColleges = functions.https.onCall(async (data) => {
    const { stream, state, maxFees } = data;

    let query = db.collection("colleges").where("stream", "==", stream);

    if (state) query = query.where("state", "==", state);
    if (maxFees) query = query.where("feesPerYear", "<=", maxFees);

    const snapshot = await query.get();
    return snapshot.docs.map(doc => doc.data());
});
