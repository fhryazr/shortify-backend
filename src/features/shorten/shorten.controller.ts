import { Request, Response } from "express";
import { ShortenService } from "./shorten.service";
import { ShortenResponseDTO } from "./dtos/shorten-response.dto";
import { CreateShortenDTO } from "./dtos/create-shorten.dto";
import { Link } from "../../generated/prisma/client";


export class ShortenController {
  private shortenService = new ShortenService();

  getLinks = async (req: Request, res: Response) => {
    try {
      const links = await this.shortenService.getLinks();

      const response: ShortenResponseDTO[] = links.map(link => ({
        id: link.id,
        shortCode: link.shortCode,
        url: link.url,
        accessCount: link.accessCount,
        createdAt: link.createdAt,
        updatedAt: link.updatedAt,
      }))
      return res.status(200).json(response);

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