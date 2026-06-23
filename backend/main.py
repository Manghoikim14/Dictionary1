import pandas as pd
import os
from fastapi import FastAPI,HTTPException
from fastapi.middleware.cors import CORSMiddleware

app=FastAPI(title="Simple dictionary")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5500",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


#FILE_LOADING WITH PANDAS


CSV_FILE_PATH=os.path.join(os.path.dirname(__file__),"words.csv")

try:
    df=pd.read_csv(CSV_FILE_PATH)
    #PRE_PROCESSING
    df['word']=df['word'].astype(str).str.strip().str.lower()
    df['meaning']=df['meaning'].astype(str).str.strip()

except Exception as e:
    print(f"ERROR IN LOAD CSV FILE:{e}")

@app.get("/api/dictionary/{word}")
def get_definition(word: str):
    search_word=word.strip().lower()

    result=df[df['word']==search_word]
    if result.empty:
        raise HTTPException(status_code=404,detail="word not found in database")

    meaning=result.iloc[0]['meaning']
    return {"word":word,"meaning":meaning}    


