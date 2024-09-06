function responseApi(statusCode,message,status,data){
    try {
        this.statusCode =statusCode,
        this.message = message,
        this.status = status,
        this.data = data
        
    } catch (error) {
        console.error(error)
    }

}
module.exports = responseApi;