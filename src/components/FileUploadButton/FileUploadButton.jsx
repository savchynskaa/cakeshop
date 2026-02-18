import { Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";

const FileUploadButton = ({ colors, onFileChange }) => {
  const fileInputRef = useRef();

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileChange?.(file); // або оброби як треба
    }
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <Button
        type="button"
        variant="text"
        disableRipple
        disableElevation
        onClick={handleClick}
        sx={{
          color: colors.second,
          borderRadius: "50px",
          textTransform: "none",
          fontSize: "16px",
          fontFamily: "Montserrat",
          "&:hover": {
            backgroundColor: "transparent",
            textDecoration: "underline",
          },
        }}
        startIcon={<FontAwesomeIcon icon={faPaperclip} color={colors.main} />}
      >
        Додати фото дизайну
      </Button>
    </>
  );
};

export default FileUploadButton;
