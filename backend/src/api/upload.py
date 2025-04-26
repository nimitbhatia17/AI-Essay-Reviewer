# src/api/upload.py
from fastapi import APIRouter, UploadFile, Form, HTTPException
import io

router = APIRouter()

# @router.post("/upload")
# async def upload_essay(file: UploadFile, college: str = Form(...)):
#     # Validate file type
#     if file.content_type not in ["text/plain", "application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]:
#         raise HTTPException(status_code=400, detail="Invalid file type. Use TXT, PDF, or DOCX.")

#     # Extract text from file
#     try:
#         if file.content_type == "text/plain":
#             text = await file.read()
#             text = text.decode("utf-8")
#         elif file.content_type == "application/pdf":
#             content = await file.read()
#             pdf_data = pdf_parse.load(io.BytesIO(content))
#             text = pdf_data.text
#         else:  # DOCX
#             content = await file.read()
#             result = mammoth.extract_raw_text(io.BytesIO(content))
#             text = result.value
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=f"Error processing file: {str(e)}")

#     # Analyze essay
#     try:
#         feedback = analyze_essay(text, college)
#         return {"message": "Essay processed", "feedback": feedback}
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=f"Error analyzing essay: {str(e)}")
