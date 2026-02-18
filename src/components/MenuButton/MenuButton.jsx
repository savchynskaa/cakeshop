import { Box, Menu } from "@mui/material";

export const MenuButton = ({
  anchorEl,
  handleClose,
  buttonElement,
  children,
}) => {
  return (
    <Box sx={{ flexGrow: 0 }}>
      {buttonElement}

      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {children}
      </Menu>
    </Box>
  );
};
