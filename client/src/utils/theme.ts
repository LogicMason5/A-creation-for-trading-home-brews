import { createMuiTheme } from '@material-ui/core/styles';
import { deepOrange, orange } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: deepOrange,
    secondary: orange
  },
});

export default theme;