import os
import json
import io
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from openai import AsyncOpenAI
from pypdf import PdfReader

# Load environment variables
load_dotenv()

app = FastAPI(title="HRFlow AI Service")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize OpenRouter client
api_key = os.getenv("OPENROUTER_API_KEY")
if not api_key:
    print("WARNING: OPENROUTER_API_KEY is not set. The /analyze endpoint will fail.")

client = AsyncOpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=api_key,
)

PROMPT = """You are an expert HR recruiter and CV analyst. Analyze the following CV/resume text and return a structured JSON response.

IMPORTANT: Return ONLY valid JSON, no markdown, no backticks, no explanation text.

The JSON must have this exact structure:
{
  "score": <number 0-100 representing overall candidate quality>,
  "skills": ["<array of extracted technical and soft skills as strings>"],
  "education": "<highest education level and institution>",
  "experience": "<summary of total work experience in years and key roles>",
  "summary": "<2-3 sentence professional summary of the candidate>",
  "strengths": ["<array of 3-5 key strengths>"],
  "weaknesses": ["<array of 2-3 areas for improvement>"]
}

Score the candidate based on:
- Education quality and relevance (20%)
- Technical skills breadth and depth (30%)
- Work experience relevance and duration (30%)
- Overall presentation and clarity (20%)

Be honest and fair in your assessment.

Here is the CV text:
"""

@app.get("/")
def read_root():
    return {"status": "HRFlow AI Microservice is running (OpenRouter)"}

def extract_text_from_pdf(file_bytes: bytes) -> str:
    try:
        reader = PdfReader(io.BytesIO(file_bytes))
        text = ""
        for page in reader.pages:
            text += page.extract_text() + "\n"
        return text
    except Exception as e:
        print(f"PDF Parsing Error: {e}")
        raise ValueError("Could not extract text from the provided PDF.")

@app.post("/analyze")
async def analyze_cv(file: UploadFile = File(...)):
    if file.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="Only PDF files are supported")
    
    if not os.getenv("OPENROUTER_API_KEY"):
        raise HTTPException(status_code=500, detail="OpenRouter API Key is missing in AI service")
        
    try:
        # Read file contents and extract text
        file_bytes = await file.read()
        cv_text = extract_text_from_pdf(file_bytes)
        
        if not cv_text.strip():
            raise HTTPException(status_code=400, detail="Could not extract any text from the PDF. It might be a scanned image.")

        # Call OpenRouter API using Llama 3.3 70B Instruct (Free)
        response = await client.chat.completions.create(
            model="meta-llama/llama-3.3-70b-instruct:free",
            messages=[
                {"role": "system", "content": "You are a helpful AI assistant that outputs only valid JSON."},
                {"role": "user", "content": f"{PROMPT}\n\n{cv_text}"}
            ]
        )
        
        analysis_text = response.choices[0].message.content.strip()
        
        # Clean up possible markdown wrappers
        if analysis_text.startswith("```json"):
            analysis_text = analysis_text[7:]
        if analysis_text.startswith("```"):
            analysis_text = analysis_text[3:]
        if analysis_text.endswith("```"):
            analysis_text = analysis_text[:-3]
            
        analysis_text = analysis_text.strip()
        
        # Parse JSON
        try:
            analysis = json.loads(analysis_text)
            
            # Validate basic fields
            if "score" not in analysis or "skills" not in analysis:
                 raise ValueError("Missing required fields in GPT-4o response")
                 
            # Ensure score is numeric
            analysis["score"] = max(0, min(100, int(analysis["score"])))
            
            return {"success": True, "analysis": analysis}
            
        except json.JSONDecodeError:
            print(f"Failed to parse JSON: {analysis_text}")
            raise HTTPException(status_code=500, detail="AI returned invalid JSON format")
            
    except Exception as e:
        print(f"Error during CV analysis: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
