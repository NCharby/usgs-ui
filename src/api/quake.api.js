// @flow

import axios from 'axios'
import { 
    type $UIRequestSearch,
    type $QuakeResponse    
} from './quake.types'

export async function fetchQuakes (query: $UIRequestSearch): Promise<any> {
    console.log(process.env)
    try {
        const { data }: { data: $QuakeResponse } = await axios.get('/api/0.1/quakes', {
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