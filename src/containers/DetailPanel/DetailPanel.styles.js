import { makeStyles } from '@material-ui/core/styles'

const drawerWidth = 400

export default makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
    paddingBottom: "100px"
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  listItem: {
    textAlign: 'left',
    padding: '0 20px'
  },
  listDetails: {
    display: 'flex',
    justifyContent: 'space-between'
  }
}));