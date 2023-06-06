//封装购物车接口
import request from '@/utils/http'
//加入购物车
export const insertCartAPI=({skuId,count})=>{
    return request({
        url:'/member/cart',
        methods:'POST',
        data:{
            skuId,
            count
        }
    })
}


const findNewCartListAPI=()=>{
    return request({
        url:'/member/cart'

    })
}
//删除购物车
export const delCartList=()=>{
    return request({
        url:'/member/cart',
        method:'DELETE',
        data:{
            ids
        }
    })
}