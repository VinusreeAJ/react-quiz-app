'use client';

import { useRouter } from "next/navigation";
import { Button, Box, Typography } from "@mui/material";
import { useDispatch } from "react-redux";

import { toggleModal } from "@/store/modules/userDetails";
import styles from "@/app/page.module.css";

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleGoToQuizzes = () => {
    dispatch(toggleModal(true));
    router.push('/quizzes');
  };

  return (
    <Box
      className={styles.page}
      sx={{
        width: "100vw",
        height: "100vh",
        backgroundImage: "url('/assets/images/homeBg1.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        position: "relative",
      }}
    >
      {/* Overlay for Better Readability */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark overlay
          zIndex: 1,
        }}
      />

      {/* Main Content */}
      <Box sx={{ position: "relative", zIndex: 2 }}>
        <Typography
          variant="h2"
          sx={{
            fontWeight: "bold",
            background: "linear-gradient(135deg, #ff758c, #ff7eb3)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)",
            mb: 3,
          }}
        >
          QuizBuzz
        </Typography>

        <Button
          onClick={handleGoToQuizzes}
          sx={{
            px: 4,
            py: 1.5,
            fontSize: "18px",
            fontWeight: "bold",
            borderRadius: 4,
            background: "linear-gradient(135deg, #007bff, #7b2ff7)",
            color: "white",
            transition: "all 0.3s ease-in-out",
            "&:hover": {
              background: "linear-gradient(135deg, #0056b3, #5a1f9f)",
              transform: "scale(1.05)",
            },
          }}
        >
          Go to Quizzes
        </Button>
      </Box>
    </Box>
  );
}
