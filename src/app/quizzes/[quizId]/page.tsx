'use client';

import { useParams } from "next/navigation";
import { Typography, Container, Avatar, Box } from "@mui/material";
import { useSelector } from "react-redux";

import styles from "@/app/page.module.css";
import EasyLevel from "@/components/quiz-levels/easyLevel";
import IntermediateLevel1 from "@/components/quiz-levels/intermediateLevel1";
import UserInfoModal from "@/components/common/userInfoModal";
import { RootState } from "@/store";

export default function QuizPage() {
  const params = useParams();
  const quizId = params.quizId;

  const { userName, avatarUrl } = useSelector((state: RootState) => state.user);

  // Function to return background element based on quiz level
  const getBackgroundElement = () => {
    if (quizId === "easy") {
      return (
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: -1,
          }}
        >
          <source src="/assets/videos/videoBg3.mp4" type="video/mp4" />
        </video>
      );
    } else if (quizId === "intermediate-1") {
      return (
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: -1,
          }}
        >
          <source src="/assets/videos/videoBg.mp4" type="video/mp4" />
        </video>
      );
    }
    return null;
  };

  return (
    <div style={{ position: "relative", height: "100vh" }}>
      {getBackgroundElement()}
      <UserInfoModal />

      {!userName && !avatarUrl ? null : (
        <Container sx={{ textAlign: "center", position: "relative", color: 'black' }}>
          {/* Display User Info at Top Left */}
          {userName && avatarUrl && (
            <Box sx={{ position: "absolute", top: 10, left: 10, display: "flex", alignItems: "center", gap: 1 }}>
              <Avatar src={avatarUrl} sx={{ width: 40, height: 40 }} />
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>{userName}</Typography>
            </Box>
          )}

          <Typography variant="h6" className={styles.mdTitle}>Quiz - {quizId}</Typography>

          {/* Render Quiz Component Only if User Has Entered Details */}
          {userName && avatarUrl && quizId === 'easy' && <EasyLevel startQuiz={true} />}
          {userName && avatarUrl && quizId === 'intermediate-1' && <IntermediateLevel1 startQuiz={true} />}
        </Container>
      )}
    </div>
  );
}
