import google.generativeai as genai
import os

api_key = os.getenv("GOOGLE_API_KEY") or os.getenv("GEMINI_API_KEY")
genai.configure(api_key=api_key)

print("Available models:")
for m in genai.list_models():
    if 'generateContent' in m.supported_generation_methods:
        print(f"  - {m.name}")

# Try to use a model
try:
    model = genai.GenerativeModel('gemini-pro')
    response = model.generate_content("Hello, test message")
    print(f"\nTest successful! Response: {response.text[:100]}")
except Exception as e:
    print(f"\nError: {e}")
