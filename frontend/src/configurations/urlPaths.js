
function getCrudObjectPaths (pathName) 
{
    return {
        generalPath: pathName,
        searchByName: (name) => `${pathName}/search?name=${name}`,
        get: (id) => `${pathName}/${id}`,
        getPagination: (page,size) => `${pathName}?page=${page}&size=${size}`,
        add: () => `${pathName}/add`,
        bulkAdd: () => `${pathName}/add/bulk`,
        edit: (id) => `${pathName}/${id}/edit`,
        remove: (id) => `${pathName}/${id}/remove`,
    }
}


const urls = {
    categories : Object.assign(
        {}, 
        getCrudObjectPaths('categories')
    ),
    books: Object.assign(
        {
            exportToExcelAllBooks: () => `books/export/excel`,
            searchByNameContainingPageable: (name,page,size) => `books/search?name=${name}&page=${page}&size=${size}`
        },
        getCrudObjectPaths('books')
    ),
    users: Object.assign(
        {},
        getCrudObjectPaths('users')
    ),
    loans: Object.assign(
        {
            delayedLoans: (page,size) => `loans/dealyed?page=${page}&size=${size}`
        },
        getCrudObjectPaths('loans')
    ),
    authors: Object.assign(
        {},
        getCrudObjectPaths('authors')
    ),
    countries: Object.assign(
        {},
        getCrudObjectPaths('countries')
    )
}

export default urls;