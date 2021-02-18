import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import { List, ListItem, Typography, ListItemText, ListItemIcon } from '@material-ui/core';

const Accordion = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiAccordionDetails);

const FAQList: React.FC = () => {
  const [expanded, setExpanded] = React.useState<string | false>('panel1');

  // eslint-disable-next-line @typescript-eslint/ban-types
  const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
      <Accordion square expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>What is this app?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            This is a hobbyist creation for trading homebrews of any kind.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion square expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography>Is this legal?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            In most European countries friends-and-family-type distribution of homebrews is totally legal. If it&apos;s not legal in your area,
            don&apos;t do it and especially don&apos;t use this site to do it.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion square expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography>Can I sell my homebrews here?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Absolutely not. This is a hobbyist created and ran app, to be used by homebrewing hobbyists. I&apos;m not willing to deal with any legal headaches involved. 
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion square expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
        <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
          <Typography>Can I trade for commercial brews?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            No. This would be too easily interpretable as selling. This is a hobbyist created and ran app, to be used by homebrewing hobbyists..
            I&apos;m not willing to deal with any legal headaches involved. 
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion square expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
        <AccordionSummary aria-controls="panel5d-content" id="panel5d-header">
          <Typography>How is my data handled?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            The app will only collect and store data actually necessary for the functionality offered to users. 
          </Typography>
          <Typography>
          Heres a few key principles followed:
          </Typography>
          <List>

          </List>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default FAQList;