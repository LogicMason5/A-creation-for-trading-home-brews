import { Typography } from '@material-ui/core';
import React from 'react';

interface DisplayTextItemProps {
  title: string,
  content: string,
}

const DisplayTextItem: React.FC<DisplayTextItemProps> = ({ title, content }) => (
  <>
    <Typography color="textSecondary" component="p">
      {title}
    </Typography>
    <Typography color="textPrimary" component="p">
      {content}
    </Typography>
  </>
);

export default DisplayTextItem;
