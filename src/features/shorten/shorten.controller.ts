import { Request, Response } from "express";
import { ShortenService } from "./shorten.service";
import { CreateShortenDTO } from "./dtos/create-shorten.dto";
import { GetShortenDTO, getShortenSchema } from "./dtos/get-shorten.dto";
import { ShortenResponseDTO } from "./dtos/shorten-response.dto";


export class ShortenController {
  private shortenService = new ShortenService();

  getLinks = async (req: Request<{}, {}, {}, GetShortenDTO>, res: Response) => {
    try {
      const params = getShortenSchema.safeParse(req.query);

      if (!params.success) {
        return res.status(400).json({ message: "Invalid query parameters", errors: params.error.issues });
      }

      const data: ShortenResponseDTO[] = await this.shortenService.getLinks(params.data);
      return res.status(200).json(data);

    } catch (error) {
      console.log(error)
      res.status(500).json({ message: "Internal Server Error asdfsad" });
    }
  }

  createLink = async (req: Request<{}, {}, CreateShortenDTO>, res: Response) => {
    try {
      const dto = req.body
      const newLink = await this.shortenService.createLink(dto)
      return res.status(201).json(newLink);
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

}