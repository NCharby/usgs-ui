// @flow
import React from 'react'
import type { Node } from 'react'
import { type $AppState } from '../../App.types'

import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    InputBase
} from "@material-ui/core"
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search';

import useStyles from './NavBar.styles'

export default function NavBarContainer({ detailToggle }: $AppState): Node {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="open drawer"
                        onClick={detailToggle}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography className={classes.title} variant="h6" noWrap>
                        QuakeSearch
                    </Typography>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                        <SearchIcon />
                        </div>
                        <InputBase
                        placeholder="Search by location"
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                        inputProps={{ 'aria-label': 'search' }}
                        />
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    )
}