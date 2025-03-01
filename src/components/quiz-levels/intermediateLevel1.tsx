"use client";

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { Typography } from "@mui/material";
import { motion } from "framer-motion";
import { sound } from "@pixi/sound";

import { setAnswer } from "@/store/modules/quizUserInfo";
import "@/styles/intermediateLevel.css";

// Quiz questions
const questions = [
  { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], correctAnswer: "4" },
  { question: "What is 3 + 5?", options: ["7", "8", "9", "10"], correctAnswer: "8" },
  { question: "What is 10 - 3?", options: ["5", "6", "7", "8"], correctAnswer: "7" },
  { question: "What is 6 * 2?", options: ["10", "12", "14", "16"], correctAnswer: "12" },
  { question: "What is 8 / 2?", options: ["3", "4", "5", "6"], correctAnswer: "4" },
];

export default function IntermediateLevel1({ startQuiz }: { startQuiz: boolean }) {

  const dispatch = useDispatch();
  const router = useRouter();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timer, setTimer] = useState(15);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  // Load background music
  useEffect(() => {
    sound.add("backgroundMusic", {
      url: "/assets/audios/bgAudio.mp3",
      loop: true,
      volume: 0.5,
    });

    if (startQuiz) {
      sound.play("backgroundMusic");
    }

    return () => {
      sound.stop("backgroundMusic");
    };
  }, [startQuiz]);

  // Countdown timer
  useEffect(() => {
    if (startQuiz && timer > 0 && selectedAnswer === null) {
      const timerId = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(timerId);
    }
    if (timer === 0) handleNextQuestion();
  }, [timer, startQuiz]);

  const handleNextQuestion = () => {
    const timeSpent = 15 - timer;
    if (selectedAnswer !== null) {
      dispatch(setAnswer({ questionIndex: currentQuestionIndex, answer: selectedAnswer, timeTaken: timeSpent }));
    }
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimer(15);
      setSelectedAnswer(null);
    } else {
      sound.stop("backgroundMusic");
      router.push("/results");
    }
  };

  const handleAnswerSelection = (answer: string) => setSelectedAnswer(answer);

  const currentQuestion = questions[currentQuestionIndex];

  // Animations for bouncing, shuffling options
  const optionVariants = {
    animate: {
      x: [0, 25, -25, 15, -15, 0],
      y: [0, -20, 20, -10, 10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "mirror" as "mirror",
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div className="quiz-container" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>

      {/* Question Box */}
      <motion.div className="quiz-box" initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
        <Typography variant="h5" className="quiz-title">{currentQuestion.question}</Typography>
        <Typography className="timer">⏳ {timer}s</Typography>
      </motion.div>

      {/* Animated Options */}
      <motion.div className="options-container">
        {currentQuestion.options.map((option) => (
          <motion.button
            key={option}
            className={`option-button ${selectedAnswer === option ? "selected" : ""}`}
            onClick={() => handleAnswerSelection(option)}
            variants={optionVariants}
            animate="animate"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            {option}
          </motion.button>
        ))}
      </motion.div>

      {/* Next Button */}
      <motion.button className="next-button" onClick={handleNextQuestion} disabled={!selectedAnswer} whileTap={{ scale: 0.95 }}>
        Next →
      </motion.button>

    </motion.div>
  );
}
