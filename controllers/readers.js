const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Readers']
    const result = await mongodb.getDatabase().db().collection('readers').find();
    result.toArray().then((readers) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(readers)
    });
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Readers']
    const readerId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('readers').find({_id: readerId});
    result.toArray().then((readers) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(readers[0])
    });
};

const createReader = async (req, res) => {
    //#swagger.tags=['Readers']
    const reader = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        birthday: req.body.birthday
    };
    const response = await mongodb.getDatabase().db().collection('readers').insertOne(reader);
    if(response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while creating the reader.')
    }
};

const updateReader = async (req, res) => {
    //#swagger.tags=['Readers']
    const readerId = new ObjectId(req.params.id);
    const reader = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        birthday: req.body.birthday
    };
    const response = await mongodb.getDatabase().db().collection('readers').replaceOne({ _id: readerId }, reader);
    if(response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while updating the reader.')
    }
};

const deleteReader = async (req, res) => {
    //#swagger.tags=['Readers']
    //#swagger.description="This endpoint is used to delete a reader from your database."
    const readerId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('readers').deleteOne({ _id: readerId });
    if(response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while deleting the reader.')
    }
};

module.exports = {
    getAll, getSingle, createReader, updateReader, deleteReader
};