import { getFunctions, httpsCallable } from "firebase/functions";

const functions = getFunctions();
const recommend = httpsCallable(functions, "getCareerRecommendations");

const result = await recommend({
    maths: 85,
    science: 90,
    commerceInterest: 20,
    artsInterest: 10,
    codingInterest: 95,
    logicalAptitude: 90,
    creativeAptitude: 40,
    budget: 1

});

console.log(result.data);