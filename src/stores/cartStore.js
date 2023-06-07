import { menuItemEmits } from 'element-plus'
import {defineStore} from 'pinia'
import {computed, ref} from 'vue'
import {useUserStore} from './userStore'
import {insertCartAPI, findNewCartListAPI, delCartAPI} from '@/apis/cart'
export const useCartStore=defineStore('cart',()=>{
    const userStore=useUserStore()
    const isLogin=computed(()=>userStore.userInfo.token)
    const cartList=ref([])
    //添加购物车
    const addCart=async(goods)=>{
        const {skuId,count}=goods
        if(isLogin.value){
            await insertCartAPI({skuId,count})
            updateNewList()
        }else{
            const item=cartList.value.find((item)=>goods.skuId===item.skuId)
        if(item){
            item.count++
        }else{
            cartList.value.push(goods)
        }
        }
        
    }
    //删除购物车
    const delCart=async(skuId)=>{
        if(isLogin.value){
            await delCartAPI([skuId])
            updateNewList()
        }else{
        const idx=cartList.value.findIndex((item)=>skuId===item)
        cartList.value.splice(idx,1)

    }
}
//清除购物车
const clearCart=()=>{
    cartList.value=[]
}
//获取最新购物车列表action
const updateNewList=async()=>{
    const res=await findNewCartListAPI()
    cartList.value=res.result
}
//单选功能
    const singleCheck=(skuId,selected)=>{
        const item=cartList.value.find((item)=>item.skuId===skuId)
        item.selected=selected
    }
//全选功能
    const allCheck=(selected)=>{
        cartList.value.forEach(item=>item.selected=selected)
    }
//计算功能
    const allCount=computed(()=>cartList.value.reduce((a,c)=>a+c.count,0))
    const allPrice=computed(()=>cartList.value.reduce((a,c)=>a+c.count*c.price,0))

    const selectedCount=computed(()=>cartList.value.filter(item=>item.selected).reduce((a,c)=>a+c.count,0))
    const selectedPrice=computed(()=>cartList.value.filter(item=>item.selected).reduce((a,c)=>a+c.count*c.price,0))
    const isAll=computed(()=>cartList.value.every((item)=>item.selected))
    
    return{
        cartList,
        allCount,
        allPrice,
        selectedCount,
        selectedPrice,
        singleCheck,
        allCheck,
        clearCart,
        addCart,
        delCart,
        isAll,
        updateNewList
    }
},{
    persist:true,
})