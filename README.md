<div align="center">

# ✨ MCQify: AI-Powered Quiz Generator

**Transform any PDF into an interactive quiz in seconds** 🚀

[![Live Link](https://img.shields.io/badge/demo-live-brightgreen)](https://mcqifyy.vercel.app/)
[![FastAPI](https://img.shields.io/badge/FastAPI-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Google Gemini](https://img.shields.io/badge/Gemini-8E75B2?logo=google&logoColor=white)](https://ai.google.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

[Live Demo](https://mcqifyy.vercel.app/) • [Features](#-features) • [Getting Started](#-getting-started) • [API Docs](#-api-reference)

</div>

---

## 🎯 What is MCQify?

MCQify is an intelligent quiz generator that leverages the power of Google's Gemini AI to transform your documents into engaging multiple-choice quizzes. Whether you're a student preparing for exams, a teacher creating assessments, or a professional testing knowledge retention, MCQify makes quiz creation effortless and fun!

Simply upload a PDF, choose how many questions you want, and let AI do the magic ✨

---

## 🌟 Features

### 📄 Smart PDF Processing
- **Instant Upload**: Drag-and-drop or browse to upload any PDF document
- **Intelligent Extraction**: Advanced text processing to understand your content
- **Universal Compatibility**: Works with lecture notes, textbooks, articles, and more

### 🤖 AI-Powered Generation
- **Google Gemini Integration**: Utilizes cutting-edge AI for high-quality question generation
- **Customizable Length**: Choose exactly how many questions you need (5, 10, 20, or more!)
- **Contextual Questions**: AI understands your content to create relevant, challenging questions

### 🎮 Interactive Experience
- **Real-Time Feedback**: Instant visual feedback (green ✓ for correct, red ✗ for incorrect)
- **Answer Reveals**: See the correct answer immediately when you get one wrong
- **Progress Tracking**: Know exactly where you stand throughout the quiz
- **Final Score Summary**: Comprehensive results at the end

### 📊 Results & Sharing
- **Download Results**: Save your score and full quiz as a `.txt` file
- **Share Your Achievement**: Easy sharing options to show off your knowledge
- **Performance Analytics**: Track your progress over time

### 🎨 Beautiful UI
- **Modern Design**: Clean, playful interface built with Tailwind CSS
- **Fully Responsive**: Perfect on desktop, tablet, and mobile
- **Smooth Animations**: Delightful interactions that make learning fun
- **Dark Mode Ready**: Easy on the eyes during late-night study sessions

---

## 🛠️ Tech Stack

### Backend
```python
FastAPI      # High-performance API framework
Uvicorn      # Lightning-fast ASGI server
Gemini AI    # Google's powerful language model
PyPDF2       # Robust PDF text extraction
python-dotenv # Secure environment management
```

### Frontend
```javascript
HTML5        # Semantic markup
Tailwind CSS # Modern utility-first styling
Vanilla JS   # Fast, dependency-free interactivity
```

### Deployment
- **Backend**: Deployed on [Render](https://render.com) for reliable, scalable hosting
- **Frontend**: Can be hosted anywhere (Netlify, Vercel, GitHub Pages, etc.)

---

## 🏗️ System Architecture

### Visual Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                          👤 USER                                 │
│                     (Web Browser)                                │
└────────────────┬────────────────────────────────────────────────┘
                 │
                 │ 1. Upload PDF + Select Question Count
                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                    🎨 FRONTEND                                   │
│              (HTML + Tailwind CSS + JavaScript)                  │
│                                                                   │
│  • File upload interface (drag-and-drop)                         │
│  • Question count selector                                       │
│  • Interactive quiz renderer                                     │
│  • Real-time answer validation                                   │
└────────────────┬────────────────────────────────────────────────┘
                 │
                 │ 2. POST /generate_mcq
                 │    (FormData: file, num_questions)
                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                   ⚡ FASTAPI BACKEND                             │
│                  (Python + FastAPI)                              │
│                                                                   │
│  ┌──────────────────────────────────────────────────┐           │
│  │  Endpoint: /generate_mcq                         │           │
│  │  • Receives PDF file                             │           │
│  │  • Validates file type                           │           │
│  │  • Extracts text content                         │           │
│  └──────────────┬───────────────────────────────────┘           │
│                 │                                                 │
│                 │ 3. Extract text from PDF                       │
│                 ▼                                                 │
│  ┌──────────────────────────────────────────────────┐           │
│  │           📄 PyPDF2 Module                       │           │
│  │  • Reads PDF pages                               │           │
│  │  • Extracts all text content                     │           │
│  │  • Returns plain text string                     │           │
│  └──────────────┬───────────────────────────────────┘           │
└─────────────────┼───────────────────────────────────────────────┘
                  │
                  │ 4. Send extracted text + prompt
                  ▼
┌─────────────────────────────────────────────────────────────────┐
│              🤖 GOOGLE GEMINI API                                │
│                 (gemini-pro model)                               │
│                                                                   │
│  • Analyzes document content                                     │
│  • Generates contextual questions                                │
│  • Creates multiple choice options                               │
│  • Identifies correct answers                                    │
│  • Returns structured JSON                                       │
└────────────────┬────────────────────────────────────────────────┘
                 │
                 │ 5. Return JSON response
                 │    {"mcqs": [...]}
                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                   ⚡ FASTAPI BACKEND                             │
│                                                                   │
│  • Validates JSON structure                                      │
│  • Formats response                                              │
│  • Sends back to frontend                                        │
└────────────────┬────────────────────────────────────────────────┘
                 │
                 │ 6. Receive quiz data
                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                    🎨 FRONTEND                                   │
│                                                                   │
│  • Parse JSON response                                           │
│  • Dynamically build quiz UI                                     │
│  • Display questions one by one                                  │
│  • Track user answers                                            │
│  • Show instant feedback (✓/✗)                                   │
│  • Calculate final score                                         │
│  • Offer download & share options                                │
└────────────────┬────────────────────────────────────────────────┘
                 │
                 │ 7. Interactive quiz experience
                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                          👤 USER                                 │
│                                                                   │
│  • Answers questions                                             │
│  • Sees results in real-time                                     │
│  • Downloads/shares final score                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Data Flow Breakdown

**Step 1-2: Upload Phase**
- User selects PDF file and desired question count
- Frontend creates FormData object with file and parameters
- Sends POST request to backend API

**Step 3-4: Processing Phase**
- FastAPI receives and validates the PDF file
- PyPDF2 extracts all text content from the PDF
- Backend constructs a prompt with the extracted text
- Sends prompt to Google Gemini API

**Step 5-6: Generation Phase**
- Gemini analyzes the content and generates questions
- Returns structured JSON with questions, options, and answers
- Backend validates and forwards the response

**Step 7: Interaction Phase**
- Frontend dynamically renders the quiz interface
- User interacts with questions and receives instant feedback
- System tracks answers and calculates final score
- User can download results or share their achievement



---

## 🚀 Getting Started

### Prerequisites
- Python 3.9 or higher
- Google Gemini API Key ([Get it here](https://ai.google.dev/))
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/your-username/mcqify.git
cd mcqify
```

2. **Set up Python environment**
```bash
# Create virtual environment
python -m venv .venv

# Activate it
# Windows:
.\.venv\Scripts\Activate
# macOS/Linux:
source .venv/bin/activate
```

3. **Install dependencies**
```bash
pip install -r requirements.txt
```

Or install manually:
```bash
pip install fastapi "uvicorn[standard]" google-generativeai python-dotenv PyPDF2
```

4. **Configure environment variables**

Create a `.env` file in the root directory:
```env
GEMINI_API_KEY=your_secret_api_key_here
```

5. **Run the backend**
```bash
python -m uvicorn main:app --reload
```

Server will start at `http://127.0.0.1:8000` 🎉

6. **Launch the frontend**

Open `index.html` in your browser, or use a local server:
```bash
# Using Python
python -m http.server 8080

# Using Node.js
npx serve .
```
## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📬 Contact

Have questions or suggestions? Feel free to reach out!

- **GitHub**: [Sonal](https://github.com/sonall99)
- **Email**: singhsonals999@gmail.com

---

<div align="center">

If you found this project helpful, please consider giving it a ⭐!

[⬆ Back to Top](#-mcqify-ai-powered-quiz-generator)

</div>
