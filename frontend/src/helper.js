import axios from "axios";

async function checkUserStatus(){
    if(!localStorage['userId']){
        const res = await axios(process.env.REACT_APP_BACKEND_URL+"/user");
        localStorage['userId'] = res.data;
        return res.data;
    }
    return localStorage['userId'];

}

export default checkUserStatus;