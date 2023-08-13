import { Skeleton, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { formatVideoLengthToHours } from '../../../../../../../utils/functions';
import { useGetReportsUserProgressQuery } from '../../../../../report.service';

interface DataType {
  key: string;
  name: string;
  role: string;
  registered: string;
  lastLogin: string;
  lastEnrollment: string;
  studyTime: string;
  //   totalTimeOnPlatform: number;
  allCourses: number;
  completedCourses: number;
  inCompletedCourses: number;
  certificates: number;
  avgScore: number;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>
  },
  {
    title: 'Role',
    dataIndex: 'role',
    key: 'role'
  },
  {
    title: 'Registered',
    dataIndex: 'registered',
    key: 'registered'
  },
  {
    title: 'Last lastLogin',
    dataIndex: 'lastLogin',
    key: 'lastLogin'
  },
  {
    title: 'Last Enrollment',
    dataIndex: 'lastEnrollment',
    key: 'lastEnrollment'
  },
  {
    title: 'Study time',
    dataIndex: 'studyTime',
    key: 'studyTime'
  },
  //   {
  //     title: 'Total time on platform',
  //     dataIndex: 'totalTimeOnPlatform',
  //     key: 'totalTimeOnPlatform'
  //   },
  {
    title: 'All Courses',
    dataIndex: 'allCourses',
    key: 'allCourses'
  },
  {
    title: 'Completed Courses',
    dataIndex: 'completedCourses',
    key: 'completedCourses'
  },
  {
    title: 'Incompleted Courses',
    dataIndex: 'inCompletedCourses',
    key: 'inCompletedCourses'
  },
  {
    title: 'Certificates',
    dataIndex: 'certificates',
    key: 'certificates'
  },
  {
    title: 'Avg Score',
    dataIndex: 'avgScore',
    key: 'avgScore'
  }
];

const UsersProgressTable = () => {
  const { data: usersProgressData, isFetching } = useGetReportsUserProgressQuery();

  const userProgressReports = usersProgressData?.reports || [];

  const reportData: DataType[] = userProgressReports.map((report) => {
    const reportTemplateItem = {
      key: report._id,
      name: report.name,
      role: report.role,
      registered: report.registered,
      lastLogin: report.lastLogin,
      lastEnrollment: report.lastEnrollment,
      studyTime: formatVideoLengthToHours(+report.studyTime),
      totalTimeOnPlatform: report.totalTimeOnPlatform,
      allCourses: report.allCourses,
      completedCourses: report.completedCourses,
      inCompletedCourses: report.inCompletedCourses,
      certificates: report.certificates,
      avgScore: report.avgScore
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

export default UsersProgressTable;
