// TODO implement winston error logging here

module.exports =  function(error, req, res){
    if (error.errors) {
        let message = 'Errors: '
        for (const field in error.errors) {
            message += `\n ${error.errors[field].message}`;
        }
        res.status(400).send({ message })
        console.log(error)
    } else {
        console.log('error me ===> ', error)
        res.status(500).send('Internal server error');
    }
}
