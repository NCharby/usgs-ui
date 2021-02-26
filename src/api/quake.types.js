// @flow 
export type $UIRequestCoords = {|
    format?: 'geojson',
    starttime: string,
    endtime: string,
    minmagnitude: number,
    maxradiuskm: number,
    coordinates: Array<number>,
    search: ?string
|}

export type $UIRequestSearch = {|
    format?: 'geojson',
    starttime: string,
    endtime: string,
    minmagnitude: number,
    maxradiuskm: number,
    coordinates?: ?Array<number>,
    search: string
|}

export type $USGSFeature = {
    type: string,
    properties: {
        mag: number,
        place: string,
        time: number,
        updated: number,
        url: string,
        title: string
    }
}

export type $QuakeResponse = {
    coordinates: Array<number>,
    quakes: Array<$USGSFeature>
}