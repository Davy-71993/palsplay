import { getAssetsAsync, getAssetInfoAsync } from "expo-media-library";
import { getThumbnailAsync } from "expo-video-thumbnails";
import axios from "axios";

/**
 * This function generates an image from a video and returns the uri of 
 * the generated image, using expo-video-thumbnails
 * @param {String} videoUri 
 * @returns A promise that resolves to a string uri
 */
const generateThumbnail = async (videoUri) => {
    try {
        const { uri } = await getThumbnailAsync(
            videoUri,
            {
                time: 15000,
            }
        );
        return uri
    } catch (e) {
        console.log(e);
    }
};


/**
 * This function gets all the media of the specified type using expo-media-library
 * @param {String} type audio or video
 * @returns A promise that resolves to A list of assets got from the device internal or external storage
 */
export const getAllAssets = async(type) => {
    let media = await getAssetsAsync({
        mediaType: type,

    })
    media = await getAssetsAsync({
        mediaType: type,
        first: media.totalCount
    })

    return media.assets
}


/**
 * Prepares the asset for saving in the database
 * @param  asset MediaLibrary Asset 
 * @returns A promise that resolves to an object of extracted fields to be saved in the database
 */
export const prepareAssetForSaving = async(asset) => {
    
    let assetObj =  {
        name: asset.filename,
        duration: asset.duration,
        type: asset.mediaType
    }
    if(asset.uri.startsWith('file://')){
        assetObj.uri = asset.uri
    }else{
        const assetInfo = await getAssetInfoAsync(asset)
        assetObj.uri = assetInfo.localUri

    }
    if(asset.mediaType === 'audio'){
        assetObj = {
            ...assetObj,
            cover: asset.cover || null
        }
    }else if(asset.mediaType === 'video'){
        assetObj = {
            ...assetObj,
            thumbnail: await generateThumbnail(assetObj.uri) || null
        }
    }


    return assetObj

}

/**
 * This function is used to search youtube videos and prepare the responce to match our asset format
 * @param term 
 * @returns list of songs got from youtube.
 */
export const searchYoutube = async(term='') => {

    const options = {
        method: 'GET',
        url: 'https://t-one-youtube-converter.p.rapidapi.com/api/v1/searchVideos',
        params: {term},
        headers: {
          'X-RapidAPI-Key': '97ac549826msh0ef0e9a737d59bfp1a54ecjsn4dc2c6a85778',
          'X-RapidAPI-Host': 't-one-youtube-converter.p.rapidapi.com'
        }
      };
  
      const responce = await axios.request(options)

      let list = []

      for (const key in responce.data) {
        if (Object.hasOwnProperty.call(responce.data , key)) {
            const element = responce.data[key];
            if (element.urlMp3) {
                list.push(element)
            }
        }
      }

      const assets = list.map(item => ({
        name: item.titolo,
        uri: item.urlMp3,
        id: item.id,
        cover: item.thumbnail,
      }))
      
      return assets
}