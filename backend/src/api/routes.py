from fastapi import APIRouter, Request
import pandas as pd
import json

router = APIRouter()

df = pd.read_csv(
    "src/data/deep_essays_dataset.csv")


@router.get("/colleges")
async def getCollegeList():
    return ["Harvard", "Stanford", "MIT", "Yale", "Princeton", "Columbia", "UChicago", "Caltech", "Duke", "Northwestern"]


@router.post("/search")
async def search(request: Request):
    body = json.loads(await request.body())
    queried_df = df[df['title'] == body.get(
        "query")][['id', 'title', 'description', 'essay', 'authors']]
    queried_df = queried_df.rename(columns={
        'id': 'essay_id',
        'title': 'essay_title',
        'description': 'essay_description',
        'essay': 'essay_text',
        'authors': 'essay_authors'
    })
    dictionary = queried_df.to_dict(orient='records')
    return dictionary


@router.get("/essay")
async def getEssay(request: Request):
    essay_id = int(request.query_params.get("id"))
    queried_df = df[df['id'] == essay_id][[
        'id', 'title', 'description', 'essay', 'authors']]
    queried_df = queried_df.rename(columns={
        'id': 'essay_id',
        'title': 'essay_title',
        'description': 'essay_description',
        'essay': 'essay_text',
        'authors': 'essay_authors'
    })
    dictionary = queried_df.to_dict(orient='records')
    return dictionary
