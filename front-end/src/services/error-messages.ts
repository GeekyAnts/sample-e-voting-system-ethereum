export const errorMessageHandler = (errorCode: number) => {
    if (errorCode >= 400 && errorCode < 500) {
      switch (errorCode) {
        case 400:
          return "Bad request";
        case 401:
          return "User needs to be authenticated";
        case 403:
          return "Unauthorized access to the resource";
        case 404:
          return "Requested resource not found";
        default:
          return "Something went wrong,Please try again later";
      }
    } else {
      switch (errorCode) {
        case 500:
          return "Internal server error";
        default:
          return "Servers are down, We're working on it";
      }
    }
  };