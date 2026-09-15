import { AllProject,findProjectById,findProjectByName} from "../infrastructure/repository";

export function AllProjectService(){
    return AllProject()
}

export async function findProjectByIdService(id:string){
    if (!id){
        return null
    }
    const project=await findProjectById(id)
    return project
}

export async function findProjectByNameService(name:string) {
    if(!name){
        return null;
    }
    const project=await findProjectByName(name)
    return project
    
}