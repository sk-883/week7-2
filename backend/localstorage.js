// import localStorage from '../backend/routes/User'
export function getItem(id){
    // const cid=toString(id)
    return localStorage[id]
}
export function setItem(id, value){
// localStorage=[...localStorage,{id:value}]
localStorage={...localStorage,id:value}
// localStorage[id]=value
// console.log(typeof(id))
// const cid=toString(id)
// const cvalue=toString(value)
// localStorage["cid"]="cvalue"

}
export function clearItem(){
    localStorage={}
}
// export {getItem,setItem,clearItem}