import moment from "moment";
import { fectchRuns } from "./github";
import { average, median, movingStat } from "./math";

type Runs = ExtractPromiseType<ReturnType<typeof fectchRuns>>;

// interface Stats {
//   [key: string]: {
//     runs: Runs;
//     total: number;
//     conclusion: {
//       success: number;
//       failure: number;
//       cancelled: number;
//       startup_failure: number;
//     };
//     successTimes: number[];
//   };
// }

export const groupByDay = (runs: Runs) => {
  const stats: ObjectLiteral = {};

  runs.forEach((run) => {
    if (run.status !== "completed") return;
    const day = moment(run.run_started_at).format("YYYY-MM-DD");
    if (!stats[day]) stats[day] = { runs: [], total: 0 };
    stats[day].runs.push(run);
    stats[day].total++;
  });

  return stats;
};

const addConclusionSum = (stats: ObjectLiteral) => {
  Object.keys(stats).forEach((key) => {
    stats[key].conclusion = {
      success: 0,
      failure: 0,
      cancelled: 0,
      startup_failure: 0,
    };
    stats[key].runs.forEach((run: any) => {
      stats[key].conclusion[run.conclusion] += 1;
    });
  });

  return stats;
};

const addSuccessTimes = (stats: ObjectLiteral) => {
  Object.keys(stats).forEach((key) => {
    stats[key].successTimes = stats[key].runs
      .filter((run: any) => run.conclusion === "success")
      .map((run: any) => {
        const createdAtTime = Date.parse(run.run_started_at);
        const updatedAtTime = Date.parse(run.updated_at);
        const durationMs = updatedAtTime - createdAtTime;
        return durationMs / 1000;
      });
  });

  return stats;
};

const addAverages = (stats: ObjectLiteral) => {
  Object.keys(stats).forEach((key) => {
    stats[key].avgSuccessTime = average(stats[key].successTimes) || null;
    stats[key].medianSuccessTime = median(stats[key].successTimes) || null;
    stats[key].successRate =
      (stats[key].conclusion.success / stats[key].total) * 100;
  });

  return stats;
};

const addMovingAverages = (stats: ObjectLiteral) => {
  // These are not perfect as the moving stat is calculated based on the avg/median of the day
  // It should rather take each value of the day, but because days have different count of values, keeping track of moving avg/median becomes complicated
  const movingByDayAvgSuccessTime = {
    seven: movingStat(
      Object.keys(stats).map((key) => stats[key].avgSuccessTime),
      7,
      0,
      average
    ),
    fourteen: movingStat(
      Object.keys(stats).map((key) => stats[key].avgSuccessTime),
      14,
      0,
      average
    ),
  };
  const movingByDayMedianSuccessTime = {
    seven: movingStat(
      Object.keys(stats).map((key) => stats[key].medianSuccessTime),
      7,
      0,
      median
    ),
    fourteen: movingStat(
      Object.keys(stats).map((key) => stats[key].medianSuccessTime),
      14,
      0,
      median
    ),
  };
  const movingByDaySuccessRate = {
    seven: movingStat(
      Object.keys(stats).map((key) => stats[key].successRate),
      7,
      0,
      average
    ),
    fourteen: movingStat(
      Object.keys(stats).map((key) => stats[key].successRate),
      14,
      0,
      average
    ),
  };
  let index = 0;

  Object.keys(stats).forEach((key) => {
    stats[key].movingByDayAvgSuccessTime = {
      seven: movingByDayAvgSuccessTime.seven[index],
      fourteen: movingByDayAvgSuccessTime.fourteen[index],
    };
    stats[key].movingByDayMedianSuccessTime = {
      seven: movingByDayMedianSuccessTime.seven[index],
      fourteen: movingByDayMedianSuccessTime.fourteen[index],
    };
    stats[key].movingByDaySuccessRate = {
      seven: movingByDaySuccessRate.seven[index],
      fourteen: movingByDaySuccessRate.fourteen[index],
    };

    index++;
  });

  return stats;
};

export const addCalculatedStats = (stats: ObjectLiteral) => {
  return addMovingAverages(
    addAverages(addSuccessTimes(addConclusionSum(stats)))
  );
};

export const removeRawRuns = (stats: ObjectLiteral) => {
  const thinStats: ObjectLiteral = {};

  Object.keys(stats).forEach((key) => {
    const { runs, ...keptAttributes } = stats[key];
    thinStats[key] = keptAttributes;
  });

  return thinStats;
};
