export default {
    URL: 'http://activate.local/',

    query(method: string, params: object){
        return fetch(this.URL+'/api/api.php',{
            method:'POST',
            body:new URLSearchParams({
                XDEBUG_TRIGGER:'trigger',
                act:'manageOTS',
                subAct:method,
                ...params
            })
        })
            .then(response=>{
                return response.json();
            })
            .catch(()=>new Error('Ошибка ответа'))
            .then(data=>{
                if(data.response){
                    return data.response
                }else if(data.error){
                    return Promise.reject(new Error(data.error.message))
                }else{
                    return Promise.reject(new Error('Ошибка ответа'))
                }
            })
            .catch(error=>{
                console.log(error)
                return Promise.reject()
            })
    }
}