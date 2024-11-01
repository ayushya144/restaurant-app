interface JwtToken {
  raw: string;
  header: Record<string, any>;
  payload: { exp?: number };
}

export const jwtDecode = (t: string): JwtToken | string => {
  if (t.includes(".")) {
    const token: JwtToken = {
      raw: t,
      header: JSON.parse(window.atob(t.split(".")[0])),
      payload: JSON.parse(window.atob(t.split(".")[1])),
    };
    return token;
  }
  return t;
};

export const setCookie = (cname: string, cvalue: string): void => {
  if (cvalue) {
    const jwtData = jwtDecode(cvalue) as JwtToken;
    const d = jwtData.payload.exp
      ? new Date(jwtData.payload.exp * 1000).toUTCString()
      : new Date(new Date().getTime() + 60 * 60 * 1000).toUTCString();
    const expires = "expires=" + d;
    // document.cookie =
    //   cname + "=" + btoa(JSON.stringify(cvalue)) + ";" + expires + ";path=/";
  }
};

export const getCookie = (cname: string): string => {
  const name = cname + "=";
  //   const decodedCookie = decodeURIComponent(document.cookie);
  //   const ca = decodedCookie.split(";");
  //   for (let i = 0; i < ca.length; i++) {
  //     let c = ca[i].trim();
  //     if (c.indexOf(name) === 0 && name.length !== c.length) {
  //       return atob(c.substring(name.length));
  //     }
  //   }
  return "";
};

export const deleteCookie = (cname: string): void => {
  //   document.cookie = `${cname}=; Path=/; max-age=0`;
};

export const deleteAllCookies = (): void => {
  //   const cookies = document.cookie.split(";");
  //   cookies.forEach((cookie) => {
  //     const eqPos = cookie.indexOf("=");
  //     const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
  //     deleteCookie(name.trim());
  //   });
};

export const updateDocumentTitle = (location: { pathname: string }): void => {
  //   if (location?.pathname) {
  const pathname = location.pathname.replace(/^\/|\/$/g, "");
  const parts = pathname.split("/");
  const formattedParts = parts.map((part) => {
    const newPart = part.replace(/-/g, " ");
    return newPart.charAt(0).toUpperCase() + newPart.slice(1);
  });
  //     document.title = formattedParts.join(" | ");
  //   } else {
  //     document.title = "Punjabi Touch";
  //   }
};

export const queryParamsBuilder = (query: Record<string, any>): string => {
  if (typeof query !== "object") {
    return "";
  }
  const keys = Object.keys(query).filter(
    (key) => query[key] !== null && query[key] !== ""
  );
  if (keys.length) {
    return (
      "?" +
      new URLSearchParams(
        keys.reduce((acc: Record<string, any>, key: string) => {
          acc[key] = query[key];
          return acc;
        }, {})
      ).toString()
    );
  }
  return "";
};

export const extraBodyFields = [
  "createdAt",
  "updatedAt",
  "updatedBy",
  "_id",
  "numberOfEmployees",
  "recordDeleted",
  "lastUpdatedBy",
  "createdBy",
];

export const removeExtraFields = (
  obj: Record<string, any> = {},
  removeFields: string[] = []
): Record<string, any> => {
  const data = JSON.parse(JSON.stringify(obj));
  const extraFields = [...extraBodyFields, ...removeFields];
  for (const key of extraFields) {
    if (key in obj) {
      delete data[key];
    }
  }
  return data;
};

export const convertPathNameToKey = (location: {
  pathname: string;
}): string | false => {
  const { pathname } = location;
  if (!pathname || pathname === "/") {
    return false;
  }
  const pathNameArr = pathname.split("/");
  const transformedPath = pathNameArr
    .filter((segment) => segment !== "")
    .map((segment) =>
      segment.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())
    )
    .join("");
  return transformedPath;
};

export const fnPressNumberKeyWithHyphen = (e: KeyboardEvent): void => {
  if (
    (e.charCode !== 46 ||
      (e.target as HTMLInputElement).value.includes(".") ||
      e.key === ".") &&
    !((e.charCode >= 48 && e.charCode <= 57) || e.charCode === 45)
  ) {
    e.stopPropagation();
    e.preventDefault();
  }
};
