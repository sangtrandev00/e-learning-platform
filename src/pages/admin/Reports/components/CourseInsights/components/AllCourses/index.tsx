import { Skeleton, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Link } from 'react-router-dom';
import { formatVideoLengthToHours } from '../../../../../../../utils/functions';
import { useGetReportsCourseInsightsQuery } from '../../../../../report.service';

interface DataType {
  key: string;
  name: string;
  learners: number;
  avgStudyTime: string;
  views: number;
  socialInteractions: number;
  totalVideosLength: string;
  lessons: number;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'All Courses',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <Link to={`?tab=123`}>{text}</Link>
  },
  {
    title: 'Learners',
    dataIndex: 'learners',
    key: 'learners'
  },
  //   {
  //     title: 'Total Enrollments',
  //     dataIndex: 'totalEnrollment',
  //     key: 'totalEnrollment'
  //   },
  {
    title: 'Avg. Study time',
    dataIndex: 'avgStudyTime',
    key: 'avgStudyTime'
  },
  {
    title: 'Views',
    dataIndex: 'views',
    key: 'views'
  },
  {
    title: 'Social interactions',
    dataIndex: 'socialInteractions',
    key: 'socialInteractions'
  },
  {
    title: 'Total durations',
    dataIndex: 'totalVideosLength',
    key: 'totalVideosLength'
  },
  {
    title: 'Lessons',
    dataIndex: 'lessons',
    key: 'lessons'
  }
];

const AllCourses = () => {
  const { data: courseInsightsData, isFetching } = useGetReportsCourseInsightsQuery();

  const userProgressReports = courseInsightsData?.reports || [];

  const reportData: DataType[] = userProgressReports.map((report) => {
    const reportTemplateItem = {
      key: report._id,
      name: report.name,
      learners: report.learners,
      avgStudyTime: formatVideoLengthToHours(+report.avgStudyTime),
      views: report.views,
      socialInteractions: report.socialInteractions,
      totalVideosLength: formatVideoLengthToHours(+report.totalVideosLength),
      lessons: report.lessons
    };
    return reportTemplateItem;
  });

  return (
    <div className='users-progress__table-section'>
      {isFetching && <Skeleton />}
      {!isFetching && <Table columns={columns} dataSource={reportData} />}
    </div>
  );
};

export default AllCourses;
