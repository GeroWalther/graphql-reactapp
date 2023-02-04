import {
  JOBS_QUERY,
  JOB_QUERY,
  COMPANY_QUERY,
  CREATE_JOB_MUTATION,
} from "../graphql/querys";
import { useQuery, useMutation } from "@apollo/client";
import { getAccessToken } from "../auth";

export function useCompany(id) {
  const { data, loading, error } = useQuery(COMPANY_QUERY, {
    variables: { id },
  });
  return {
    company: data?.company,
    loading,
    error: Boolean(error),
  };
}

export function useCreateJob() {
  // first EL used to execute mutation accepting  config object. Sec. result of the mutation gives access to data, loading and error
  const [mutate, { loading, error }] = useMutation(CREATE_JOB_MUTATION);
  return {
    createJob: async (title, description) => {
      const {
        data: { job },
      } = await mutate({
        variables: { input: { title, description } },
        context: { headers: { Authorization: "Bearer " + getAccessToken() } },
        update: (cache, { data: { job } }) => {
          cache.writeQuery({
            query: JOB_QUERY,
            variables: { id: job.id },
            data: { job },
          });
        },
      });
      return job;
    },
    loading,
    error: Boolean(error),
  };
}

export function useJob(id) {
  const { data, loading, error } = useQuery(JOB_QUERY, { variables: { id } });
  return {
    job: data?.job,
    loading,
    error: Boolean(error),
  };
}

export function useJobs() {
  const { data, loading, error } = useQuery(JOBS_QUERY, {
    fetchPolicy: "network-only",
  });
  return {
    jobs: data?.jobs,
    loading,
    error: Boolean(error),
  };
}
