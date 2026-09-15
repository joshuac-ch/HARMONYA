import { ObjectId } from "mongodb";
import { getDatabase } from "@/lib/mongodb";
import type { ProjectReference } from "../../domain/types";
import type { ProjectLookup } from "../../ports/project_port";

function toRef(doc: {
  _id: unknown;
  codigo?: string;
  name?: string;
  description?: string;  
  departamento?: string;
  direccion?: string;
  ubicacion?: string;
  image?: string;
}): ProjectReference {
  return {
    id: String(doc._id),
    codigo: doc.codigo ?? "",
    departamento:doc.departamento??"",
    name: doc.name ?? "",
    description: doc.description ?? "",    
    direccion: doc.direccion ?? "",
    ubicacion: doc.ubicacion ?? "",
    image: doc.image ?? "",
  };
}

function objectIdOrNull(id: string): ObjectId | null {
  if (!ObjectId.isValid(id)) return null;
  const oid = new ObjectId(id);
  if (oid.toString() !== id) return null;
  return oid;
}

export const mongoProjectLookup: ProjectLookup = {
  async findById(id) {
    const db = await getDatabase();
    const oid = objectIdOrNull(id);
    const doc = oid
      ? await db.collection("projects").findOne({ _id: oid })
      : await db.collection("projects").findOne({ codigo: id });

    return doc ? toRef(doc) : null;
  },

  async findByCodigo(codigo) {
    const db = await getDatabase();
    const doc = await db.collection("projects").findOne({ codigo });
    return doc ? toRef(doc) : null;
  },
};
