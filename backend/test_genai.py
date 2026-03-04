from google import genai
import os

api_key = os.getenv("GEMINI_API_KEY") or os.getenv("GOOGLE_API_KEY")
client = genai.Client(api_key=api_key)

print("Testing Gemini...")
try:
    response = client.models.generate_content(
        model='gemini-1.5-flash',
        contents="Hello, this is a test. Respond with: Test successful!"
    )
    print(f"✅ Success! Response: {response.text}")
except Exception as e:
    print(f"❌ Error: {e}")
    print("\nTrying different model names...")
    for model_name in ['gemini-pro', 'gemini-1.5-pro', 'gemini-flash']:
        try:
            response = client.models.generate_content(
                model=model_name,
                contents="Test"
            )
            print(f"✅ {model_name} works!")
            break
        except:
            print(f"❌ {model_name} failed")
