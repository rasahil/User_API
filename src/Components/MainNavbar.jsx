import React, { useState, useEffect } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  IconButton,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  InboxArrowDownIcon,
  LifebuoyIcon,
  PowerIcon,
  Bars2Icon,
} from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";

// Profile menu component
const profileMenuItems = (isLoggedIn) => [
  {
    label: "My Profile",
    icon: UserCircleIcon,
    show: isLoggedIn,
  },
  {
    label: "Edit Profile",
    icon: Cog6ToothIcon,
    show: isLoggedIn,
  },
  {
    label: "Inbox",
    icon: InboxArrowDownIcon,
    show: isLoggedIn,
  },
  {
    label: "Help",
    icon: LifebuoyIcon,
    show: true,
  },
  {
    label: "Sign Out" ,
    icon: PowerIcon,
    show: true,
  },
];

function ProfileMenu({ isLoggedIn, handleLogout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <Avatar
            variant="circular"
            size="sm"
            alt="user profile"
            className="border border-gray-900 p-0.5"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
          />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${isMenuOpen ? "rotate-180" : ""}`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {profileMenuItems(isLoggedIn).map(({ label, icon, show }, key) => {
          if (!show) return null;
          const isLastItem = key === profileMenuItems(isLoggedIn).length - 1;
          return (
            <MenuItem
              key={label}
              onClick={() => {
                closeMenu();
                if (label === "Sign Out") handleLogout();
              }}
              className={`flex items-center gap-2 rounded ${
                isLastItem ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10" : ""
              }`}
            >
              {React.createElement(icon, {
                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                strokeWidth: 2,
              })}
              <Typography as="span" variant="small" className="font-normal" color={isLastItem ? "red" : "inherit"}>
                {label}
              </Typography>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}

export function MainNavbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

  useEffect(() => {
    window.addEventListener("resize", () => window.innerWidth >= 960 && setIsNavOpen(false));
    
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    navigate("/signin"); // Redirect to the sign-in page
  };

  return (
    <Navbar className="mx-auto max-w-screen-xl p-2 lg:rounded-full lg:pl-6">
      <div className="relative mx-auto flex items-center justify-between text-blue-gray-900">
        <Link to="/">
          <Typography as="a" className="mr-4 ml-2 cursor-pointer py-1.5 font-medium">
            Demo Components
          </Typography>
        </Link>

        <IconButton size="sm" color="blue-gray" variant="text" onClick={toggleIsNavOpen} className="ml-auto mr-2 lg:hidden">
          <Bars2Icon className="h-6 w-6" />
        </IconButton>

        {isLoggedIn ? (
          <Link className="mx-1" to="/dashboard">
            <Button size="sm" variant="outlined">
              <span>Dashboard</span>
            </Button>
          </Link>
        ) : (
          <>
            <Link className="mx-1" to="/signup">
              <Button size="sm" variant="outlined">
                <span>Sign Up</span>
              </Button>
            </Link>
            <Link to="/signin">
              <Button size="sm" variant="outlined">
                <span>Sign In</span>
              </Button>
            </Link>
          </>
        )}
        <ProfileMenu isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      </div>
      <MobileNav open={isNavOpen} className="overflow-scroll">
        {/* Mobile nav items can go here if needed */}
      </MobileNav>
    </Navbar>
  );
}
