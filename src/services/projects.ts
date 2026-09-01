import { getDatabase } from "@/lib/mongodb";

export async function getProjects() {
    const db=await getDatabase()
    
    return db.collection("projects").find({}).toArray() 
} 

export async function get_projectID(project_id:String) {
    const db= await getDatabase()
    return db.collection('projects').findOne({"_id":project_id})
    
}

export async function get_proyect_by_name(project_name:string) {
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