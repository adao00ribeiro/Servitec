import axios from "axios";
import { ICompany } from "../../interfaces/ICompany";

export async function CreateCompany(company: ICompany) {
    try {
        const res = await axios.post('http://localhost:3333', company);

        console.log(res.data)
    } catch (error) {

    }
}