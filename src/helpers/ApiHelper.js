const ApiHelper = {
    fetch() {
        return fetch.apply(null, arguments)
            .then(res => {
                switch(res.status) {
                    case 200: return res.json();
                    case 403:
                        sessionStorage.clear();
                        window.location.href = '/';
                    default: throw res;
                }
            }).then(json => {
                sessionStorage.setItem('token', json.token);
                return json;
            });
    }
}

export default ApiHelper;