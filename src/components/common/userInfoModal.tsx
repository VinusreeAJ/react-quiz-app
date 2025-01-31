import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserName, setAvatarUrl, toggleModal } from "@/store/modules/userDetails";
import { Modal, Box, TextField, Button, Avatar, Grid2, Typography } from "@mui/material";
import { RootState } from "@/store";

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

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (userName.trim() === "") return;

    dispatch(toggleModal(false));
  };

  const handleAvatarClick = (url: string) => {
    dispatch(setAvatarUrl(url));
  };

  return (
    <Modal open={modalOpen} onClose={() => dispatch(toggleModal(false))}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 300,
          bgcolor: "background.paper",
          color: 'black',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography variant="h6">Enter Your Details</Typography>
        <TextField
          label="User Name"
          variant="outlined"
          fullWidth
          required
          value={userName}
          onChange={(e) => dispatch(setUserName(e.target.value))}
        />
        <Typography variant="body1">Choose an Avatar:</Typography>
        <Grid2 container spacing={2}>
          {defaultAvatars.map((avatar, index) => (
            <Grid2 key={index}>
              <Avatar
                src={avatar}
                sx={{
                  width: 60,
                  height: 60,
                  cursor: "pointer",
                  border: avatarUrl === avatar ? "2px solid #3f51b5" : "none",
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: "scale(1.1)",
                  },
                }}
                onClick={() => handleAvatarClick(avatar)}
              />
            </Grid2>
          ))}
        </Grid2>
        <Button type="submit" variant="contained" fullWidth>
          Save
        </Button>
      </Box>
    </Modal>
  );
};

export default UserInfoModal;
