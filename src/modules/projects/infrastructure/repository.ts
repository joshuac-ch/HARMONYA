import { getDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

const COLLECTION = "projects";

function objectIdOrNull(id:string):ObjectId|null {
    if (!ObjectId.isValid(id)) return null;
    const oid=new ObjectId(id)
    if (oid.toString()!==id) return null
    return oid;
}

export async function AllProject(){
    const db= await getDatabase()
    const doc=await db.collection(COLLECTION).find().toArray()
    return await doc
}

export async function findProjectById(id:string) {
    const db= await getDatabase()
    const oid= objectIdOrNull(id)
    if (!oid) return null;
    return db.collection(COLLECTION).findOne({"_id":oid})
}

export async function findProjectByName(project_name:string) {
    try{
        const db=await getDatabase()
        const project=await db.collection("projects").findOne({
            name:project_name
        })
        return project
    }catch(err){
        console.error(err)
        throw err
    }
}

