const {analyse} = require("../service/ai");
const {redis} = require("../service/caching");
const crypto = require("crypto");


const AnalysisController = async (req,res) => {
    try {
     let {questions,code} = req.body;
        const cacheKey = crypto.createHash("sha256").update(JSON.stringify({ questions, code })).digest("hex");
        const cachedResult = await redis.get(cacheKey);
        if(cachedResult){
            return res.status(200).json({result:cachedResult});
        }

     const result = await analyse(questions,code);
     await redis.set(cacheKey,result);
     return res.status(200).json({result});
    } catch (error) {
        return res.status(500).json({error : error.message});
    }
}
module.exports = {AnalysisController};