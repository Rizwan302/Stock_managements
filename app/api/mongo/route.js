const { MongoClient } = require("mongodb");
const { NextResponse } = require("next/server");



export async function GET(req) {
  const uri = "mongodb+srv://rizwanahmedg2020:rizwanahmedg2020@cluster0.cm5rke6.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri);
  try {
    const database = client.db('stock');
    const movies = database.collection('managements');
    const query = {};
    const movie = await movies.findOne(query);
    // console.log(movie);
    return NextResponse.json(movie)
  } catch {
    console.log("Not Run")
  }
}

export async function POST(req) {

  let body = await req.json();
  console.log(body)
  const uri = "mongodb+srv://rizwanahmedg2020:rizwanahmedg2020@cluster0.cm5rke6.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri);
  try {
    const database = client.db('stock');
    const movies = database.collection('managements');
    const query = {};
    const movie = await movies.insertOne(body);
    // console.log(movie);
    return NextResponse.json({ movie, ok: true })
  } catch {
    console.log("Not Run")
  }
}