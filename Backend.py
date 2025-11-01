import os
import PyPDF2
import json
import logging
import google.generativeai as genai
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from sklearn.feature_extraction.text import TfidfVectorizer
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

app = FastAPI(title="MCQ GENERATOR")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)

load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    raise ValueError("❌ GEMINI_API_KEY not found. Please set it in your environment variables.")

genai.configure(api_key=api_key)

def extract_text_from_pdf(file: UploadFile) -> str:
    try:
        pdf_reader = PyPDF2.PdfReader(file.file)
        text = "".join([page.extract_text() or "" for page in pdf_reader.pages])
        return text
    except Exception as e:
        logging.error(f"Error extracting text: {e}")
        raise HTTPException(status_code=400, detail="Invalid PDF file.")

def generate_mcqs_from_text(text: str, num_questions: int) -> dict:
    model = genai.GenerativeModel("models/gemini-2.5-flash")
    prompt = f"""
    You are an expert quiz creator. Based on the following text, generate {num_questions} high-quality, distinct multiple-choice questions (MCQs).
    
    The text is:
    "{text[:8000]}"

    Please provide your response in a single, valid JSON array. Each object in the array should have the following structure:
    {{
      "question": "The text of the question",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correct_answer": "The correct option text"
    }}
    
    Ensure the 'correct_answer' is one of the strings from the 'options' array.
    Do not include any text, backticks, or explanations outside of the JSON array.
    """
    
    try:
        print("Sending prompt to Gemini API...")
        generation_config = genai.GenerationConfig(response_mime_type="application/json")
        response = model.generate_content(prompt, generation_config=generation_config)
        mcq_data = json.loads(response.text)
        print("Gemini response received and parsed.")
        return mcq_data

    except Exception as e:
        print(f"Error from Gemini API: {e}")
        raise HTTPException(status_code=500, detail=f"Gemini API error: {str(e)}")
    
#------API---------
@app.api_route("/ping", methods=["GET", "HEAD"])
async def ping():
    return {"message": "pong"}

@app.post("/generate_mcq")
async def create_mcqs(file: UploadFile = File(...),num_questions: int = Form(5) ):
    """
    The main API endpoint. It receives a PDF file, extracts text,
    generates MCQs, and returns them as JSON.
    """
    if file.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="Invalid file type. Please upload a PDF.")
    full_text = extract_text_from_pdf(file)
    if not full_text:
        raise HTTPException(status_code=400, detail="Could not extract text from the PDF.")
    mcq_data = generate_mcqs_from_text(full_text, num_questions)
    return {"mcqs": mcq_data}
