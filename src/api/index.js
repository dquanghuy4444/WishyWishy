import * as API from './../constants/API';

const axios = require('axios');

export const fetchWishesData = async () => {
  
  try {
    const response = await axios.get(API.STR_URL_API + API.STR_TABLE_WISHES);
    
    const dataTemp = response.data;
    const data = dataTemp.filter(item => typeof item.description === "string"
     && typeof item.tag === "string"
     && typeof item.author_fb === "string"
     && typeof item.author_sex === "number"
     && [0 , 1 , 2].includes(item.author_sex)
     && typeof item.interactive_dropheart === "number"
     && item.interactive_dropheart >= 0
     && typeof item.interactive_unlike === "number"
     && item.interactive_unlike >= 0
     && typeof item.img_num === "number"
     && typeof item.author_name === "string");
    return data;
  } catch (error) {
    return [];
  }
};

export const fetchFeedbackData = async () => {
  
  try {
    const response = await axios.get(API.STR_URL_API + API.STR_TABLE_FEEDBACK);

    const dataTemp = response.data;
    const data = dataTemp.filter(item => typeof item.num_star === "number" && typeof item.text === "string");
    return data;
  } catch (error) {
    return [];
  }
};

export const fetchSettingData = async () => {
  
  try {
    const response = await axios.get(API.STR_URL_API + API.STR_TABLE_SETTING + "/1");

    const data = response.data;
    if(typeof data.amount_w_in_page === "number"
    && typeof data.top_wishes === "number"
    && typeof data.allow_create_new === "boolean"
    && typeof data.allow_download === "boolean"){
      return data;
    } else{
      throw new Error();
    }
  } catch (error) {
    return false;
  }
};

export const createWish = async ({description , tag , author_name , author_sex , author_fb }) => {
  
  try {
    await axios({
      method: 'post',
      url: API.STR_URL_API + API.STR_TABLE_WISHES,
      data: {
        description: description,
        tag: tag,
        author_name: author_name,
        author_sex: author_sex,
        author_fb: author_fb,
        interactive_dropheart: 0,
        interactive_unlike: 0,
        img_num: Math.floor((Math.random()*12) + 1),
      }
    });

    return true;

  } catch (error) {
    return false;
  }
};

export const createFeedback = async ({ num_star , text }) => {
  
  try {
    await axios({
      method: 'post',
      url: API.STR_URL_API + API.STR_TABLE_FEEDBACK,
      data: {
        num_star : num_star,
        text : text,
      }
    });

    return true;
  } catch (error) {
    return false;
  }
};

export const updateDropHeart = async (dropHeart , id) => {
  try {
    await axios({
      method: 'put',
      url: API.STR_URL_API + API.STR_TABLE_WISHES + "/" + id,
      data: {
        interactive_dropheart: dropHeart,
      }
    });

  } catch (error) {
    console.warn(error);
  }
};

export const updateUnlike = async (unlike , id) => {
  try {
    await axios({
      method: 'put',
      url: API.STR_URL_API + API.STR_TABLE_WISHES + "/" + id,
      data: {
        interactive_unlike: unlike,
      }
    });

  } catch (error) {
    console.warn(error);
  }
};

export const updateSetting = async ({amount_w_in_page , top_wishes , allow_download , allow_create_new}) => {
  try {
    await axios({
      method: 'put',
      url: API.STR_URL_API + API.STR_TABLE_SETTING + "/1",
      data: {
        amount_w_in_page,
        top_wishes,
        allow_download,
        allow_create_new,
      }
    });

    return true;

  } catch (error) {
    return false;
  }
};


