/*
 * @Author: chan-max jackieontheway666@gmail.com
 * @Date: 2024-02-06 20:41:35
 * @LastEditors: chan-max 2651308363@qq.com
 * @LastEditTime: 2024-02-14 23:37:03
 * @FilePath: /yishe/src/modules/app/views/talk/index.ts
 * @Description: 
 * 
 * Copyright (c) 2024 by 1s, All Rights Reserved. 
 */

import { ref } from 'vue'

/*
    所有消息列表
    默认存在 
    1.系统消息
    2.互动消息
    3.服务消息
*/
import systemMesssage from '@/icon/mobile/system-message.svg?url'
import interactMessage from '@/icon/mobile/interact-message.svg?url'
import customerService from '@/icon/mobile/customer-service.svg?url'
import transport from '@/icon/mobile/transport.svg?url'

export const messageList = ref([
    {
        type: 'system',
        avatar: systemMesssage,
        title: '系统消息',
        label: '这是最新的系统消息'
    },
    {
        type: 'interact',
        avatar: interactMessage,
        title: '互动消息',
        label: '那谁谁喜欢你'
    },
    {
        type: 'customerService',
        avatar: customerService,
        title: '客服',
        label: '有问题找客服'
    },
    {
        type: 'transport',
        avatar: transport,
        title: '物流消息',
        label: '看看我的东西到哪了～'
    }
])


export function createMessageItem(options) {
    return {
        type:'',
        avatar:'',
        title:'',
        label:'',
        communicationId:'',
        ...options
    }
}