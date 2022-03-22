import moment from "moment";
import { fectchRuns } from "./github";

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

export const addConclusionSum = (stats: ObjectLiteral) => {
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

export const addSuccessTimes = (stats: ObjectLiteral) => {
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
