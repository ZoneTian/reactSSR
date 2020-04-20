import { GLOABL_HEIGHT } from '../constants'

let initLayout = {
    globalHeight: 0,
   
}

export const global = (state = initLayout, action: any): typeof initLayout => {
    
    switch (action.type) {
        case GLOABL_HEIGHT:
            return Object.assign({ ...state }, { globalHeight: action.globalHeight })
        default:
            return state;
    }
}