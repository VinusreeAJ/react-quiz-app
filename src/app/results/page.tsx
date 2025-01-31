"use client";

import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Confetti from "react-confetti";
import { Card, CardContent, Typography, Avatar, Button, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { RootState } from "@/store";
import styles from "@/app/page.module.css";

export default function Results() {
  const router = useRouter();
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  // Retrieve state from Redux
  const { answers, score } = useSelector((state: RootState) => state.quizUserInfo);
  const { userName, avatarUrl } = useSelector((state: RootState) => state.user);

  // Update confetti size dynamically
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleResize(); // Initial size
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Confetti Effect */}
      {score > 40 && (
        <Confetti width={windowSize.width} height={windowSize.height} numberOfPieces={200} gravity={0.2} />
      )}

      {/* Enhanced Results Card */}
      <Card
        className={styles.resultCard}
        sx={{
          maxWidth: 500,
          mx: "auto",
          p: 3,
          textAlign: "center",
          borderRadius: 4,
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
          background: "linear-gradient(135deg, #f9f9f9, #ffffff)",
          border: "2px solid #ff758c"
        }}
      >
        <CardContent>
          {/* Title with Animation */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Typography variant="h4" color="primary" fontWeight="bold" gutterBottom>
              🎉 Quiz Results 🎉
            </Typography>
          </motion.div>

          {/* User Info */}
          <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
            <Avatar
              src={avatarUrl}
              alt={userName}
              sx={{ width: 80, height: 80, mb: 1, border: "3px solid #ff758c" }}
            />
            <Typography variant="h5" fontWeight="bold">{userName}</Typography>
          </Box>

          {/* Score Display */}
          <Box
            sx={{
              backgroundColor: score > 40 ? "#4CAF50" : "#FF5722",
              color: "white",
              borderRadius: 2,
              px: 2,
              py: 1,
              mb: 2,
              fontSize: "20px",
              fontWeight: "bold",
              display: "inline-block"
            }}
          >
            Score: {score}
          </Box>

          {/* Total Time Taken */}
          <Typography variant="body1" fontWeight="bold" color="textSecondary" mb={2}>
            ⏳ Total Time Taken: {answers.map((item) => (item.timeTaken))} seconds
          </Typography>

          {/* Detailed Answer Breakdown */}
          <Box sx={{ textAlign: "left", pl: 3 }}>
            {answers.map((item, index) => (
              <Typography key={index} variant="body2" mb={0.5}>
                <strong>Q{index + 1}:</strong> {item.answer} <span style={{ color: "#FF5722" }}>({item.timeTaken}s)</span>
              </Typography>
            ))}
          </Box>

          {/* Restart Quiz Button */}
          <motion.div
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
          >
            <Button
              variant="contained"
              fullWidth
              sx={{
                mt: 3,
                py: 1.5,
                fontSize: "18px",
                fontWeight: "bold",
                borderRadius: 4,
                background: "linear-gradient(135deg, #ff758c, #ff7eb3)",
                color: "white",
                "&:hover": {
                  background: "linear-gradient(135deg, #ff5a6e, #ff6f92)"
                }
              }}
              onClick={() => router.push("/")}
            >
              🔄 Restart Quiz
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
