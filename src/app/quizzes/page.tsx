"use client";

import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";

import styles from "@/app/page.module.css";

const quizzes = [
  { id: "easy", title: "Easy", background: "/assets/images/animebg2.jpeg" },
  { id: "intermediate-1", title: "Intermediate Level 1", background: "/assets/images/animebg1.jpeg" },
  { id: "intermediate-2", title: "Intermediate Level 2", background: "/assets/images/animebg3.jpeg" },
  { id: "intermediate-3", title: "Intermediate Level 3", background: "/assets/images/animebg4.jpeg" },
  { id: "advanced-1", title: "Advanced Level 1", background: "/assets/images/animebg5.jpeg" },
  { id: "advanced-2", title: "Advanced Level 2", background: "/assets/images/animebg6.jpeg" },
];

export default function Quizzes() {
  const router = useRouter();

  const handleStartQuiz = (id: string) => {
    router.push(`/quizzes/${id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className={styles.page}
    >
      <Typography
        variant="h3"
        align="center"
        className={styles.title}
        gutterBottom
        component={motion.h3}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        sx={{
          fontWeight: "bold",
          color: "#ff4081",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
        }}
      >
        QuizBuzz
      </Typography>

      <Swiper
        effect="coverflow"
        loop
        grabCursor
        centeredSlides
        slidesPerView="auto"
        coverflowEffect={{ rotate: 30, stretch: 0, depth: 150, modifier: 1, slideShadows: true }}
        navigation
        pagination={{ clickable: true }}
        modules={[EffectCoverflow, Navigation, Pagination]}
        className="quizSwiper"
      >
        {quizzes.map((quiz) => (
          <SwiperSlide key={quiz.id}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Card
                sx={{
                  height: 350,
                  textAlign: "center",
                  p: 2,
                  backgroundImage: `url(${quiz.background})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  color: "white",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.6)",
                  borderRadius: "20px",
                }}
              >
                <CardContent>
                  <Typography variant="h5" sx={{ fontWeight: "bold", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)" }}>
                    {quiz.title}
                  </Typography>
                  <motion.div whileHover={{ scale: 1.1 }}>
                    <Button
                      variant="contained"
                      color="secondary"
                      sx={{ mt: 2, fontWeight: "bold", px: 3, py: 1, borderRadius: "10px" }}
                      onClick={() => handleStartQuiz(quiz.id)}
                    >
                      Start Quiz
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.div>
  );
}
