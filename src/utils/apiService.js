import Axios from "axios";
//import CustomToast from "../common/toastGenerator";

export const CONFIG = {
  baseUrl: {
    serverUrl: "http://pms-api.myfreenet.ir",
    real: "http://pms-api.myfreenet.ir/api/v1",
    /* serverUrl: "https://api.testica.ir",
     real: "https://api.testica.ir/api",*/
    mock: "",
  },
  clientSecret: {
    headerName: "client_secret",
    value: "",
  },
  clientId: {
    headerName: "client_id",
    value: "kF!g|hw_EtYu7@yS3TJfE0p,(8Aq8%",
  },
  accessToken: {
    localStorageName: "access_token",
    headerName: "Authorization",
    prefix: "Bearer ",
  },
  refreshToken: {
    active: false,
    url: "/user/refresh-token",
    method: "POST",
    token: {
      localStorageName: "refresh_token",
      headerName: "refresh-token",
      prefix: "",
    },
    onStatus: [401, 403],
  },
  device_uid: {
    localStorage: "n-uuid",
    headerName: "device_uuid"
  }
};

/* For handling refresh token on certain statuses */
export const refreshTokenHandler = () => {
  const myHeader = {
    [CONFIG.refreshToken.token.headerName]: localStorage.getItem(
      CONFIG.refreshToken.token.localStorageName
    ),
  };
  console.log("hkfj");
  APIService(
    CONFIG.refreshToken.url,
    CONFIG.refreshToken.method,
    {
      onSuccess: (res, extraData) => {
        // save access token and refresh token later
        console.log(123);
        console.log("refreshTokenHandler", res)
        // localStorage.setItem("access_token", res.data.data.access_token);
        // localStorage.setItem("refresh_token", res.data.data.refresh_token);
      },
      onFail: (err, extraData) => {
        // some activities
      },
    },
    {
      headers: myHeader,
    },
    {
      deleteAccessTokenAfterRequest_fail: true,
      useClientSecret: true,
      disableRefreshToken: true,
    }
  );
};

/**
 * Full useable APIService (v2)
 * @param {String} url API call url. This will added to the base url
 * @param {String} method API call methods. Should be `GET`, `POST`, `PUT`, `DELETE` or `PATCH`
 * @param callback An object that should have `onSuccess` function and `onFail` function. For passing extra data to the functions, add `extraData` field. Functions receive this data as second props
 * @param requestData An object which use for passing `headers`, `body`, `params` to request. For add other axios options, put them in `options`
 * @param requestOptions An object for change APIService behavior.
 */
