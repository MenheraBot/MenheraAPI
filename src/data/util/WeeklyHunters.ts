/* eslint-disable camelcase */
import {
  deleteOldWeeklyHunters,
  getWeeklyHuntersTop,
  WeeklyHuntersTop,
} from '../database/DatabaseQueries';

const WeeklyHunters = {
  lastRequestAt: 0,
  lastRequestData: [] as WeeklyHuntersTop[],
  requestsMade: 0,
  request: async (): Promise<{ data: WeeklyHuntersTop[]; cache: boolean }> => {
    const now = Date.now();

    if (now - WeeklyHunters.lastRequestAt < 1000 * 60 * 60 * 1.5)
      return { data: WeeklyHunters.lastRequestData, cache: true };

    const top = await getWeeklyHuntersTop();

    WeeklyHunters.lastRequestAt = now;
    WeeklyHunters.lastRequestData = top;

    WeeklyHunters.requestsMade += 1;

    if (WeeklyHunters.requestsMade > 30) {
      WeeklyHunters.requestsMade = 0;
      deleteOldWeeklyHunters();
    }

    return { data: top, cache: false };
  },
};

export default WeeklyHunters;
