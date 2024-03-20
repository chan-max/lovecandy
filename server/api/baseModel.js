/*
 * @Author: chan-max jackieontheway666@gmail.com
 * @Date: 2023-12-16 12:40:25
 * @LastEditors: chan-max 2651308363@qq.com
 * @LastEditTime: 2024-02-21 21:16:37
 * @FilePath: /yishe/server/api/baseModel.js
 * @Description: 
 * 
 * Copyright (c) 2023 by 1s, All Rights Reserved. 
 */
import { REDIS_KEY_CACHE_BASE_MODELS } from "../redis/keys.js";


// 基础模型数量不会很多，暂时不需要分批查询 
export const injectBaseModelRoute = (router, sequelize, app, redis) => {
  // 该接口只有管理员更新基础模型信息时需要更新, 直接读缓存即可
  router.post("/getBaseModel", async (ctx) => {
    // const cache = await redis.get(REDIS_KEY_CACHE_BASE_MODELS)

    // if (cache) {
    //   return ctx.body = {
    //     data: JSON.parse(cache),
    //   }; 
    // }
    
    const table = sequelize.models.t_base_model;
    const data = await table.findAll();
    data.forEach((item) => {
      item.dataValues.preview_img = ctx.relativePathToPreviewPath(item.imgPath);
      item.dataValues.preview_file = ctx.relativePathToPreviewPath( item.filePath );
      item.dataValues.preview_description_imgs = JSON.parse(item.description_imgs || null)?.map((item) => ctx.relativePathToPreviewPath(item))
    }); 

    // await redis.set(REDIS_KEY_CACHE_BASE_MODELS,JSON.stringify(data))
    
    ctx.body = {
      data: data,
    };
  })
}
 

export const getBaseModelById = (router, sequelize) => router.post('/getBaseModelById', async (ctx) => {
  const table = sequelize.models.t_base_model;
  const baseModel = await table.findOne({ where: { id: ctx.request.body.id } });
  baseModel.dataValues.preview_file = ctx.relativePathToPreviewPath(baseModel.filePath);

  ctx.body = {
    data: baseModel
  }
})

import { getRelativePath } from '../fileManage.js'



export const uploadBaseModelHook = (router, sequelize) => router.post("/uploadBaseModel", async (ctx) => {
    const table = sequelize.models.t_base_model;
    const { name, description } = ctx.request.body;
    const { file, img,description_imgs} = ctx.request.files; // 模型文件, 图片


    await table.create({
      name,
      description,
      description_imgs: description_imgs && JSON.stringify(description_imgs.map((item) => getRelativePath(item.filepath))),
      filePath:getRelativePath(file.filepath),
      imgPath:getRelativePath(img.filepath),
    });
    
    ctx.body = {
      message: "模型上传成功",
      type:'success'
    };
  });
