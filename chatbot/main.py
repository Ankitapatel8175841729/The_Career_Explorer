import streamlit as st
import os
from dotenv import load_dotenv
import pdfplumber

from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import FAISS
from langchain_huggingface.embeddings import HuggingFaceEmbeddings
from langchain_groq import ChatGroq
from sentence_transformers import CrossEncoder
from langchain_core.prompts import ChatPromptTemplate

load_dotenv()
GROQ_KEY=os.getenv("GROQ_API_KEY")

llm=ChatGroq(
    groq_api_key=GROQ_KEY,
    model="llama-3.1-8b-instant",
    temperature=0
)

embeddings=HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)

reranker=CrossEncoder("BAAI/bge-reranker-base")

def extract_text_from_pdf(uploaded_file):
    text=""
    with pdfplumber.open(uploaded_file) as pdf:
        for page in pdf.pages:
            t=page.extract_text()
            if t:
                text+=t+"\n"
    return text


def build_vectorestore(text):
    splitter=RecursiveCharacterTextSplitter(
        chunk_size=600,
        chunk_overlap=150
    )
    chunks=splitter.split_text(text)
    return FAISS.from_texts(chunks,embeddings)


def rerank_results(query, docs):
    pairs=[[query, d.page_content] for d in docs]
    scores= reranker.predict(pairs)
    ranked=sorted(zip(docs,scores),key=lambda x:x[1],reverse=True)
    return [doc for doc, _ in ranked]

def rag_query(query, vectorestore, history):
    docs=vectorestore.similarity_search(query, k=8)
    top_docs=rerank_results(query, docs)[:3]

    context="\n\n".join([d.page_content for d in top_docs])

    history_text=""
    for hq, ha in history:
        history_text += f"Student:{hq}\nCounsellor:{ha}\n\n"

    prompt=ChatPromptTemplate.from_messages([
        ("system",f"""

You are a professional **Career Counsellor for Indian students after class 10**.
         STRICT RULES:
         1.Use ONLY the provided marksheet context.
         2.Do not assume marks or subjects not present.
         3.Do NOT hallucinate colleges, ranks, or percentages.
         4.Base guidance on:
         -Subject-wise performance
         -Strengths & weaknesses
         -Eligibility logic
         -Indian education system

         ANSWER FORMAT(MANDATORY):

         Answer:
         • Career Analysis:
         • Suitable Streams / Options:
         • Why these options:
         • Next Steps (Exams / Skills / Actions):

         Converstaion History:
         {history_text}

          Student Marksheet Context:
          {context}
         """),
         ("user","{query}")
    ])

    final_prompt= prompt.format_messages(query=query)
    response=llm.invoke(final_prompt)
    return response.content




st.title("Your Counsellor")
st.write("Upload your 10th marksheet and get personalized career guidance.")

uploaded=st.file_uploader("Upload your class 10 marksheet(PDF)",type=["pdf"])

if uploaded:
    st.success("Marksheet uploaded successfully!")

    if "vectorestore" not in st.session_state:
        with st.spinner("Analyzing marksheet.."):
            text=extract_text_from_pdf(uploaded)
            st.session_state.vectorestore=build_vectorestore(text)
            st.session_state.history=[]

        st.success("Analysis ready!")

    query= st.text_input(
        "Ask your career question(e.g., Which stream should I choose?)"
    )

    if query:
        with st.spinner("Career counsellor is thinking.."):
            answer=rag_query(
                query,
                st.session_state.vectorestore,
                st.session_state.history
            )

        st.session_state.history.append((query,answer))

        st.subheader("Career Guidance")
        st.write(answer)


        st.subheader("Counselling History")
        for q, a in st.session_state.history:
            st.write(f"**Student:**{q}")
            st.write(f"**Counsellor:**{a}")
            st.write("---")



