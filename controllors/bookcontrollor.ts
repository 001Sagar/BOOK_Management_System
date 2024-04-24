import Books from '../models/bookSchme.ts';
import brcypt from 'bcrypt';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import  authenticate  from '../utills/auth.ts'; // Adjust the path as needed


// API to Add the Book
async function add_book(req: Request, res: Response) {
    try {
        const { title, author, publish_year }: { title: string, author: string, publish_year: number} = req.body;
        
        // Assuming you have user authentication and can access the user's ID
        
        const book = new Books({
            title,
            author,
            publish_year
        });
        
        const newBook = await book.save();
        
        return res.status(200).json({
            message: "Book added successfully",
            data: newBook
        });
    } catch (error) {
        console.log("Error in adding book: ", error);
        return res.status(500).json({
            status: 500,
            success: false,
            error: error,
            message: "Server error"
        });
    }
}


// API to get the Book by Author or Publish Year
async function getBook(req: Request, res: Response) {
    try {
        const { author, publish_year }: { author: string, publish_year: string } = req.body;
        const filter : { author ? : string, publish_year? : string } ={};
        if(author) filter.author = author;
        if(publish_year) filter.publish_year = publish_year;
        
        const book = await Books.findOne(filter);
        return res.status(200).json({
         status :200,
         success:true,
         data : book ?? "" ,
         message :"Get Data Successfully"
        });
    } catch (error) {
        console.log("Error in the Login");
        return res.status(500).json({
            status: 500,
            success: false,
            error: error,
            message: "Get Server Errror"
        })
    }
}


// API to Update the Book details of Author or Publish Year
async function updateBookData(req: Request, res: Response) {
    try {
        const { title, author, publish_year }: { title: string, author: string, publish_year: number} = req.body;
        const book = await Books.findOne({ title });
        if (!book) {
            return res.status(400).json({ message: 'There is no book found' });
        }
        
        const bookupdate = await Books.findOneAndUpdate({ title }, { author, publish_year }, { new: true, upsert: true });
        return res.status(200).json({
            message: 'Book Data updated successfully',
            bookupdate
        });
    } catch (error) {
        console.log("Error in the updatepassword", error);
        console.log("Error in the Login");
        return res.status(500).json({
            status: 500,
            success: false,
            error: error,
            message: "Get Server Errror"
        })

    }
}

// API to delete the Book
async function deleteBook(req: Request, res: Response) {
    try {
        const { title} = req.body;
        const getbook = await Books.findOne({ title });
        if (!getbook) {
            return res.status(400).json({ message: 'Book not found' });
        }
        const book = await Books.findOneAndDelete({ title });
        return res.status(200).json({ message: 'Book deleted successfully', book });
    } catch (error) {
        console.log("Error in the deleteUser");
        return res.status(500).json({
            status: 500,
            success: false,
            error: error,
            message: "Get Server Errror"
        })
    }
}


export default { add_book, getBook, updateBookData, deleteBook }