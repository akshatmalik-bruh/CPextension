const {analyse} = require("../service/ai");
const AnalysisController = async (req,res) => {
    try {
     let {questions,code} = req.body;
     const result = await analyse(questions,code);
     res.status(200).json({result});
    } catch (error) {
        res.status(500).json({error : error.message});
    }
}
module.exports = {AnalysisController};