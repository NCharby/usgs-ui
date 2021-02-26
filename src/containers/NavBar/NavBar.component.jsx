// @flow
import React from 'react'
import DateFnsUtils from '@date-io/date-fns';
import type { Node } from 'react'
import { type $AppState } from '../../App.types'

import { useSearchContext } from '../../context/search.provider'
import { SearchActions } from '../../context/search.actions'

import {
    AppBar,
    Button,
    Toolbar,
    IconButton,
    Typography,
    InputBase,
    InputLabel,
    Select,
    FormControl
} from "@material-ui/core"
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'

import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search';

import useStyles from './NavBar.styles'

export default function NavBarContainer({ detailToggle, fetchQuakeData }: $AppState): Node {
    const classes = useStyles()
    const [{
        search,
        starttime,
        endtime,
        maxradiuskm,
        minmagnitude
    }, dispatch] = useSearchContext()

    const handleQuerySubmit = () => {
        fetchQuakeData({
            search,
            starttime,
            endtime,
            maxradiuskm,
            minmagnitude
        })
    }

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
                    <FormControl className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                placeholder="Search by location"
                                value={search || ""}
                                onChange={evt => dispatch(SearchActions.SET_SEARCH(evt.target.value))}
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                inputProps={{ 'aria-label': 'search' }}
                            />
                    </FormControl>
                    <FormControl variant="filled" className={classes.formControl}>
                        <InputLabel htmlFor="select-mag">Min Magnitude</InputLabel>
                        <Select
                            native
                            inputProps={{
                                id: "select-mag",
                                name: "minmagnitude"
                            }}
                            onChange={evt => dispatch(SearchActions.SET_MINMAGNITUDE(evt.target.value))}
                            value={minmagnitude}>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                            <option value={6}>6</option>
                            <option value={7}>7</option>
                            <option value={8}>8</option>
                            <option value={9}>9</option>
                            <option value={10}>10</option>
                        </Select>
                    </FormControl>
                    <FormControl variant="filled" className={classes.formControl}>
                        <InputLabel htmlFor="select-rad">Max Radius</InputLabel>
                        <Select
                            native
                            inputProps={{
                                id: "select-rad",
                                name: "maxradiuskm"
                            }}
                            onChange={evt => dispatch(SearchActions.SET_MAXRADIUSKM(evt.target.value))}
                            value={maxradiuskm}>
                            <option value={10}>10</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                            <option value={150}>150</option>
                            <option value={200}>200</option>
                        </Select>
                    </FormControl>
                    {/* KNOWN BUG: https://github.com/mui-org/material-ui/issues/13394 */}
                    {/* Date pickets throw a warning in development mode */}
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            margin="normal"
                            id="date-start"
                            label="From"
                            format="MM/dd/yyyy"
                            value={starttime}
                            onChange={date => dispatch(SearchActions.SET_STARTTIME(date))}
                            KeyboardButtonProps={{
                                'aria-label': 'change start date',
                            }}/>
                        <KeyboardDatePicker
                            margin="normal"
                            id="date-end"
                            label="To"
                            format="MM/dd/yyyy"
                            value={endtime}
                            onChange={date => dispatch(SearchActions.SET_ENDTIME(date))}
                            KeyboardButtonProps={{
                                'aria-label': 'change end date',
                            }}/>
                    </MuiPickersUtilsProvider>
                    <FormControl>
                        <Button 
                            onClick={handleQuerySubmit}
                            variant="contained">
                            Search
                        </Button>
                    </FormControl>
                </Toolbar>
            </AppBar>
        </div>
    )
}