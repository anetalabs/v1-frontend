import axios from "axios";
import { Dto } from "../../utils/dto";

export namespace BffService {
  export async function getConfig() {
    const url = "/api/config";
    const res = await axios<Dto.GetConfig["response"]>({
      url,
    });
    return res.data;
  }
}
