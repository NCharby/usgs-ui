// @flow
import React from 'react'
import type { Node } from 'react'
import { type $AppState } from '../../App.types'

import { useMapContext } from '../../context/map.provider'

import {
    Drawer,
    IconButton,
    Divider
} from '@material-ui/core'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import useStyles from './DetailPanel.styles'

function displayDate(date: number): string {
  const d = new Date(date)
  return d.toDateString()
}

export default function DetailPanelContainer({ detailToggle, detailOpen }: $AppState): Node {
    const classes = useStyles()
    //$FlowFixMe
    const [ { quakes, meta } ] = useMapContext()
    
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
        {meta && (
          <>
            <Divider />
            <div className="meta-container">
              <dl>
                <dt>Min:</dt>
                <dd>{meta.min}</dd>
                <dt>Max:</dt>
                <dd>{meta.max}</dd>
                <dt>Median:</dt>
                <dd>{meta.median}</dd>
                <dt>Count:</dt>
                <dd>{meta.count}</dd>
              </dl>
            </div>
          </>
        )}
        
        <Divider />
        <div className={classes.drawerContainer}>



          {quakes.map( (q, i) => (
            <div key={q.id} className={classes.listItem}>
              <h3>{q.properties.place}</h3>
              <div className={classes.listDetails}>
                <span>Magnitude: {q.properties.mag}</span>
                <span>{displayDate(q.properties.time)}</span>
              </div>
              <a href={q.properties.url} target="_blank" rel="noreferrer">Details</a>
            </div>
          ))}
        
          {!quakes && (
            <h3>No data to display</h3>
          )}
        </div>

      </Drawer>
    )
}