import { PostModel } from "../db/models/post-model.js";
import { DayModel } from "../db/models/day-model.js";

const PostService = {
  async findPostsByIdAndDate(Info) {
    const { userId, date } = Info;
    const day = await DayModel.find(Info);

    console.log(day);
  },
};

export { PostService };
