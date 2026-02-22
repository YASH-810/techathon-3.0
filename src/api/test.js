import clientPromise from '@/lib/mongodb'

export default async function handler(req, res) {
  try {
    const client = await clientPromise
    const db = client.db("marg_ai_db") // Replace with your database name

    const data = await db.collection("test").find({}).toArray()

    res.status(200).json(data)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Internal Server Error" })
  }
}
