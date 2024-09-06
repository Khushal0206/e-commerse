class ApiFeature{
     constructor(product,quary){
        this.product = product,
        this.quary = quary
        //this.name = "khushal"
        //console.log(this.product)
        
    }
    search(){
       /// console.log(this.quary)
            const object =   this.quary.name?{
            name:{$regex:this.quary.name,$options:"i"}
        }:{}
       // console.log(object)
        
        this.product = this.product.find(object)
        //console.log(this.product)
        return this;

    }
    filter(){
        console.log(this.quary)
        const quaryCopy = {...this.quary}
        //console.log(quaryCopy)
        const removeFields = ["name", "page", "limit"];
        removeFields.forEach((ele)=>delete quaryCopy[ele])
       // console.log(quaryCopy)
        let queryStr = JSON.stringify(quaryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
        //console.log(queryStr)
       // console.log(JSON.parse(queryStr))


        
        this.product = this.product.find(JSON.parse(queryStr))
        return this;
    }

}
module.exports = ApiFeature