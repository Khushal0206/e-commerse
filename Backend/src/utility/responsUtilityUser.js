class ResponseApi{
    constructor(statusCode,user,status,message){
        this.statusCode = statusCode
        this.user = user,
        this.status = status,
        this.message = message
    }

}
module.exports = ResponseApi;