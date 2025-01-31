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

  const { userName, avatarUrl, modalOpen } = useSelector((state: RootState) => state.user);

  // Define background images based on quiz levels
  const getBackgroundImage = () => {
    switch (quizId) {
      case "easy":
        return '/assets/images/animeBg.jpeg';
      case "intermediate-1":
        return '';
      default:
        return '';
    }
  };

  const backgroundImage = getBackgroundImage();

  return (
    <div style={{
      ...(backgroundImage ? { backgroundImage: `url("${backgroundImage}")` } : {}),
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
    }}>
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
