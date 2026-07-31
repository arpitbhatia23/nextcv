import { apiError } from "@/shared";
import CoverLetter from "../model/cover-letter.model";
export const deleteCoverLetterById = async ({ id }) => {
  const Cover_letter = await CoverLetter.findOne({
    _id: id,
  });

  if (!Cover_letter) {
    throw new apiError(404, "cover_letter not found");
  }
  await CoverLetter.deleteOne({ _id: id });
};
