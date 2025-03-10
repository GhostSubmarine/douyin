import RequestManager from "./requestManager"
import md from './md5'

const manager = new RequestManager()

const baseRequest = async (url : string, method : any, data : any = {}, loading : boolean = true) => {
	const timestampInSeconds = Math.floor(Date.now() / 1000);
	const system  = uni.getSystemInfoSync()
	let salt :string, device :string
	if(system.osName == 'ios'){
		 salt = "iso_huqu_3Saa"
		 device = 'xcx_ios'
	}else{
		 salt = "andriod_huqu_fdO0"
		 device = 'xcx_andriod'
	}
	const version = '1.0.0'
	let header = {
		token: uni.getStorageSync('token'),
		version: version,
		timestamp: timestampInSeconds,
		device: device,
		sign: md.hexMD5(salt+timestampInSeconds+version).toUpperCase()
	}
	// 生成唯一ID, 如果返回false 代表重复请求
	let requestId = manager.generateId(method, url, data)
	if (!requestId) {
		console.log('重复请求')
		return false
	}
	return new Promise((reslove, reject) => {
		loading && uni.showLoading({
			title: 'loading'
		})
		uni.request({
			url: 'https://' + url,
			method: method || 'GET',
			header: header,
			timeout: 10000,
			data: data || {},
			success: (successData : any) => {
				console.log('succ',successData)
				const res = successData.data
				if (res.code !== 1) {
					console.log('data',res)
					uni.clearStorageSync()
					uni.reLaunch({url:'/pages/phoneBind/accountBind'})
				} else {
					reslove(res.data)
				}
			},
			fail: (msg : any) => {
				uni.showToast({
					title: '网络连接失败，请稍后重试'
				})
				reject(msg)
			},
			complete() {
				uni.hideLoading()
				manager.deleteById(requestId)
				
			}
		})
	})
}
let methods = ['options', 'get', 'post', 'put', 'head', 'delete', 'trace', 'connect'] as Array<String>
const request : { [key : string] : (api : string, data ?: any, loading ?: boolean) => void } = {}

methods.forEach((method : string) => {
	request[method] = (api, data, loading) => baseRequest(api, method, data, loading)
})

export default request