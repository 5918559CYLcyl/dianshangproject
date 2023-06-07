//封装倒计时逻辑函数
import {computed, ref} from 'vue'
import dayjs from 'dayjs'
export const useCountDown=()=>{
    let timer=null
    const time=ref(0)
    const formatTime=computed(()=>dayjs.unix(time.value).format('mm分ss秒'))
    const start=(currentTime)=>{
        //开始倒计时逻辑每一秒减1
        formatTime.value=currentTime
        setInterval(()=>{
            formatTime.value--
        },1000)
    }
    //组件销毁时清除定时器
    onUnmounted(()=>{
        timer&&clearInterval(timer)
    })
    return{
        formatTime,
        start
    }
}