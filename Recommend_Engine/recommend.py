import joblib
import numpy as np

scaler= joblib.load("scaler.pkl")
careers= joblib.load("careers_model.pkl")

def recommend(user_input):
    user_vector= scaler.transform([user_input])

    scores=[]
    for _, row in careers.interrows():
        career_vector= row[user_vector.shape[1]*-1:]
        score= np.dot(user_vector, career_vector)
        scores.append(score)
    
    careers["score"]=scores
    top= careers.sort_values("score",ascending=False).head(3)

    return top[["career_id", "score"]].to_dict(orient="records")
