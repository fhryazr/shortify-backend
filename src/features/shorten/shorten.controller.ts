import { Request, Response } from "express";
import { ShortenService } from "./shorten.service";
import { CreateShortenDTO } from "./dtos/create-shorten.dto";
import { GetShortenDTO } from "./dtos/get-shorten.dto";
import { ShortenResponseDTO } from "./dtos/shorten-response.dto";


export class ShortenController {
  private shortenService = new ShortenService();

  getLinks = async (req: Request<{}, {}, {}, GetShortenDTO>, res: Response) => {
    try {
      const data: ShortenResponseDTO[] = await this.shortenService.getLinks(req.query);
      return res.status(200).json(data);
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: "Internal Server Error asdfsad" });
    }
  }

  createLink = async (req: Request<{}, {}, CreateShortenDTO>, res: Response) => {
    try {
      const newLink: ShortenResponseDTO = await this.shortenService.createLink(req.body);
      return res.status(201).json(newLink);
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  updateLink = async (req: Request<{ id: string }, {}, CreateShortenDTO>, res: Response) => {
    try {
      const { id } = req.params;
      const data = req.body;

      const updatedLink: ShortenResponseDTO = await this.shortenService.updateLink(id, data);
      return res.status(200).json(updatedLink);
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  deleteLink = async (req: Request<{ shortCode: string }>, res: Response) => {
    try {
      const { shortCode } = req.params;
      await this.shortenService.deleteLink(shortCode);
      return res.status(200).json({ message: "Link deleted successfully" });
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

}