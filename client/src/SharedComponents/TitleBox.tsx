import React from 'react';
import { Typography, Box } from "@material-ui/core";







const TitleBox: React.FC<{ title: string }> = ({ title }) => {
  return (
    <Box mb={3} p={2}>
    <Typography
      align="center"
      variant="h6"
      style={{ lineHeight: 1.25 }}
    >
      {title}
    </Typography>
  </Box>
  );
};

export default TitleBox;