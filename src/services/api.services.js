import { fetchUtils } from "react-admin";
import { stringify } from "query-string";
import { apiUrl } from "../constants";

const httpClient = (url, options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: "application/json" });
    }
    const token = localStorage.getItem("accesstoken");
    options.headers.set("Authorization", `Bearer ${token}`);
    return fetchUtils.fetchJson(url, options);
};

const dataProvider = {
    getList: (resource, params) => {
        const { page, perPage } = params.pagination;
        // const { field, order } = params.sort;
        // // const query = {
        // //     sort: JSON.stringify([field, order]),
        // //     range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
        // //     filter: JSON.stringify(params.filter),
        // // };
        // const url = `${apiUrl}/${resource}?q=${params?.filter?.q || ""}`;
        const url = `${apiUrl}/${resource}?q=${params?.filter?.q || ""}&skip=${
            page || 0
        }${perPage ? `&limit=${perPage || ""}` : ""}`;
        return httpClient(url).then(({ headers, json }) => {
            return {
                data: json.data,
                total: json.meta?.total || json.data.length,
            };
        });
    },

    getOne: (resource, params) => {
        console.log({ params });
        return httpClient(`${apiUrl}/${resource}`).then(({ json }) => ({
            data: json.data.find((elem) => elem.id === params.id),
        }));
    },

    getMany: (resource, params) => {
        // const query = {
        //     filter: JSON.stringify({ id: params.ids }),
        // };
        const url = `${apiUrl}/${resource}`;
        // console.log({ id: params.ids });
        return httpClient(url).then(({ json }) => {
            const data = params.ids.map((id) =>
                json.data.find((obj) => obj.id == id)
            );
            return { data };
        });
    },

    getManyReference: (resource, params) => {
        // const { page, perPage } = params.pagination;
        // const { field, order } = params.sort;
        // const query = {
        //     sort: JSON.stringify([field, order]),
        //     range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
        //     filter: JSON.stringify({
        //         ...params.filter,
        //         [params.target]: params.id,
        //     }),
        // };
        const url = `${apiUrl}/${resource}`;

        return httpClient(url).then(({ headers, json }) => ({
            data: json.data,
            total: json.data.length,
        }));
    },

    update: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: "PATCH",
            body: JSON.stringify({ updateData: { ...params.data } }),
        }).then(({ json }) => ({ data: json.data })),

    updateMany: (resource, params) => {
        return Promise.reject();
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        };
        return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
            method: "PUT",
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: json }));
    },

    create: (resource, params) =>
        httpClient(`${apiUrl}/${resource}`, {
            method: "POST",
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({
            data: { ...params.data, id: json.data.id },
        })),

    delete: (resource, params) => {
        let url = apiUrl + "/" + resource + "/";
        if (resource === "categories") {
            url += `${params.id}`;
        } else if (resource === "users") {
            url += `suspend-user/${params.id}`;
        } else if (resource === "trips") {
            url += `admin/disable-trip/${params.id}`;
        } else if (resource === "communitites") {
            url += `admin/deactivate-community/${params.id}`;
        }
        console.log(params);
        return httpClient(url, {
            method: "DELETE",
        }).then(({ json }) => ({ data: json.data }));
    },
    deleteMany: (resource, params) => {
        return Promise.reject();
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        };
        return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
            method: "DELETE",
        }).then(({ json }) => ({ data: json }));
    },
};

export default dataProvider;
