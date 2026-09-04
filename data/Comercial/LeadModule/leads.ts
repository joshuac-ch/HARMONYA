import * as XLSX from "xlsx";
import { readFileSync } from "node:fs";

let PATH_LEADS="./scripts/leads_hackathon_lead_fifty.xlsx"

export function parseExcel() {
    const file = readFileSync(PATH_LEADS);
    const workbook = XLSX.read(file, {
        type: "buffer",
    });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    console.log("sheet",sheet)
    return XLSX.utils.sheet_to_json(sheet);
}
