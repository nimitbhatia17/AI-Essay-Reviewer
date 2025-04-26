from fastapi import APIRouter, UploadFile, Form, HTTPException
import io

router = APIRouter()


@router.get("/test")
async def test():
    return {"message": "Test endpoint is working!"}
