// @flow
import React from 'react'
import type { Node } from 'react'

import { type $AppState } from '../../App.types'

import {
    Drawer,
    IconButton,
    Divider,
    List,
    ListItem,
    ListItemText
} from '@material-ui/core'

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'

import useStyles from './DetailPanel.styles'

export default function DetailPanelContainer({ detailToggle, detailOpen }: $AppState): Node {
    const classes = useStyles()
    
    return (
        <Drawer
        className={classes.drawer}
        variant="persistent"
        open={detailOpen}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={detailToggle}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        
        <div className={classes.drawerContainer}>
          <List>
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
        </div>
      </Drawer>
    )
}