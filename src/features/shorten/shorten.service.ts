import { Link } from "../../generated/prisma/client";
import { prisma } from "../../lib/prisma";
import { CreateShortenDTO } from "./dtos/create-shorten.dto";
import { nanoid } from "nanoid";
import { ShortenRepository } from "./shorten.repository";
import { createId } from "@paralleldrive/cuid2";


export class ShortenService {
  private repo = new ShortenRepository();

  async getLinks(): Promise<Link[]> {
    return this.repo.getAll();
  }

  async createLink(dto: CreateShortenDTO) {
    console.log(dto)
    const newLink: Link = {
      id: createId(),
      url: dto.url,
      shortCode: this.generateShortCode(),
      accessCount: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    return this.repo.create(newLink)
  }

  private generateShortCode(): string {
    const shortCodeLength = 6
    const shortCode = nanoid(shortCodeLength);
    return shortCode;
  }
}