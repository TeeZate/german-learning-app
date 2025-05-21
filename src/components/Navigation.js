import React, { useState } from 'react';
import { 
  AppBar, Toolbar, Typography, Button, IconButton, 
  Box, Drawer, List, ListItem, ListItemIcon, 
  ListItemText, Avatar, Divider, Badge, Menu, MenuItem
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CloseIcon from '@mui/icons-material/Close';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userData } = useUser();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [notificationsAnchor, setNotificationsAnchor] = useState(null);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleNotificationsClick = (event) => {
    setNotificationsAnchor(event.currentTarget);
  };

  const handleNotificationsClose = () => {
    setNotificationsAnchor(null);
  };

  const notificationsOpen = Boolean(notificationsAnchor);

  // Mock notifications
  const notifications = [
    { id: 1, text: "You've earned a new achievement!" },
    { id: 2, text: "Don't forget to practice today to maintain your streak!" }
  ];

  const navItems = [
    { text: 'Home', icon: <HomeIcon />, path: '/' },
    { text: 'Lessons', icon: <LibraryBooksIcon />, path: '/lessons' },
    { text: 'Profile', icon: <AccountCircleIcon />, path: '/profile' }
  ];

  return (
    <>
      <AppBar position="sticky" color="primary" elevation={0}>
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={toggleDrawer(true)}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              flexGrow: 1,
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <SchoolIcon sx={{ mr: 1 }} />
            German Learning App
          </Typography>
          
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center' }}>
            {navItems.map((item) => (
              <Button 
                key={item.text}
                color="inherit"
                onClick={() => navigate(item.path)}
                sx={{ 
                  mx: 1,
                  fontWeight: location.pathname === item.path ? 'bold' : 'normal',
                  borderBottom: location.pathname === item.path ? '2px solid white' : 'none'
                }}
                startIcon={item.icon}
              >
                {item.text}
              </Button>
            ))}
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton 
              color="inherit"
              onClick={handleNotificationsClick}
              sx={{ ml: 1 }}
            >
              <Badge badgeContent={notifications.length} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            
            <Avatar 
              sx={{ 
                ml: 2, 
                cursor: 'pointer',
                bgcolor: 'secondary.main'
              }}
              onClick={() => navigate('/profile')}
            >
              {userData?.name?.charAt(0) || 'U'}
            </Avatar>
          </Box>
        </Toolbar>
      </AppBar>
      
      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <Box sx={{ 
            p: 2, 
            display: 'flex', 
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <Typography variant="h6" component="div">
              Menu
            </Typography>
            <IconButton onClick={toggleDrawer(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          
          <Divider />
          
          <List>
            {navItems.map((item) => (
              <ListItem 
                button 
                key={item.text}
                onClick={() => navigate(item.path)}
                selected={location.pathname === item.path}
              >
                <ListItemIcon>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      
      {/* Notifications Menu */}
      <Menu
        anchorEl={notificationsAnchor}
        open={notificationsOpen}
        onClose={handleNotificationsClose}
        PaperProps={{
          elevation: 3,
          sx: { width: 320, maxHeight: 500 }
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6">Notifications</Typography>
        </Box>
        <Divider />
        {notifications.length > 0 ? (
          notifications.map(notification => (
            <MenuItem key={notification.id} onClick={handleNotificationsClose}>
              <Typography variant="body2">{notification.text}</Typography>
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled>
            <Typography variant="body2">No new notifications</Typography>
          </MenuItem>
        )}
        <Divider />
        <MenuItem onClick={handleNotificationsClose}>
          <Typography variant="body2" color="primary">Mark all as read</Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

export default Navigation;
