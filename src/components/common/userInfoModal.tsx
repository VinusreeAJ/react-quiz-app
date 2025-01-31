import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserName, setAvatarUrl, toggleModal } from "@/store/modules/userDetails";
import { Modal, Box, TextField, Button, Avatar, Typography } from "@mui/material";
import { RootState } from "@/store";
import { motion } from "framer-motion";

const UserInfoModal = () => {
  const dispatch = useDispatch();
  const { userName, avatarUrl, modalOpen } = useSelector((state: RootState) => state.user);

  const defaultAvatars = [
    "/assets/images/avatar1.jpeg",
    "/assets/images/avatar2.jpeg",
    "/assets/images/avatar3.jpeg",
    "/assets/images/avatar4.jpeg",
    "/assets/images/avatar5.jpeg",
    "/assets/images/avatar6.jpeg",
  ];

  useEffect(() => {
    if (modalOpen) {
      dispatch(setUserName(""));
      dispatch(setAvatarUrl(""));
    }
  }, [modalOpen, dispatch]);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (userName.trim() === "") return;
    dispatch(toggleModal(false));
  };

  const handleAvatarClick = (url: string) => {
    dispatch(setAvatarUrl(url));
  };

  return (
    <Modal open={modalOpen} onClose={() => dispatch(toggleModal(false))}>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", color: 'black' }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            width: 350,
            bgcolor: "white",
            boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)",
            p: 4,
            borderRadius: 3,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            textAlign: "center",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>Enter Your Details</Typography>

          {/* Custom Styled Input */}
          <TextField
            label="User Name"
            variant="outlined"
            fullWidth
            required
            sx={{
              bgcolor: "#f5f5f5",
              borderRadius: 2,
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#ccc" },
                "&:hover fieldset": { borderColor: "#3f51b5" },
                "&.Mui-focused fieldset": { borderColor: "#3f51b5" },
              },
            }}
            value={userName}
            onChange={(e) => dispatch(setUserName(e.target.value))}
          />

          <Typography variant="body1" sx={{ fontWeight: "bold" }}>Choose an Avatar:</Typography>
          
          {/* Avatar Grid */}
          <motion.div
            className="avatar-container"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "10px",
              justifyContent: "center",
              padding: "10px",
            }}
          >
            {defaultAvatars.map((avatar, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <Avatar
                  src={avatar}
                  sx={{
                    width: 60,
                    height: 60,
                    cursor: "pointer",
                    border: avatarUrl === avatar ? "3px solid #3f51b5" : "2px solid transparent",
                    transition: "border 0.2s ease-in-out",
                  }}
                  onClick={() => handleAvatarClick(avatar)}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Animated Button */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                background: "linear-gradient(135deg, #3f51b5 30%, #6573c3 90%)",
                color: "white",
                fontWeight: "bold",
                borderRadius: 3,
                padding: "10px",
                "&:hover": {
                  background: "linear-gradient(135deg, #3549a1 30%, #5c6bc0 90%)",
                },
              }}
            >
              Save
            </Button>
          </motion.div>
        </Box>
      </motion.div>
    </Modal>
  );
};

export default UserInfoModal;
