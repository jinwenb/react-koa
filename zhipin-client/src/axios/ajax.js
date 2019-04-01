import axios from 'axios';
//封装请求方法
export default function ajax(url, data = {}, type = 'GET') {
    if (type === 'GET') {
        let arr = [];
        Object.keys(data).forEach(key => {
            arr.push(`${key}=${data[key]}`)
        });
        arr = arr.join('&');
        return axios.get(url + '?' + arr)
    } else {
        return axios.post(url, data)
    }
}