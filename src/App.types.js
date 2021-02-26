// @flow
import { type $UIRequestSearch } from './api/quake.types'

export type $AppState = {
    detailOpen: boolean,
    detailToggle(): void,
    fetchQuakeData($UIRequestSearch): Promise<any>
}