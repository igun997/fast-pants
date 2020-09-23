async function request(data,callback) {
    if (data.type === "GET" || data.type === "DELETE"){
        const res = await fetch(data.endpoint, {
            method: data.type,
            headers: {
                'Accept-Type': data.content_type
            }
        })
        const json = await res.json()
        callback(json);
    }else{
        const res = await fetch(data.endpoint, {
            method: data.type,
            headers: {
                'Content-Type': data.content_type
            },
            body: JSON.stringify(data.dform)
        })

        const json = await res.json()
        callback(json);
    }


}

export const req = request
