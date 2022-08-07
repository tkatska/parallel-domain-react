import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  Divider,
  Typography,
  Box,
  Button,
} from "@mui/material";
import mui from "./../theme/mui";

const JobsList = ({ item }) => {

  const routeChange = () => {
    window.location.href = `https://jobs.lever.co/paralleldomain/a71b87c8-b0a6-4425-bb96-91c169ca2318/apply`;
  };
  
  return (
    <List>
      <ListItem button sx={{}}>
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            flexDirection: "column",
            marginBottom: "10px",
            width: "100%",
          }}
        >
          <Typography variant="h4">{item.text}</Typography>
          <ListItemText
            primary={`${item.categories.location} / ${item.categories.team}`}
          />
        </Box>
        <Button variant="outlined" onClick={routeChange}>
          Apply
        </Button>
      </ListItem>
      <Divider color={mui.palette.text.primary} />
    </List>
  );
};

export default JobsList;
