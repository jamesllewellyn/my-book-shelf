import Bookcase from '../core/Bookcase';

export default {
    namespaced: true,
    state: {
        bookcase: null,
    },
    mutations: {
        createBookcase: (state, {shelves}) => {
            return state.bookcase = new Bookcase(shelves);
        },
        addShelf: (state, {shelf}) => {
            return state.bookcase.addShelf(shelf);
        },
        removeShelf: (state, {id}) => {
            return state.bookcase.removeShelf(id);
        },
        updateShelf: (state, {shelf}) => {
            return state.bookcase.updateShelf(shelf);
        },
        addBook: (state, {shelfId, book}) => {
            return state.bookcase.getShelf(shelfId).addBook(book);
        },
        moveBook: (state, {book, shelfId}) => {
            let shelf = state.bookcase.getShelf(shelfId);
            shelf.removeBook(book.isbn);
            state.bookcase.getShelf(book.shelf_id).addBook(book);
        },
        removeBook: (state, {shelfId, isbn}) => {
            return state.bookcase.getShelf(shelfId).removeBook(isbn);
        },
    },
    actions: {
        get: ({commit}) => {
            axios.get('/api/shelf')
                .then((response) => {
                    commit('createBookcase', {shelves: response.data.shelves});
                }, (error) => {

                });
        },
        getShelf: ({commit}, id) => {
            axios.get(`/api/shelf/${id}`)
                .then((response) => {
                    commit('updateShelf', {shelf: response.data.shelf});
                }, (error) => {
                    console.log(error);
                });
        },
        addShelf: ({commit}, name) => {
            return new Promise((resolve, reject) => {
            axios.post(`/api/shelf`, {name : name})
                .then((response) => {
                    commit('addShelf', {shelf: response.data.shelf});
                    return resolve(response);
                }, (error) => {
                    if (error.response.data) {
                        return reject(error.response.data.errors);
                    }
                });
            });
        },
        updateShelf: ({commit}, {id, shelf}) => {
            return new Promise((resolve, reject) => {
                axios.put(`/api/shelf/${id}`, shelf)
                    .then((response) => {
                        commit('updateShelf', {shelf: response.data.shelf});
                        return resolve(response);
                    }, (error) => {
                        if (error.response.data) {
                            return reject(error.response.data.errors);
                        }
                    });
            });
        },
        removeShelf: ({commit}, id) => {
            return new Promise((resolve, reject) => {
                axios.delete(`/api/shelf/${id}`)
                    .then((response) => {
                        commit('removeShelf', {id});
                        return resolve(response);
                    }, (error) => {
                        if (error.response.data) {
                            return reject(error.response.data.errors);
                        }
                    });
            });
        },
        addBook: ({commit}, {shelfId, isbn}) => {
            return new Promise((resolve, reject) => {
                axios.post(`/api/shelf/${shelfId}/book`, {isbn: isbn, isbn_13: false})
                    .then((response) => {
                        commit('addBook', {shelfId: shelfId, book: response.data.book});
                        return resolve(response);
                    }, (error) => {
                        if (error.response.data) {
                            return reject(error.response.data.errors);
                        }
                    });
            });
        },
        moveBook: ({commit}, {currentShelfId, isbn, newShelfId}) => {
            return new Promise((resolve, reject) => {
                axios.put(`/api/shelf/${currentShelfId}/book/${isbn}`, {'new_shelf_id': newShelfId})
                    .then((response) => {
                        commit('moveBook', {book: response.data.book, shelfId: currentShelfId});
                        return resolve(response);
                    }, (error) => {
                        return reject(error);
                    });
            });
        },
        removeBook: ({commit}, {shelfId, isbn}) => {
            return new Promise((resolve, reject) => {
                axios.delete(`/api/shelf/${shelfId}/book/${isbn}`)
                    .then((response) => {
                        commit('removeBook', {shelfId: shelfId, isbn: isbn});
                        return resolve(response);
                    }, (error) => {
                        if (error.response.data) {
                            return reject(error.response.data.errors);
                        }
                    });
            });
        }
    },
    getters: {
        get: (state) => {
            if (!state.bookcase) {
                return false;
            }
            return state.bookcase;
        },
        getShelves: (state) => {
            if (!state.bookcase) {
                return false;
            }
            return state.bookcase.getShelves();
        },
        getShelfById: (state) => (id) => {
            if (!state.bookcase) {
                return false;
            }
            return state.bookcase.getShelf(id);
        },
        isOnShelf: (state) => (isbn) => {
            if (!state.bookcase) {
                return false;
            }
            let shelf = state.bookcase.findBook(isbn);
            if(!shelf){
                return false
            }
            return shelf[0];
        },
    }
}