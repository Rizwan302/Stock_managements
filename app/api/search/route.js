const { MongoClient } = require("mongodb");
const { NextResponse } = require("next/server");

export async function GET(req, res) {
  // const query =  
  const uri = "mongodb+srv://rizwanahmedg2020:rizwanahmedg2020@cluster0.cm5rke6.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const query = req.nextUrl.searchParams.get('query'); 
    const database = client.db('stock');
    const collection = database.collection('managements');
    
    const cursor = collection.find({
      slug: { $regex: query, $options: 'i' }, 
    });

    const result = await cursor.toArray();
    console.log(result);
    return NextResponse.json(result);
  } catch (err) {
    console.error(err); 
    return NextResponse.json({err}); // Return an error response
  } 
}
