import React from 'react';
import { Typography, Box } from "@material-ui/core";







const TitleBox: React.FC<{ title: string }> = ({ title }) => {
  return (
    <Box pt={3} pb={1.5}>
      <Typography
        align="center"
        variant="h5"
        style={{ lineHeight: 1.25 }}
      >
        {title}
      </Typography>
    </Box>
  );
};

export default TitleBox;