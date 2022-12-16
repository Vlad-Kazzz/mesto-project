// import { getMetadataKeys } from "core-js/fn/reflect";

let userId;

const cohortId = "plus-cohort-17";
const authorizationToken = "05444bda-d82e-43a1-ae97-19d1fc6a52cf";

const config = {
    baseUrl: `https://nomoreparties.co/v1/${cohortId}`,
    headers: {
        authorization: authorizationToken,
        "Content-type": "application/json",
    }
};

function handleError (err){
    if (err.status === undefined){
        console.error ('Неизвестная ошибка');
    } else {
        console.error (`Ошибка ${err.status}`);
    }
}

function setUserId (id){
    userId = id;
}

function getData (path, method = "GET", body = null){ 
    const params = {
        method: method,
        headers: config.headers,
    };

    if (body){
        params.body = JSON.stringify(body);
    }

    return fetch (`${config.baseUrl}/${path}`, params)
        .then (res => {
            if (res.ok){
                return res.json();
            }
            // console.log (res);
            return Promise.reject(res);
        });
}

function getProfileData (){ 
    return getData ("users/me");
}

function getInitialCards (){
    return getData ("cards");
}

function updateProfileInfo(name, about){
    return getData ("users/me", "PATCH", {name: name, about: about});
}

function createCard (name, link){
    return getData ("cards", "POST", {name: name, link: link});
}

function deleteCard (id){
    return getData (`cards/${id}`, "DELETE");
}







export {userId, setUserId, handleError, getData, getProfileData, getInitialCards, updateProfileInfo, createCard, deleteCard};
