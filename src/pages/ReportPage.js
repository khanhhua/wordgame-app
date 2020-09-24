import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Badge, Card, CardBody, CardHeader } from 'reactstrap';
import LineChartWeeklyPerformance from '../components/LineChartWeeklyPerformance';
import BarChartHistogram from '../components/BarChartHistogram';
import Loader from '../components/Loader';
import {getLocalReports} from '../components/reporting';

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
      const {worstPerformers, weeklyPerformance,histogram} = await getLocalReports({});

      setStatus({ busy: false });
      setReport({
        worstPerformers,
        weeklyPerformance,
        histogram,
      });
    })();
  }, []);

  return (
    <div className='container report-page'>
      {!!status.busy && <Loader />}
      <section className='row'>
        <div className='col'>
          <h2>Report</h2>

          <Card>
            <CardHeader>
              <h5 className='mb-0'>Needs improvements</h5>
            </CardHeader>
            <CardBody>
              {report.worstPerformers.map((item) => (
                <Badge
                  pill
                  className={`p-2 mr-2 mb-2 ${classFromTags(item.tags)}`}
                  style={{ opacity: 1.05 - item.confidence_factor }}
                >
                  {item.word}
                  <span className='pl-2'>{item.correct_factor * 100}%</span>
                </Badge>
              ))}
            </CardBody>
          </Card>

          <Card className='mt-2'>
            <CardHeader>
              <h5 className='mb-0'>Performance</h5>
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
