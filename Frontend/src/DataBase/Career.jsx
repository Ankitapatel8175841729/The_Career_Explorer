import { getDatabase, ref, set } from "firebase/database";

function addCareer(careerName, eligibility, exams, colleges, futureScope) {
  const db = getDatabase();
  set(ref(db, "career/" + careerName), {
    career: careerName,
    eligibility: eligibility,
    exams: exams,
    colleges: [...colleges],
    futureScope: [...futureScope],
  });
}

export { addCareer };
