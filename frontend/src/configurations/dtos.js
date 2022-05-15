const dtos =  {
    book: {
        generalDto: (name,imageUrl, category, authorID, availableCopies) => {
           return { 
                name : name,
                imageUrl : imageUrl,
                category : category,
                authorID : authorID,
                availableCopies : availableCopies}
        }
    },
    category: {
        generalDto: (name) => {
            return {
                name: name}
        }
    },
    loan: {
        generalDto: (userID,bookID,dateDue) => {
            return {
                userID: userID,
                bookID: bookID,
                dateDue: dateDue
            }
        },
        loanDto: (dateDue) => {
            return {
                dateDue: dateDue
            }
        }
    },
    author: {
        generalDto: (name,surname,countryID) => {
            return {
                name: name,
                surname: surname,
                countryID: countryID
            }
        }
    },
    country: (name,continentID) => {
        return {
            name: name,
            continentID: continentID
        }
    },
    country: (name) => {
        return {
            name: name,
        }
    }
};

export default dtos;