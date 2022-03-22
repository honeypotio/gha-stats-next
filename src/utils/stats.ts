import moment from "moment";

export const groupByDay = (runs: any) => {
  const statsPerDay: ObjectLiteral = {};

  runs.forEach((run: any) => {
    if (run.status !== "completed") return;
    const day = moment(run.run_started_at).format("YYYY-MM-DD");
    if (!statsPerDay[day]) statsPerDay[day] = { runs: [], total: 0 };
    statsPerDay[day].runs.push(run);
    statsPerDay[day].total++;
  });

  return statsPerDay;
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
