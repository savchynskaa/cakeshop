import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Box, IconButton, MenuItem, Stack } from "@mui/material";
import { CustomLink } from "../CustomLink/CustomLink";
import { MenuButton } from "../MenuButton/MenuButton";
import { colors } from "../../utils/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faUser } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router";
import { useUser } from "../../utils/userContext";
import Cookies from 'js-cookie';

const notShotPaths = ['/login', '/register', '/order-form'];

export const Header = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorElOrder, setAnchorElOrders] = React.useState(null);
  const user = useUser();

  const isActive = (path) => path === pathname;

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenOrderMenu = (event) => {
    setAnchorElOrders(event.currentTarget);
  };

  const handleCloseOrderMenu = (path) => {
    path && navigate(path);
    setAnchorElOrders(null);
  };

  const handleLogout = () => {
    Cookies.remove('token');
    Cookies.remove('user');

    window.location.replace('/login');
  };

  if (notShotPaths.includes(pathname) || pathname.includes('form')) {
    return;
  }

  return (
    <AppBar
      position="static"
      sx={{
        bgcolor: "transparent",
        boxShadow: "none",
        padding: "25px 30px 10px 28px",
        borderBottom: (pathname === '/catalog' || pathname === '/reviews') ? `1px solid ${colors.main}` : ''
      }}
    >
      <Container maxWidth="false" sx={{ padding: "0 !important" }}>
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Stack direction="row" sx={{ alignItems: "center" }}>
            <Stack direction="row" gap="20px">
              <CustomLink to="/" name="Головна" />
              <CustomLink to="/catalog" name="Каталог" />
              <CustomLink to="/reviews" name="Відгуки" />

              {(user && user.role !== 'client') &&
                <MenuButton
                  anchorEl={anchorElOrder}
                  handleClose={() => handleCloseOrderMenu()}
                  buttonElement={
                    <IconButton
                      onClick={handleOpenOrderMenu}
                      sx={{
                        p: 0,
                        display: "flex",
                        gap: "6px",
                        color: colors.main,
                        fontSize: "16px",
                        height: "24px",
                        "&::after":
                          isActive("/orders") || isActive("/my-orders")
                            ? {
                              content: '""',
                              position: "absolute",
                              bottom: -2,
                              left: 0,
                              width: "100%",
                              height: "1px",
                              backgroundColor: colors.main,
                              borderRadius: "2px",
                            }
                            : {},
                        "&:hover": {
                          bgcolor: "transparent",
                        },
                        "&:focus": {
                          bgcolor: "transparent",
                        },
                      }}
                    >
                      Замовлення
                      <FontAwesomeIcon icon={faChevronDown} />
                    </IconButton>
                  }
                >
                  <MenuItem onClick={() => handleCloseOrderMenu("/orders")}>
                    <Typography sx={{ textAlign: "center", color: colors.main }}>
                      Всі замовлення
                    </Typography>
                  </MenuItem>

                  <MenuItem
                    onClick={() => handleCloseOrderMenu("/my-orders")}
                  >
                    <Typography sx={{ textAlign: "center", color: colors.main }}>
                      Мої замовлення
                    </Typography>
                  </MenuItem>
                </MenuButton>}
            </Stack>
          </Stack>

          <MenuButton
            anchorEl={anchorElUser}
            handleClose={handleCloseUserMenu}
            buttonElement={
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, }}>
                {!user && <FontAwesomeIcon icon={faUser} color={colors.main} />}
                {user && (
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: colors.main,
                      borderRadius: '50px',
                      width: '40px',
                      height: '40px',
                      color: 'white'
                    }}
                  >
                    {user?.name?.charAt(0)?.toUpperCase()}
                  </Box>
                )}
              </IconButton>
            }
          >
            {user &&
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography onClick={handleLogout} sx={{ textAlign: "center" }}>Вийти</Typography>
              </MenuItem>
            }
            {!user &&
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography onClick={() => navigate('/login')} sx={{ textAlign: "center" }}>Увійти</Typography>
              </MenuItem>
            }
          </MenuButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
