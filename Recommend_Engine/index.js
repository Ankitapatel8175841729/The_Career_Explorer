const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { spawn } = require("child_process");

admin.initializeApp();

exports.getCareerRecommendations = functions.https.onCall(
    async (data, context) => {

        if (!context.auth) {
            throw new functions.https.HttpsError(
                "unauthenticated",
                "User must be logged in"
            );
        }

        const userProfile = {
            maths: data.maths,
            science: data.science,
            commerce_interest: data.commerceInterest,
            arts_interest: data.artsInterest,
            coding_interest: data.codingInterest,
            logical_aptitude: data.logicalAptitude,
            creative_aptitude: data.creativeAptitude,
            budget_affordable: data.budget

        };

        return new Promise((resolve, reject) => {
            const py = spawn("python3", ["ml/recommend.py"]);

            py.stdin.write(JSON.stringify(userProfile));
            py.stdin.end();

            let output = "";
            py.stdout.on("data", (data) => output += data.toString());

            py.on("close", () => {
                resolve(JSON.parse(output));
            });

            py.on("error", reject);
        });

    }

);