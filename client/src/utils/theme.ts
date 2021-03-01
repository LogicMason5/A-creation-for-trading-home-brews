import { createMuiTheme } from '@material-ui/core/styles';
import { deepOrange, orange } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: orange,
    secondary: deepOrange,
    background: {
      default: '#fffff6',
      paper: '#fffff6',
    },
  },
});

export default theme;
