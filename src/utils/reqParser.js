module.exports = function reqParser(req){
    let data = {
        ...req.body
    }

    if(req.nextNumber){
        data.taskPosition = req.nextNumber
    }
    
    return data
};