import { createMuiTheme } from '@material-ui/core/styles';
import { deepOrange, orange } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: orange,
    secondary: deepOrange,
  },
});

export default theme;
