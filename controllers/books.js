const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Books']
    try {
        const result = await mongodb.getDatabase().db().collection('books').find();
        const books = await result.toArray();
        
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(books);
    } catch (error) {
        console.error('Error while getting books', error);
        res.status(500).json({ message: 'Some error occured while getting the books' });
    }
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Books']
    try {
        const bookId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('books').find({ _id: bookId });
        const books = await result.toArray();

        if (books.length === 0) {
            return res.status(404).json({ message: 'Book not finded.' });
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(books[0]);
    } catch (error) {
        console.error('Erro ao buscar o livro:', error);
        res.status(500).json({ message: 'Some error occured while getting the book' });
    }
};

const addBook = async (req, res) => {
    //#swagger.tags=['Books']
    const book = {
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        releaseYear: req.body.releaseYear,
        pages: req.body.pages,
        ISBN10: req.body.ISBN10,
        ISBN13: req.body.ISBN13
    };
    const response = await mongodb.getDatabase().db().collection('books').insertOne(book);
    if(response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while adding the book.')
    }
};

const updateBook = async (req, res) => {
    //#swagger.tags=['Books']
    const bookId = new ObjectId(req.params.id);
    const updatedBook = {
        ...(req.body.title && { title: req.body.title }),
        ...(req.body.author && { author: req.body.author }),
        ...(req.body.description && { description: req.body.description }),
        ...(req.body.releaseYear && { releaseYear: req.body.releaseYear }),
        ...(req.body.pages && { pages: req.body.pages }),
        ...(req.body.ISBN10 && { ISBN10: req.body.ISBN10 }),
        ...(req.body.ISBN13 && { ISBN13: req.body.ISBN13 }),
    };
    const response = await mongodb.getDatabase().db().collection('books').updateOne({ _id: bookId }, {$set: updatedBook});
    if(response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while updating the book.')
    }
};

const deleteBook = async (req, res) => {
    //#swagger.tags=['Books']
    //#swagger.description="This endpoint is used to delete a book from your database."
    const bookId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('books').deleteOne({ _id: bookId });
    if(response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while deleting the book.')
    }
};

module.exports = {
    getAll, getSingle, addBook, updateBook, deleteBook
};