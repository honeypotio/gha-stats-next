import { Octokit } from "@octokit/rest";

export const fectchRuns = async () => {
  const octokit = new Octokit({
    auth: process.env.REPO_ACCESS_TOKEN,
  });

  const workflows = await octokit.rest.actions.listRepoWorkflows({
    owner: process.env.REPO_ORG as string,
    repo: process.env.REPO_NAME as string,
  });

  const workflowId = workflows.data.workflows.find(
    (workflow) => workflow.name === process.env.REPO_WORKFLOW
  )?.id;

  return await octokit.paginate(octokit.actions.listWorkflowRuns, {
    owner: process.env.REPO_ORG as string,
    repo: process.env.REPO_NAME as string,
    workflow_id: workflowId as number,
    per_page: 100,
    event: "push",
  });
};
