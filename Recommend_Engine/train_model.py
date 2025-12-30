import pandas as pd
import joblib
from sklearn.preprocessing import MinMaxScalar

careers= pd.read_csv("careers.csv")

FEATURES=[
    "maths", "science", "commerce_interest",
    "arts_interest", "coding_interest",
    "logical_aptitude", "creative_aptitude",
    "budget_affordable"
]

scaler= MinMaxScalar()
careers[FEATURES]= scaler.fit_transform(careers[FEATURES])

joblib.dump(scaler, "scaler.pkl")
joblib.dump(careers, "career_model.pkl")

print("Model artifacts saved successfully.")
