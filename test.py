import google.generativeai as genai
from dotenv import load_dotenv
import os

# Load API key from .env
load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    raise ValueError("❌ GEMINI_API_KEY not found in .env file.")

genai.configure(api_key=api_key)

# List available models
print("🔍 Fetching available Gemini models...\n")

models = genai.list_models()

for model in models:
    print(f"🧠 Model ID: {model.name}")
    print(f"   Display Name: {getattr(model, 'display_name', 'N/A')}")
    print(f"   Supported Methods: {getattr(model, 'supported_generation_methods', 'N/A')}")
    print("-" * 60)
