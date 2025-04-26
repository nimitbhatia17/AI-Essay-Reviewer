from fastapi import APIRouter, UploadFile, Form, HTTPException
import io

router = APIRouter()


@router.get("/api/colleges")
async def getCollegeList():
    return ["Harvard", "Stanford", "MIT", "Yale", "Princeton", "Columbia", "UChicago", "Caltech", "Duke", "Northwestern"]
