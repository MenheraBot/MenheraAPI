/* eslint-disable camelcase */
import {
  deleteOldWeeklyHunters,
  getWeeklyHuntersTop,
  WeeklyHuntersTop,
  WeeklyHuntersTopDated,
} from '../database/DatabaseQueries';

const WeeklyHunters = {
  nextUpdateAt: 0,
  lastRequestData: [] as WeeklyHuntersTop[],
  requestsMade: 0,
  request: async (): Promise<WeeklyHuntersTopDated> => {
    const now = Date.now();

    if (now < WeeklyHunters.nextUpdateAt)
      return {
        data: WeeklyHunters.lastRequestData,
        nextUpdate: WeeklyHunters.nextUpdateAt,
      };

    const top = await getWeeklyHuntersTop();

    WeeklyHunters.nextUpdateAt = Date.now() + 1000 * 60 * 60 * 1.5;
    WeeklyHunters.requestsMade += 1;

    if (WeeklyHunters.requestsMade > 30) {
      WeeklyHunters.requestsMade = 0;
      deleteOldWeeklyHunters();
    }

    return {
      data: top,
      nextUpdate: WeeklyHunters.nextUpdateAt,
    };
  },
};

export default WeeklyHunters;
