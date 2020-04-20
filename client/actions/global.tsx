import { GLOABL_HEIGHT } from '../constants';

// import { browserConfiguration } from "../loader/env.configuration";

// const { APIGATEWAY } = browserConfiguration;

export interface GlobalHeight {
    globalHeight: number;
    type: GLOABL_HEIGHT;
}

export const globalHeight = (globalHeight: number): GlobalHeight => ({
    globalHeight: globalHeight,
    type: GLOABL_HEIGHT,
});
