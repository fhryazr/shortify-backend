import { Link } from "../../generated/prisma/client";
import { prisma } from "../../lib/prisma";
import { CreateShortenDTO } from "./dtos/create-shorten.dto";
import { nanoid } from "nanoid";
import { ShortenRepository } from "./shorten.repository";
import { createId } from "@paralleldrive/cuid2";
import { GetShortenDTO, ShortenSortOrder } from "./dtos/get-shorten.dto";

export class ShortenService {
  private repo = new ShortenRepository();

  async getLinks(dto: GetShortenDTO): Promise<Link[]> {
    switch (dto.sort) {
      case ShortenSortOrder.RECENTLY:
        return this.getRecentlyShortened(dto.limit || 5);
      default:
        console.log(typeof dto.limit)
        const data = await this.repo.getAll(dto.limit);

        return data.map((link) => ({
          ...link,
        }));
    }
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

  private async getRecentlyShortened(limit: number) {
    const data: Link[] = await this.repo.getAll(limit);

    return data.map((link) => ({
      ...link,
    }))
  }

  private generateShortCode(): string {
    const shortCodeLength = 6
    const shortCode = nanoid(shortCodeLength);
    return shortCode;
  }
}