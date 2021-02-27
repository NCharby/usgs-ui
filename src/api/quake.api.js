// @flow

import axios from 'axios'
import { 
    type $UIRequestSearch,
    type $QuakeResponse    
} from './quake.types'

export async function fetchQuakes (query: $UIRequestSearch): Promise<any> {
    //make heroku work
    const url = process.env.NODE_ENV === 'production'? 
        'https://simpo-interview.herokuapp.com/api/0.1/': 
        '/api/0.1/quakes'
    try {
        const { data }: { data: $QuakeResponse } = await axios.get(url, {
            params: {
                ...query
            }
        })
        
        return [null, data]
    } catch (error) {
        console.error(error)
        return [error, null]
    }
    
}