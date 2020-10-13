import React, {useCallback, useContext, useEffect, useState} from 'react';
import { Badge, Card, CardBody, CardHeader, Button } from 'reactstrap';
import LineChartWeeklyPerformance from '../components/LineChartWeeklyPerformance';
import BarChartHistogram from '../components/BarChartHistogram';
import Loader from '../components/Loader';
import { getLocalReports } from '../services/reporting';
import { get } from '../services/settings';
import {getCollections, getTermsByCollection} from '../services/github';
import {ACTION_START_SESSION, STATUS_OK, STATUS_PENDING} from "../components/constants";
import {createSession} from "../services/session";
import {DispatchContext} from "../components/context";
import {useHistory} from "react-router-dom";

const bgClasses = {
  MAS: 'bg-masculine',
  FEM: 'bg-feminine',
  NEU: 'bg-neuter',
};

const classFromTags = (tags) => {
  const match = /MAS|FEM|NEU/.exec(tags);
  if (match) {
    return bgClasses[match[0]];
  }
  return '';
};

export default (props) => {
  const dispatch = useContext(DispatchContext);
  const history = useHistory();
  const [status, setStatus] = useState({ busy: false, error: null });
  const [report, setReport] = useState({
    worstPerformers: [],
    weeklyPerformance: [],
    histogram: [],
  });
  useEffect(() => {
    (async () => {
      setStatus({ busy: true });
      const {
        worstPerformers,
        weeklyPerformance,
        histogram,
      } = await getLocalReports({});

      setStatus({ busy: false });
      setReport({
        worstPerformers,
        weeklyPerformance,
        histogram,
      });
    })();
  }, []);

  const onReviewClick = useCallback(async () => {
    const currentCollection = await get('repo.current');
    const collections = await getCollections(currentCollection.url);
    let allTerms = [];

    for (const collection of collections) {
      const _terms = await getTermsByCollection(collection.repoUrl, collection.file, 'noun');
      allTerms = allTerms.concat(_terms);
    }

    const { worstPerformers } = await getLocalReports({});
    const filteringKeys = worstPerformers.filter(({correct_factor}) => correct_factor < 0.7).map(({ word }) => word);
    const terms = allTerms.filter(({ word }) => filteringKeys.includes(word))

    console.log({terms});
    dispatch({ type: ACTION_START_SESSION, status: STATUS_PENDING });
    const sessionId = await createSession(terms);
    history.push(`/play/${sessionId}`);
    dispatch({ type: ACTION_START_SESSION, status: STATUS_OK });
  }, [dispatch, history]);

  return (
    <div className="container report-page">
      {!!status.busy && <Loader />}
      <section className="row">
        <div className="col">
          <h2>Report</h2>

          <Card>
            <CardHeader>
              <Button
                  color="primary"
                  className="float-right"
                  onClick={onReviewClick}
              >Review</Button>
              <h5 className="mb-0">Needs improvements</h5>
            </CardHeader>
            <CardBody>
              {report.worstPerformers.map((item) => (
                <Badge
                  pill
                  className={`p-2 mr-2 mb-2 ${classFromTags(item.tags)}`}
                  style={{ opacity: 1.05 - item.confidence_factor }}
                >
                  {item.word}
                  <span className="pl-2">{item.correct_factor * 100}%</span>
                </Badge>
              ))}
            </CardBody>
          </Card>

          <Card className="mt-2">
            <CardHeader>
              <h5 className="mb-0">Performance</h5>
            </CardHeader>
            <CardBody>
              {!!(report && report.histogram && report.histogram.length) && (
                <BarChartHistogram histogram={report.histogram} />
              )}
              {!!(
                report &&
                report.weeklyPerformance &&
                report.weeklyPerformance.length
              ) && (
                <LineChartWeeklyPerformance
                  weeklyPerformance={report.weeklyPerformance}
                />
              )}
            </CardBody>
          </Card>
        </div>
      </section>
    </div>
  );
};
