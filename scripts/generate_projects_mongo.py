
from openpyxl import Workbook
import random
from datetime import date, datetime, timedelta
from pymongo import MongoClient
from dotenv import load_dotenv
from datetime import time,timedelta,datetime
load_dotenv()
import os
import uuid

# ============================================================
# CONFIGURACIÓN
# ============================================================
MONGO_URI = os.getenv("MONGODB_URI") 
DB_NAME = os.getenv("MONGODB_DB")

client = MongoClient(MONGO_URI)
db = client[DB_NAME]

collection = db["projects"]


# ============================================================
# CATÁLOGOS DE DATOS FICTICIOS
# ============================================================

proyectos=[
    {
        "name":"Sky Tower",
        "description":"Exclusivo edificio de 20 pisos con certificación LEED, diseñado para ofrecer una experiencia de vida superior. Su arquitectura vanguardista y Iacabados en cuarzo y mármol se complementan con amenidades premium como piscina infinity en el rooftop, gimnasio equipado, zona de coworking y estacionamiento para bicicletas. Además, el proyecto ofrece departamentos y estacionamientos, dentro de una propuesta moderna, funcional y atractiva para vivir o invertir.",
        "codigo":"sky001",
        "type_proyect":"edificazion",
        "type":"torre residencial",
        "area_total_terreno":"65,805",
        "moneda":"soles",
        "fecha_inicio_obras":"20/05/2027",
        "fecha_fin_obras":"20/05/2029",
        "costo_total":"705,362",
        "fecha_inicio_venta":"20/05/2028",
        "financiamiento":"Credito",
        "propietario":"Colombus SAC",
        "desarrollador_immobiliario":"Colombus SAC",
        "departamento":"AREQUIPA",
        "dirrecion":"av parra",
        "ubicacion":"16.425583525316707%2C%20-71.6599935293047",
        "image":""
    },
        {
        "name":"proyecto paracas",
        "description":"Paracas es un exclusivo proyecto residencial que combina confort y naturaleza, con modernas áreas comunes, piscina, zonas verdes y espacios recreativos para toda la familia. Diseñado para brindar tranquilidad, cuenta con seguridad 24/7 y ubicación estratégica cerca del mar. Ideal para vivir o invertir en un entorno único",
        "codigo":"pro002",
        "type_proyect":"lotizacion",
        "type":"residencial",
        "area_total_terreno":"75,234",
        "moneda":"soles",
        "fecha_inicio_obras":"10/08/2026",
        "fecha_fin_obras":"10/08/2029",
        "costo_total":"503.535",
        "fecha_inicio_venta":"10/08/2028",
        "financiamiento":"directo",
        "propietario":"Riveros SAC",
        "desarrollador_immobiliario":"Riveros SAC",
        "departamento":"LIMA",
        "dirrecion":"san isidro",
        "ubicacion":"16.425583525316707%2C%20-71.6599935293047",
        "image":""
    },
        {
        "name":"santorini",
        "description":"Proyecto de habilitación urbana ubicado en la nueva zona de expansión de Uchumayo. Cuenta con 420 lotes urbanizados disponibles para vivienda o inversión, en un sector con alto potencial de valorización. Ofrece facilidades",
        "codigo":"san001",
        "type_proyect":"edificazion",
        "type":"oficina premium",
        "area_total_terreno":"45,453",
        "moneda":"dolares",
        "fecha_inicio_obras":"18/03/2026",
        "fecha_fin_obras":"18/03/2029",
        "costo_total":"900,435",
        "fecha_inicio_venta":"18/03/2028",
        "financiamiento":"Credito",
        "propietario":"Melgar SAC",
        "desarrollador_immobiliario":"Melgar SAC",
        "departamento":"HUANUCO",
        "dirrecion":"av lurin",
        "ubicacion":"16.425583525316707%2C%20-71.6599935293047",
        "image":""
    },
        {
        "name":"Heraldos",
        "description":"Proyecto de habilitación urbana ubicado en la nueva zona de expansión de Uchumayo. Cuenta con 420 lotes urbanizados disponibles para vivienda o inversión, en un sector con alto potencial de valorización. Ofrece facilidades",
        "codigo":"alt001",
        "type_proyect":"edificazion",
        "type":"oficina premium",
        "area_total_terreno":"50,532",
        "moneda":"dolares",
        "fecha_inicio_obras":"24/12/2026",
        "fecha_fin_obras":"24/12/2029",
        "costo_total":"600,524",
        "fecha_inicio_venta":"24/12/2028",
        "financiamiento":"directo",
        "propietario":"Inovation Tech",
        "desarrollador_immobiliario":"Inovation Tech",
        "departamento":"MOQUEGUA",
        "dirrecion":"manatiales",
        "ubicacion":"16.425583525316707%2C%20-71.6599935293047",
        "image":""
    },
        {
        "name":"Torre Alameda",
        "description":"Proyecto de habilitación urbana ubicado en la nueva zona de expansión de Uchumayo. Cuenta con 420 lotes urbanizados disponibles para vivienda o inversión, en un sector con alto potencial de valorización. Ofrece facilidades",
        "codigo":"alt005",
        "type_proyect":"edificazion",
        "type":"multifamiliar",
        "area_total_terreno":"60,546",
        "moneda":"euros",
        "fecha_inicio_obras":"10/11/2026",
        "fecha_fin_obras":"10/11/2029",
        "costo_total":"800,341",
        "fecha_inicio_venta":"10/11/2028",
        "financiamiento":"directo",
        "propietario":"Continental SAC",
        "desarrollador_immobiliario":"Continental SAC",
        "departamento":"LIMA",
        "dirrecion":"san jorge",
        "ubicacion":"16.425583525316707%2C%20-71.6599935293047",
        "image":""
    },
        {
        "name":"sendero del sol",
        "description":"Proyecto de habilitación urbana ubicado en la nueva zona de expansión de Uchumayo. Cuenta con 420 lotes urbanizados disponibles para vivienda o inversión, en un sector con alto potencial de valorización. Ofrece facilidades",
        "codigo":"sen006",
        "type_proyect":"edificazion",
        "type":"residencial",
        "area_total_terreno":"83,805",
        "moneda":"euros",
        "fecha_inicio_obras":"09/09/2026",
        "fecha_fin_obras":"09/09/2030",
        "costo_total":"1,700,323",
        "fecha_inicio_venta":"09/09/2027",
        "financiamiento":"Credito",
        "propietario":"Ferrelines SAC",
        "desarrollador_immobiliario":"Ferrelines SAC",
        "departamento":"LIMA",
        "dirrecion":"san miguel",
        "ubicacion":"16.425583525316707%2C%20-71.6599935293047",
        "image":""
    }      
    
]

result=collection.insert_many(proyectos)
print(f"MONGO projects generado: LISTO")
print(f"Projectos insertados: {len(result.inserted_ids)}")