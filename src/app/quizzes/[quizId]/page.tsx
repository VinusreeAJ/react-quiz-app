'use client';

import { JSX } from "react";
import { useParams } from "next/navigation";
import { Typography, Container, Avatar, Box } from "@mui/material";
import { useSelector } from "react-redux";

import styles from "@/app/page.module.css";
import EasyLevel from "@/components/quiz-levels/easyLevel";
import IntermediateLevel1 from "@/components/quiz-levels/intermediateLevel1";
import UserInfoModal from "@/components/common/userInfoModal";
import { RootState } from "@/store";
import { usePageTitle } from "@/hooks/use-title";

const QuizBackground = ({ videoSrc }: { videoSrc: string }) => (
  <video
    autoPlay
    loop
    muted
    playsInline
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
      zIndex: -1,
    }}
  >
    <source src={videoSrc} type="video/mp4" />
  </video>
);

export default function QuizPage() {

  const { quizId } = useParams();

  const { userName, avatarUrl } = useSelector((state: RootState) => state.user);

  const normalizedQuizId = Array.isArray(quizId) ? quizId[0] : quizId; // to ensure it's a string

  const quizComponents: Record<string, { component: JSX.Element; title: string; video: string }> = {
    easy: { component: <EasyLevel startQuiz={true} />, title: "Easy Level", video: "/assets/videos/videoBg3.mp4" },
    "intermediate-1": { component: <IntermediateLevel1 startQuiz={true} />, title: "Intermediate Level 1", video: "/assets/videos/videoBg.mp4" },
  };

  const currentQuiz = normalizedQuizId ? quizComponents[normalizedQuizId] : undefined;
  if (currentQuiz) usePageTitle(currentQuiz.title);

  return (
    <div style={{ position: "relative", height: "100vh" }}>
      {currentQuiz && <QuizBackground videoSrc={currentQuiz.video} />}
      <UserInfoModal />

      {userName && avatarUrl && (
        <Container sx={{ textAlign: "center", position: "relative", color: "black" }}>
          {/* Display User Info at Top Left */}
          <Box sx={{ position: "absolute", top: 10, left: 10, display: "flex", alignItems: "center", gap: 1 }}>
            <Avatar src={avatarUrl} sx={{ width: 40, height: 40 }} />
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>{userName}</Typography>
          </Box>

          <Typography variant="h6" className={styles.mdTitle}>Quiz - {quizId}</Typography>
          {currentQuiz?.component}
        </Container>
      )}
    </div>
  );
}