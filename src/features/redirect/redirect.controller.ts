import { Request, Response } from "express";
import { RedirectService } from "./redirect.service";

export class RedirectController {
  private redirectService = new RedirectService();

  handleRedirect = async (req: Request<{ shortCode: string }>, res: Response) => {
    try {
      const { shortCode } = req.params;
      const destinationUrl = await this.redirectService.getRedirectUrl(shortCode);

      if (!destinationUrl) {
        return res.status(404).json({ message: "Short link not found" });
      }

      return res.redirect(301, destinationUrl);

    } catch (error) {
      console.log(error)
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}