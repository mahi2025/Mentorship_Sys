import { AppError } from "../../shared/errors/AppError";
import { ProfileRepository } from "./profile.repository";

export class ProfilesService {
  private profileRepository = new ProfileRepository();

  async getProfile(userId: string) {
    const profile = await this.profileRepository.findByUserId(userId);

    if (!profile) {
      throw new AppError("Profile not found", 404);
    }

    return profile;
  }

  async createDefaultProfile(userId: string) {
    const existing = await this.profileRepository.findByUserId(userId);

    if (existing) {
      return existing;
    }

    return this.profileRepository.create(userId);
  }

  async updateProfile(
    userId: string,
    data: {
      headline?: string | null;
      bio?: string | null;
    },
  ) {
    const existing = await this.profileRepository.findByUserId(userId);

    if (!existing) {
      throw new AppError("Profile not found", 404);
    }

    return this.profileRepository.update(userId, data);
  }
}
