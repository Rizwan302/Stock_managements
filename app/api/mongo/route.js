

const { MongoClient } = require("mongodb");
const { NextResponse } = require("next/server");

// Replace the uri string with your connection string.

export async function GET(){
const uri = "mongodb+srv://rizwanahmedg2020:rizwanahmedg2020@cluster0.cm5rke6.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);


  try {
    const database = client.db('stock');
    const movies = database.collection('managements');

    const query = { };
    const movie = await movies.findOne(query);

    console.log(movie);
    return NextResponse.json(movie)
  } catch {
    console.log("Not Run")
  }
}