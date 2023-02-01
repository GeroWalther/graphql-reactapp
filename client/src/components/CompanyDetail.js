import { useParams } from "react-router";
import { getComp } from "../graphql/querys";
import { useState, useEffect } from "react";
import JobList from "./JobList";

function CompanyDetail() {
  const { companyId } = useParams();
  const [company, setComp] = useState(null);

  useEffect(() => {
    getComp(companyId).then(setComp);
  }, [companyId]);

  if (!company) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1 className="title">{company.name}</h1>
      <div className="box">{company.description}</div>
      <h5 className="title is-5"> Jobs at {company.name}</h5>
      <JobList jobs={company.jobs} />
    </div>
  );
}

export default CompanyDetail;
