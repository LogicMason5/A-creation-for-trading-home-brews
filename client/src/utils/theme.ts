import { createMuiTheme } from '@material-ui/core/styles';
import { deepOrange, orange } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: deepOrange,
    secondary: orange,
    background: {
      default: '#fffff6',
      paper: '#fffff6',
    },
  },
});

export default theme;
