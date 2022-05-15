import axios from "axios";
import dtos from '../configurations/dtos'
import urls from '../configurations/urlPaths';
import config from "../configurations/configuration";
import instance from '../configurations/axios'
import { excelInstance } from "../configurations/axios";
const HttpClientService = {

    //book api calls
    searchBooks: (name) => instance.get(urls.books.searchByName(name)),
    fetchBook: (id) => instance.get(urls.books.get(id)),
    fetchBooksWithPagination: (page,size) => instance.get(urls.books.getPagination(page,size)),
    exportBooksToExcel: () => excelInstance.get(urls.books.exportToExcelAllBooks()),
    addBook: (name,imageUrl, category, authorID, availableCopies) =>  instance.post(urls.books.add(), 
        dtos.book.generalDto(name,imageUrl, category, authorID, availableCopies)),
    addBooksBulk: (list) => instance.post(urls.books.bulkAdd(), list),
    editBook: (id,name,imageUrl, category, authorID, availableCopies) => instance.patch(urls.books.edit(id),
        dtos.book.generalDto(name,imageUrl, category, authorID, availableCopies)),
    removeBook: (id) => instance.delete(urls.books.remove(id)),


    //category  api calls
    fetchCategories: () => instance.get(urls.categories.generalPath),
    addCategory: (name) => instance.post(urls.categories.add(),
        dtos.category.generalDto(name)),
    addCategoriesBulk: (list) => instance.post(urls.categories.bulkAdd(),list),
    editCategory: (name) => instance.patch(urls.categories.edit(),
        dtos.category.generalDto(name)),
    removeCategory: (id) => instance.delete(urls.categories.remove(id)),


    //loan api calls
    fetchLoansWithPagination: (page,size) => instance.get(urls.loans.getPagination(page,size)),
    fetchDelayedLoans: (page,size) => instance.get(urls.loans.delayedLoans(page,size)),
    loan: (userID,bookID,dateDue) => instance.post(urls.loans.add(), dtos.loan.generalDto),
    postpone: (loanID,dateDue) => instance.patch(urls.loans.edit, dtos.loan.loanDto(dateDue)),
    return: (loanID) => instance.delete(urls.loans.delete(loanID)),


    //author api call
    fetchAuthors: (page,size) => instance.get(urls.authors.getPagination(page,size)),
    addAuthor: (name,surname,countryID) => instance.post(urls.authors.add(), dtos.author.generalDto(name,surname,countryID)),
    editAuthor: (id,name,surname,countryID) => instance.patch(urls.authors.edit(id),dtos.author.generalDto(name,surname,countryID)),
    removeAuthor: (id) => instance.delete(urls.authors.remove(id)),

    //countries
    fetchCountries: (page,size) => instance.get(urls.countries.getPagination(page,size)),
    addCountry: (name,continentID) => instance.post(urls.countries.add(), dtos.country(name,continentID)),
    editCountry: (id,name,continentID) => instance.post(urls.countries.edit(id), dtos.countryEditDto(name)),
    removeCountry: (id) => instance.delete(urls.countries.remove(id)),
    fetchCountryFlag: (name) => `https://countryflagsapi.com/svg/${name}`,

    //excel exporter
    exportToExcel: (url) => excelInstance.get(url),

    //login
    //temporarily made to work with query parameters, needs to be updated and to use body request
    login: (username,password) => instance.post(`library/login?username=${username}&password=${password}`)
}




export default HttpClientService;
