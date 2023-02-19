import * as SQLite from "expo-sqlite";
import { Op, Model, Sequelize, STRING, INTEGER, DECIMAL, NUMBER, where } from "rn-sequelize";

/**********************  Initialize and connect to the database  *************************/
export const sequelize = new Sequelize({
    dialectModule: SQLite,
    database: "db",
    dialectOptions: {
      version: "1.0",
      description: "PalsPlay database for storing audio/video details and auth status etc"
    //   size: 2 * 1024 * 1024
    }
});
/**************************************************************************************/

/**
 * The modal class that represents an audio asset.
 */
 export class AudioAsset extends Model {};

 /**
  * The modal class that represents a video asset.
 */
 export class VideoAsset extends Model {};

/************************  Create the audios table  *************************/
AudioAsset.init({
    name: STRING, /* The asset name got from expo-media-library */
    uri: STRING, /* The asset uri got from expo-media-library */
    cover: STRING /* The asset thumnail generated by expo-video-thumbnail*/
}, {
    sequelize,
    modelName: 'audio'
})
/******************************************************************/

/************************  Create the videos table  ******************************/
VideoAsset.init({
    name: STRING, /* The asset name got from expo-media-library */
    uri: STRING, /* The asset uri got from expo-media-library */
    thumbnail: STRING, /* The asset thumnail generated by expo-video-thumbnail*/
    duration: DECIMAL, /* The asset thumnail generated by expo-video-thumbnail*/
}, {
    sequelize,
    modelName: 'video'
})
/**************************************************************************/

/**
 * Save  audio or video details to the database
 * @param asset 
 * @returns saved asset 
 */
export const saveAsset = async(asset) => {
    let savedAsset;

    switch (asset.type) {
        case 'audio':
            /********************   Check whether the audio already exists  ********************/
            savedAsset = await AudioAsset.findOne({
                where: {
                    uri: asset.uri
                }
            })
            if(savedAsset === null){
                /********************   If not exist then create  ********************/
                savedAsset = await AudioAsset.create(asset) 
            }
            break;
        
        case 'video':
            /********************   Check whether the video already exists  ********************/
            savedAsset = await AudioAsset.findOne({
                where: {
                    uri: asset.uri
                }
            })
            if(savedAsset === null){
                /********************   If not exist then create  ********************/
                savedAsset = await VideoAsset.create(asset)
            }
            break;

        default:
            console.log('The spacified type is neither audio nor video');
            break;
    }

    console.log(savedAsset)

    return savedAsset
}

/**
 * The function that gets all the assets depending on the provided options.
 * @param type audio or video
 * @param options the object represents the query options
 * @returns a list of assets
 */
export const getAssets = async(type, options = {}) => {
    switch (type) {
        case 'audio':
            if(options = {}){
                /*****************  If the options is empty, return all audio assets    *****************/
                return await AudioAsset.findAll()
            }
            break;

        case 'video':
            if(options = {}){
                /*****************  If the options is empty, return all video assets    *****************/
                return await VideoAsset.findAll()
            }
            break;
    
        default:
            break;
    }
}