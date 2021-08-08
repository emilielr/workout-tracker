import {
  AppBar,
  createStyles,
  Divider,
  Drawer,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Theme,
  Toolbar,
  useTheme,
} from "@material-ui/core";
import { useState } from "react";
import MenuIcon from "@material-ui/icons/Menu";
import "./TopBar.scss";
import { Link } from "react-router-dom";
import AddIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import ListIcon from "@material-ui/icons/ListAltOutlined";
import LightIcon from "@material-ui/icons/EmojiObjectsOutlined";
import BarChartIcon from "@material-ui/icons/BarChartOutlined";
import CalendarIcon from "@material-ui/icons/CalendarTodayOutlined";

type ListProps = {
  text: string;
  icon: JSX.Element;
  link: string;
};

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    drawer: {
      [theme.breakpoints.up("sm")]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    appBar: {
      backgroundColor: "#EF820D",
      [theme.breakpoints.up("sm")]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up("sm")]: {
        display: "none",
      },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    icon: {
      minWidth: "40px",
    },
  })
);

export const TopBar = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const list1: ListProps[] = [
    { text: "Opprett ny økt", icon: <AddIcon />, link: "/newWorkout" },
    { text: "Tidligere økter", icon: <ListIcon />, link: "/allWorkouts" },
    { text: "Forslagsbank", icon: <LightIcon />, link: "/suggestions" },
  ];
  const list2: ListProps[] = [
    { text: "Progresjonsgrafer", icon: <BarChartIcon />, link: "/chart" },
    { text: "Kalender", icon: <CalendarIcon />, link: "/calendar" },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div className="drawer-container">
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {list1.map((element: ListProps) => (
          <Link to={element.link}>
            <ListItem button key={element.text}>
              <ListItemIcon className={classes.icon}>
                {element.icon}
              </ListItemIcon>
              <ListItemText primary={element.text} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        {list2.map((element: ListProps) => (
          <Link to={element.link}>
            <ListItem button key={element.text}>
              <ListItemIcon className={classes.icon}>
                {element.icon}
              </ListItemIcon>
              <ListItemText primary={element.text} />
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  );

  return (
    <div className="topbar-container">
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          Workout Tracker
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
};
