import React, { useState, useEffect, useRef } from 'react';
import { Upload, Sparkles, Check, X, Download, Share2, RefreshCw, ChevronDown } from 'lucide-react';

const mcqify = () => {
  const [currentSection, setCurrentSection] = useState('hero');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [numQuestions, setNumQuestions] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const [quizData, setQuizData] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [confetti, setConfetti] = useState([]);
  const fileInputRef = useRef(null);

  const sampleQuiz = [
    {
      question: "What is the primary function of the mitochondria in a cell?",
      options: ["Protein synthesis", "Energy production", "DNA replication", "Cell division"],
      correct: 1
    },
    {
      question: "Which programming language is known for its use in web development?",
      options: ["C++", "Java", "JavaScript", "Python"],
      correct: 2
    },
    {
      question: "What is the capital of France?",
      options: ["London", "Berlin", "Madrid", "Paris"],
      correct: 3
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      correct: 1
    },
    {
      question: "What does HTML stand for?",
      options: ["Hyper Text Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language"],
      correct: 0
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      if (scrollY < windowHeight) setCurrentSection('hero');
      else if (scrollY < windowHeight * 2) setCurrentSection('feature1');
      else if (scrollY < windowHeight * 3) setCurrentSection('feature2');
      else if (scrollY < windowHeight * 4) setCurrentSection('feature3');
      else setCurrentSection('generator');
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setUploadedFile(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type === 'application/pdf') {
      setUploadedFile(file);
    }
  };

  const generateQuiz = () => {
    if (!uploadedFile) {
      alert('Please upload a PDF first!');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const quiz = sampleQuiz.slice(0, numQuestions);
      setQuizData(quiz);
      setIsLoading(false);
      setCurrentQuestion(0);
      setSelectedAnswers({});
      setShowResults(false);
      setScore(0);
      
      setTimeout(() => {
        document.getElementById('quiz-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }, 2000);
  };

  const handleAnswerSelect = (questionIndex, answerIndex) => {
    if (selectedAnswers[questionIndex] !== undefined) return;

    setSelectedAnswers({ ...selectedAnswers, [questionIndex]: answerIndex });

    if (answerIndex === quizData[questionIndex].correct) {
      setScore(score + 1);
      triggerConfetti();
    }

    if (questionIndex === quizData.length - 1) {
      setTimeout(() => setShowResults(true), 1500);
    } else {
      setTimeout(() => setCurrentQuestion(questionIndex + 1), 1500);
    }
  };

  const triggerConfetti = () => {
    const newConfetti = Array.from({ length: 50 }, (_, i) => ({
      id: Date.now() + i,
      left: Math.random() * 100,
      delay: Math.random() * 0.5,
      duration: 2 + Math.random() * 1
    }));
    setConfetti(newConfetti);
    setTimeout(() => setConfetti([]), 3000);
  };

  const resetQuiz = () => {
    setUploadedFile(null);
    setQuizData([]);
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowResults(false);
    setScore(0);
    document.getElementById('generator-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const shareResults = () => {
    const text = `I just scored ${score}/${quizData.length} on MCQify! 🎉`;
    if (navigator.share) {
      navigator.share({ title: 'My MCQify Score', text });
    } else {
      navigator.clipboard.writeText(text);
      alert('Score copied to clipboard! 📋');
    }
  };

  const downloadResults = () => {
    const results = `MCQify Quiz Results\nScore: ${score}/${quizData.length}\nPercentage: ${Math.round((score / quizData.length) * 100)}%\nDate: ${new Date().toLocaleDateString()}`;
    const blob = new Blob([results], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mcqify-results.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="relative overflow-x-hidden bg-black">
      {/* Confetti */}
      {confetti.map(c => (
        <div
          key={c.id}
          className="fixed w-3 h-3 rounded-full pointer-events-none z-50"
          style={{
            left: `${c.left}%`,
            top: '-10px',
            background: ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#00f2fe'][Math.floor(Math.random() * 5)],
            animation: `fall ${c.duration}s ease-out forwards`,
            animationDelay: `${c.delay}s`
          }}
        />
      ))}

      <style>{`
        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(102, 126, 234, 0.5); }
          50% { box-shadow: 0 0 40px rgba(102, 126, 234, 0.8); }
        }
        .animate-gradient {
          background-size: 400% 400%;
          animation: gradient 15s ease infinite;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
      `}</style>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-500 to-blue-500 animate-gradient" />
        
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full opacity-20 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center px-4">
          <h1 className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tight">
            {'MCQify'.split('').map((letter, i) => (
              <span
                key={i}
                className="inline-block animate-float"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {letter}
              </span>
            ))}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 font-medium animate-fade-in">
            Your AI-powered MCQ generator — fast, smart, and fun!
          </p>
          <p className="text-lg md:text-xl text-white/80 mt-4 animate-fade-in">
            Upload your notes. Generate quizzes. Learn playfully.
          </p>
        </div>

        <ChevronDown className="absolute bottom-10 text-white w-8 h-8 animate-bounce" />
      </section>

      {/* Feature Section 1 */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 px-4 py-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Instantly Generate Tests & Quizzes
            </h2>
            <p className="text-xl text-gray-700 leading-relaxed">
              Effortlessly create quizzes from your PDFs in seconds.
            </p>
            <p className="text-xl text-gray-700 leading-relaxed">
              Just upload your file — and our AI takes care of the rest.
            </p>
            <p className="text-2xl font-bold text-purple-600 mt-6">
              "It's faster, smarter, and fun to use."
            </p>
          </div>
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-64 h-64 bg-white rounded-3xl shadow-2xl flex items-center justify-center animate-float">
                <div className="text-7xl transform hover:scale-110 transition-transform duration-300">
                  📄➡️📝
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section 2 */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-yellow-50 px-4 py-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center order-2 md:order-1">
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: '✓', label: 'True/False', color: 'from-green-400 to-emerald-500' },
                { icon: '⊙', label: 'Multiple Choice', color: 'from-blue-400 to-cyan-500' },
                { icon: '___', label: 'Fill Blank', color: 'from-purple-400 to-pink-500' },
                { icon: '💭', label: 'Conceptual', color: 'from-orange-400 to-red-500' }
              ].map((type, i) => (
                <div
                  key={i}
                  className={`bg-gradient-to-br ${type.color} rounded-2xl p-6 shadow-xl transform hover:scale-105 hover:rotate-3 transition-all duration-300 cursor-pointer`}
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="text-4xl mb-2">{type.icon}</div>
                  <div className="text-white font-semibold">{type.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-6 order-1 md:order-2 animate-fade-in">
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Versatile Question Types
            </h2>
            <p className="text-xl text-gray-700 leading-relaxed">
              MCQify doesn't stop at just multiple-choice.
            </p>
            <p className="text-xl text-gray-700 leading-relaxed">
              It can also create true/false, fill-in-the-blank, or conceptual questions from your uploaded content.
            </p>
            <p className="text-2xl font-bold text-blue-600 mt-6">
              "Perfect for any subject, any learner."
            </p>
          </div>
        </div>
      </section>

      {/* Feature Section 3 */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 px-4 py-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Perfect for Teachers & Students
            </h2>
            <p className="text-xl text-gray-700 leading-relaxed">
              Whether you're a teacher preparing class quizzes or a student testing your revision notes — MCQify helps both.
            </p>
            <p className="text-2xl font-bold text-pink-600 mt-6">
              "Turn any study material into interactive learning."
            </p>
          </div>
          <div className="flex justify-center gap-8">
            {[
              { emoji: '👩‍🏫', label: 'Teacher', color: 'from-pink-500 to-rose-500' },
              { emoji: '👨‍🎓', label: 'Student', color: 'from-blue-500 to-cyan-500' }
            ].map((char, i) => (
              <div key={i} className="text-center transform hover:scale-110 transition-transform duration-300">
                <div className={`w-32 h-32 bg-gradient-to-br ${char.color} rounded-full flex items-center justify-center text-5xl shadow-2xl animate-float mb-4`}>
                  {char.emoji}
                </div>
                <p className="font-bold text-purple-600 text-lg">{char.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Generator Section */}
      <section id="generator-section" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-pink-500 to-blue-500 px-4 py-20">
        <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-8 md:p-12 transform hover:scale-105 transition-transform duration-300">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Generate Your Quiz
          </h2>

          <div
            className="border-4 border-dashed border-purple-400 rounded-2xl p-12 text-center cursor-pointer bg-gradient-to-br from-purple-50 to-pink-50 hover:border-purple-600 hover:bg-purple-100 transition-all duration-300 relative overflow-hidden group"
            onClick={() => fileInputRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400/0 via-purple-400/20 to-purple-400/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              onChange={handleFileUpload}
              className="hidden"
            />
            <Upload className="w-16 h-16 mx-auto mb-4 text-purple-600 animate-float" />
            <p className="text-lg font-semibold text-purple-600">
              {uploadedFile ? `📄 ${uploadedFile.name}` : '📤 Drop your PDF here or click to upload'}
            </p>
          </div>

          <div className="mt-8">
            <label className="block text-lg font-semibold text-gray-700 mb-3">
              How many questions would you like?
            </label>
            <input
              type="number"
              value={numQuestions}
              onChange={(e) => setNumQuestions(Math.min(20, Math.max(1, parseInt(e.target.value) || 1)))}
              className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-xl focus:border-purple-600 focus:ring-4 focus:ring-purple-200 outline-none transition-all duration-300"
              min="1"
              max="20"
            />
          </div>

          {isLoading ? (
            <div className="mt-8 text-center">
              <div className="inline-block w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
              <p className="mt-4 text-lg font-semibold text-purple-600 flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5" />
                Generating your quiz with AI magic...
              </p>
            </div>
          ) : (
            <button
              onClick={generateQuiz}
              className="w-full mt-8 py-4 text-xl font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2 animate-pulse-glow"
            >
              <Sparkles className="w-6 h-6" />
              Generate Quiz
            </button>
          )}
        </div>
      </section>

      {/* Quiz Section */}
      {quizData.length > 0 && !showResults && (
        <section id="quiz-section" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 px-4 py-20">
          <div className="max-w-3xl w-full">
            <div className="mb-8 flex justify-between items-center">
              <div className="text-sm font-semibold text-purple-600">
                Question {currentQuestion + 1} of {quizData.length}
              </div>
              <div className="flex gap-2">
                {quizData.map((_, i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      i < currentQuestion ? 'bg-green-500' :
                      i === currentQuestion ? 'bg-purple-600 animate-pulse' :
                      'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 transform hover:scale-105 transition-transform duration-300">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">
                {quizData[currentQuestion]?.question}
              </h3>

              <div className="space-y-4">
                {quizData[currentQuestion]?.options.map((option, i) => {
                  const isSelected = selectedAnswers[currentQuestion] === i;
                  const isCorrect = quizData[currentQuestion].correct === i;
                  const showAnswer = selectedAnswers[currentQuestion] !== undefined;

                  return (
                    <button
                      key={i}
                      onClick={() => handleAnswerSelect(currentQuestion, i)}
                      disabled={showAnswer}
                      className={`w-full p-5 text-left text-lg font-medium rounded-xl transition-all duration-300 transform hover:scale-105 ${
                        !showAnswer
                          ? 'bg-gradient-to-r from-purple-100 to-pink-100 hover:from-purple-200 hover:to-pink-200 border-2 border-purple-300'
                          : isCorrect
                          ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white border-2 border-green-600'
                          : isSelected
                          ? 'bg-gradient-to-r from-red-400 to-rose-500 text-white border-2 border-red-600'
                          : 'bg-gray-100 opacity-50 border-2 border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{option}</span>
                        {showAnswer && isCorrect && <Check className="w-6 h-6" />}
                        {showAnswer && isSelected && !isCorrect && <X className="w-6 h-6" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Results Section */}
      {showResults && (
        <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-pink-500 to-blue-500 px-4 py-20">
          <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center transform hover:scale-105 transition-transform duration-300">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Quiz Complete!
            </h2>
            <div className="text-8xl font-black text-purple-600 my-8 animate-pulse">
              {score}/{quizData.length}
            </div>
            <p className="text-2xl text-gray-600 mb-8">
              {score === quizData.length ? '🎉 Perfect Score! Amazing!' : score >= quizData.length * 0.7 ? '🌟 Great job! Keep learning!' : '💪 Good effort! Try again!'}
            </p>

            <div className="space-y-4">
              <button
                onClick={resetQuiz}
                className="w-full py-4 text-lg font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-5 h-5" />
                Try Another PDF
              </button>
              <button
                onClick={shareResults}
                className="w-full py-4 text-lg font-bold text-purple-600 bg-white border-2 border-purple-600 rounded-xl hover:bg-purple-50 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Share2 className="w-5 h-5" />
                Share Your Quiz
              </button>
              <button
                onClick={downloadResults}
                className="w-full py-4 text-lg font-bold text-purple-600 bg-white border-2 border-purple-600 rounded-xl hover:bg-purple-50 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                Download Results
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default mcqify;