export const APIService = (
  url,
  method,
  callback = {
    onSuccess: () => { },
    onFail: () => { },
    extraData: null,
  },
  requestData = {
    headers: {},
    body: {},
    params: {},
    options: {},
  },
  requestOptions = {
    toast: {
      success: "",
      fail: "",
    },
    useClientSecret: false,
    disableClientId: false,
    useAccessToken: false,
    disableLogOnError: false,
    deleteAccessTokenAfterRequest_success: false,
    deleteAccessTokenAfterRequest_fail: false,
    useMockBaseURL: false,
    disableRefreshToken: false,
    useDeviceUid: true
  }
) => {
  let api,
    headers = {},
    body = {},
    params = {},
    options = {},
    extraData = null;

  /* input validation */
  /* url validation */
  if (url === null || url === undefined) {
    throw "APIService ERROR: url is not defined correctly";
  }

  /* method validation */
  if (
    method !== "GET" &&
    method !== "POST" &&
    method !== "PUT" &&
    method !== "DELETE" &&
    method !== "PATCH"
  ) {
    throw "API CALL ERROR: API call method is not defined correctly";
  }

  /* callback properties validation */
  if (!callback) {
    throw "APIService ERROR: callback object not defined";
  }
  if (callback.onSuccess === undefined) {
    throw "APIService ERROR: 'onSuccess' callback not defined";
  }
  if (callback.onFail === undefined) {
    throw "APIService ERROR: 'onFail' callback not defined";
  }
  if (callback.extraData) {
    extraData = callback.extraData;
  }

  if (requestData) {
    if (requestData.headers) {
      headers = requestData.headers;
    }
    if (requestData.body) {
      body = requestData.body;
    }
    if (requestData.params) {
      params = requestData.params;
    }
    if (requestData.options) {
      options = requestData.options;
    }
  }

  /* modify request headers */
  if (requestOptions.useClientSecret) {
    headers[CONFIG.clientSecret.headerName] = CONFIG.clientSecret.value;
  }
  if (requestOptions.useAccessToken) {
    headers[CONFIG.accessToken.headerName] =
      CONFIG.accessToken.prefix +
      localStorage.getItem(CONFIG.accessToken.localStorageName);
  }

  /* if client id exist in CONFIG, we send it by request */
  if (CONFIG.clientId.value !== "" && !requestOptions.disableClientId) {
    headers[CONFIG.clientId.headerName] = CONFIG.clientId.value;
  }

  if (requestOptions.useDeviceUid) {
    headers[CONFIG.device_uid.headerName] =
      localStorage.getItem(CONFIG.device_uid.localStorage);
  }

  api = Axios.create({
    baseURL: requestOptions.useMockBaseURL
      ? CONFIG.baseUrl.mock
      : CONFIG.baseUrl.real,
    headers: headers,
    params: params,
    // data: body,
    ...options,
  });

  let response;

  switch (method) {
    case "GET":
      response = api.get(url);
      break;

    case "POST":
      response = api.post(url, body);
      break;

    case "PUT":
      response = api.put(url, body);
      break;

    case "DELETE":
      response = api.delete(url);
      break;

    case "PATCH":
      response = api.patch(url, body);
      break;

    default:
      return;
  }

  response
    .then((res) => {
      /* do the magic */
      if (requestOptions.toast && requestOptions.toast.success !== "") {
        console.log(requestOptions.toast.success, "success");
        //  CustomToast(requestOptions.toast.success, "success");
      }
      // if (res.data && res.data.message) {
      //     CustomToast(res.data.message.msg, res.data.message.type);
      // }
      if (requestOptions.deleteAccessTokenAfterRequest_success) {
        localStorage.removeItem(CONFIG.accessToken.localStorageName);
      }
      return callback.onSuccess(res, extraData);
    })
    .catch((err) => {
      const errorResponse = err.response;
      let reportData = {
        _refresh_token_process: false,
      };

      if (CONFIG.refreshToken.active && !requestOptions.disableRefreshToken) {
        for (let i = 0; i < CONFIG.refreshToken.onStatus.length; i++) {
          const status = CONFIG.refreshToken.onStatus[i];
          if (errorResponse && errorResponse.status === status) {
            /* do refresh token functionality */
            reportData._refresh_token_process = true;
            refreshTokenHandler();
            /* then break the loop */
            break;
          }
        }
      }

      /* take a rest and then fix error :)) */
      if (requestOptions.toast && requestOptions.toast.fail !== "") {
        console.log(requestOptions.toast.fail, "error");
        //  CustomToast(requestOptions.toast.fail, "error");
      }
      // if (errorResponse && errorResponse.data && errorResponse.data.message) {
      //     CustomToast(errorResponse.data.message.msg, errorResponse.data.message.type);
      // }
      if (requestOptions.deleteAccessTokenAfterRequest_fail) {
        localStorage.removeItem(CONFIG.accessToken.localStorageName);
      }
      if (!requestOptions.disableLogOnError) {
        console.error(err);
      }
      // if (err.response.data) {
      // console.log(err.response);
      //  console.log(err.response.data.error.message, "error");
      //CustomToast(err.response.data.error.message, "error");
      //   }
      return callback.onFail(err, { ...extraData, ...reportData });
    });
};

/**
 * Full useable async APIService (v1)
 * @param {String} url API call url. This will added to the base url
 * @param {String} method API call methods. Should be `GET`, `POST`, `PUT`, `DELETE` or `PATCH`
 * @param callback An object that should have `onSuccess` function and `onFail` function. For passing extra data to the functions, add `extraData` field. Functions receive this data as second props
 * @param requestData An object which use for passing `headers`, `body`, `params` to request. For add other axios options, put them in `options`
 * @param requestOptions An object for change APIService behavior.
 */
