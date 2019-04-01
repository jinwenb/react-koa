/*
* 包含多个公用工具函数的入口
*
* */

/*
* 判断要去的路径
* */
export function RedirectTo({type, header}) {
    let path;
    path = (type === 'laoban' ? 'laoban' : 'dashen');
    if (!header) {
        path += 'info'
    }
    return path;
}