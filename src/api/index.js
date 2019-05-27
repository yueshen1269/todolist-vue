import ajax from './ajax'
// const BASE_URL = 'http://localhost:3000'
const BASE_URL = '/api'

// 1、根据经纬度获取位置详情
export const reqData = () => ajax(`${BASE_URL}/data`)

export const setData = (newitem) => ajax(`${BASE_URL}/data`, newitem, 'POST')

export const delData = (newitem) => ajax(`${BASE_URL}/data`, newitem, 'DELETE')

export const updateData = (changeditem) => ajax(`${BASE_URL}/data`, changeditem, 'PUT')