export const AsyncAPIService = async (
  url,
  method,
  callback = {
    onSuccess: () => { },
    onFail: () => { },
    extraData: null,
  },
  requestData = {
    headers: {},
    body: {},
    params: {},
    options: {},
  },
  requestOptions = {
    toast: {
      success: "",
      fail: "",
    },
    useClientSecret: false,
    disableClientId: false,
    useAccessToken: false,
    disableLogOnError: false,
    deleteAccessTokenAfterRequest_success: false,
    deleteAccessTokenAfterRequest_fail: false,
    useMockBaseURL: false,
    disableRefreshToken: false,
    useDeviceUid: true
  }
) => {
  let api,
    headers = {},
    body = {},
    params = {},
    options = {},
    extraData = null;

  /* input validation */
  /* url validation */
  if (url === null || url === undefined) {
    throw "APIService ERROR: url is not defined correctly";
  }

  /* method validation */
  if (
    method !== "GET" &&
    method !== "POST" &&
    method !== "PUT" &&
    method !== "DELETE" &&
    method !== "PATCH"
  ) {
    throw "API CALL ERROR: API call method is not defined correctly";
  }

  /* callback properties validation */
  if (!callback) {
    throw "APIService ERROR: callback object not defined";
  }
  if (callback.onSuccess === undefined) {
    throw "APIService ERROR: 'onSuccess' callback not defined";
  }
  if (callback.onFail === undefined) {
    throw "APIService ERROR: 'onFail' callback not defined";
  }
  if (callback.extraData) {
    extraData = callback.extraData;
  }

  if (requestData) {
    if (requestData.headers) {
      headers = requestData.headers;
    }
    if (requestData.body) {
      body = requestData.body;
    }
    if (requestData.params) {
      params = requestData.params;
    }
    if (requestData.options) {
      options = requestData.options;
    }
  }

  /* modify request headers */
  if (requestOptions.useClientSecret) {
    headers[CONFIG.clientSecret.headerName] = CONFIG.clientSecret.value;
  }
  if (requestOptions.useAccessToken) {
    headers[CONFIG.accessToken.headerName] =
      CONFIG.accessToken.prefix +
      localStorage.getItem(CONFIG.accessToken.localStorageName);
  }

  if (requestOptions.useDeviceUid) {
    headers[CONFIG.device_uid.headerName] =
      localStorage.getItem(CONFIG.device_uid.localStorage);
  }

  /* if client id exist in CONFIG, we send it by request */
  if (CONFIG.clientId.value !== "" && !requestOptions.disableClientId) {
    headers[CONFIG.clientId.headerName] = CONFIG.clientId.value;
  }

  /* create axios instance */
  api = Axios.create({
    baseURL: requestOptions.useMockBaseURL
      ? CONFIG.baseUrl.mock
      : CONFIG.baseUrl.real,
    headers: headers,
    params: params,
    data: method !== "GET" ? body : {},
    ...options,
  });

  let response;
  //await
  try {
    switch (method) {
      case "GET":
        response = await api.get(url, body);
        break;

      case "POST":
        response = await api.post(url, body);
        break;

      case "PUT":
        response = await api.put(url, body);
        break;

      case "DELETE":
        response = await api.delete(url, body);
        break;

      case "PATCH":
        response = await api.patch(url, body);
        break;

      default:
        return;
    }

    /* do the magic */
    if (requestOptions.toast && requestOptions.toast.success !== "") {
      console.log(requestOptions.toast.success, "success");
      //  CustomToast(requestOptions.toast.success, "success");
    }
    // if (res.data && res.data.message) {
    //     CustomToast(res.data.message.msg, res.data.message.type);
    // }
    if (requestOptions.deleteAccessTokenAfterRequest_success) {
      localStorage.removeItem(CONFIG.accessToken.localStorageName);
    }
    return callback.onSuccess(response, extraData);
  } catch (err) {
    const errorResponse = err.response;
    let reportData = {
      _refresh_token_process: false,
    };

    if (CONFIG.refreshToken.active && !requestOptions.disableRefreshToken) {
      for (let i = 0; i < CONFIG.refreshToken.onStatus.length; i++) {
        const status = CONFIG.refreshToken.onStatus[i];
        if (errorResponse && errorResponse.status === status) {
          /* do refresh token functionality */
          reportData._refresh_token_process = true;
          refreshTokenHandler();
          /* then break the loop */
          break;
        }
      }
    }

    /* take a rest and then fix error :)) */
    if (requestOptions.toast && requestOptions.toast.fail !== "") {
      console.log(requestOptions.toast.fail, "error");
      //   CustomToast(requestOptions.toast.fail, "error");
    }
    // if (errorResponse && errorResponse.data && errorResponse.data.message) {
    //     CustomToast(errorResponse.data.message.msg, errorResponse.data.message.type);
    // }
    if (requestOptions.deleteAccessTokenAfterRequest_fail) {
      localStorage.removeItem(CONFIG.accessToken.localStorageName);
    }
    if (!requestOptions.disableLogOnError) {
      console.error(err);
    }
    // if (err.response.data) {
    //   // console.log(err.response);
    //   console.log(err.response.data.error.message, "error");
    //   // CustomToast(err.response.data.error.message, "error");
    // }
    return callback.onFail(err, { ...extraData, ...reportData });
  }
};
