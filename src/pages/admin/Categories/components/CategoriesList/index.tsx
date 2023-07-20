import React, { Fragment, useEffect } from 'react';
import { Button, Skeleton, Space, Table } from 'antd';
import type { ColumnsType, TableProps, TablePaginationConfig } from 'antd/es/table';
import type { FilterValue, SorterResult } from 'antd/es/table/interface';
import { useState } from 'react';
import './CategoriesList.scss';
// import { useGetCourseQuery, useGetCoursesQuery } from '../../course.service';
import { EditOutlined, EllipsisOutlined } from '@ant-design/icons';

interface DataCategoryType {
  key: React.Key;
  name: any;
  avatar?: string;
  email?: string;
  courses: string[];
  tags: string[];
  createdAt: string; // Convert to date: Example: 18 jun 2023
  lastLogin: string;
  actions?: any;
}

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue>;
}

const columns: ColumnsType<DataCategoryType> = [
  {
    title: 'Category',
    dataIndex: 'name',
    filters: [
      {
        text: 'Joe',
        value: 'Joe'
      },
      {
        text: 'Category 1',
        value: 'Category 1'
      },
      {
        text: 'Category 2',
        value: 'Category 2'
      }
    ],
    filterMode: 'tree',
    filterSearch: true,
    // onFilter: (value: string | number | boolean, record) => record.name.startsWith(value.toString()),
    width: '30%'
  },
  {
    title: 'Last login',
    dataIndex: 'lastLogin'
    // sorter: (a, b) => Number(a.author) - Number(b.author)
  },
  {
    title: 'Created at',
    dataIndex: 'createdAt',
    filters: [
      {
        text: 'London',
        value: 'London'
      },
      {
        text: 'New York',
        value: 'New York'
      }
    ],
    // onFilter: (value: string | number | boolean, record) => record.categories.startsWith(value.toString()),
    filterSearch: true
  },
  {
    title: 'Courses',
    dataIndex: 'courses'
  },
  {
    title: 'Tags',
    dataIndex: 'tags'
  },
  {
    title: 'Manage',
    dataIndex: 'manage'
  }
];

const onChange: TableProps<DataCategoryType>['onChange'] = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};

const CategoriesList: React.FC = () => {
  const [open, setOpen] = useState(false);

  //   const showUserDetail = () => {
  //     console.log('click');
  //     setOpen(true);
  //   };

  const categoriesSource = [
    {
      key: '1',
      name: (
        <a href='#'>
          <div className='category-info'>
            <img
              src='https://lwfiles.mycourse.app/64b5524f42f5698b2785b91e-public/avatars/thumbs/64b5524f42f5698b2785b91f.jpg'
              className='category-info__avatar'
            />

            <div className='category-info__content'>
              <div className='category-info__name'>Backend</div>
              {/* <div className='category-info__email'>sangtnps20227@fpt.edu.vn</div> */}
            </div>
          </div>
        </a>
      ),
      lastLogin: '19 Jul 2023 21:43:35',
      createdAt: '17 Jul 2023 21:38:07',
      courses: ['23432k', 'dsfdjsk'],
      tags: ['23432k', 'dsfdjsk'],
      manage: (
        <Space>
          <Button>
            <EditOutlined />
          </Button>
          <Button>
            <EllipsisOutlined />
          </Button>
        </Space>
      )
    },
    {
      key: '2',
      name: (
        <a href='#'>
          <div className='category-info'>
            <img
              src='https://lwfiles.mycourse.app/64b5524f42f5698b2785b91e-public/avatars/thumbs/64b5524f42f5698b2785b91f.jpg'
              className='category-info__avatar'
            />

            <div className='category-info__content'>
              <div className='category-info__name'>Frontend</div>
              {/* <div className='category-info__email'>nhatsang@gmail.com</div> */}
            </div>
          </div>
        </a>
      ),
      lastLogin: '19 Jul 2023 21:43:35',
      createdAt: '17 Jul 2023 21:38:07',
      courses: ['23432k', 'dsfdjsk'],
      tags: ['23432k', 'dsfdjsk'],
      manage: (
        <Space>
          <Button>
            <EditOutlined />
          </Button>
          <Button>
            <EllipsisOutlined />
          </Button>
        </Space>
      )
    }
  ];

  //   const { data: dataList, isFetching } = useGetCoursesQuery();

  //   if (dataList) {
  //     console.log(dataList, isFetching);
  //   }

  //   const [courseData, setCourseData] = useState<DataCategoryType[]>();

  //   useEffect(() => {
  //     if (dataList) {
  //       const sourceCourseData = dataList.courses.map((courseItem) => {
  //         const {
  //           _id,
  //           name,
  //           description,
  //           price,
  //           finalPrice,
  //           access,
  //           level,
  //           thumbnail,
  //           categoryId,
  //           userId,
  //           createdAt,
  //           updatedAt
  //         } = courseItem;

  //         const courseTemplateItem: DataCategoryType = {
  //           key: `${_id}`,
  //           name: (
  //             <div className='table__col-name'>
  //               <img title={name} className='table__col-name-img' src={thumbnail} />
  //               <span className='table__col-name-text'>{name}</span>
  //             </div>
  //           ),
  //           author: userId,
  //           categories: categoryId,
  //           access: Access.FREE,
  //           finalPrice: finalPrice,
  //           price: price,
  //           learners: 10,
  //           createdAt: '18 jun 2023',
  //           updatedAt: '18 jun 2023',
  //           actions: (
  //             <Fragment>
  //               <Button>
  //                 <Link to={`/author/courses?courseid=${_id}`}>Edit</Link>
  //               </Button>
  //               <Button>Some actions</Button>
  //             </Fragment>
  //           )
  //         };
  //         return courseTemplateItem;
  //       });

  //       setCourseData(sourceCourseData);
  //     } else {
  //       setCourseData([]);
  //     }
  //   }, [dataList]);

  //   const data: DataCategoryType[] = [
  //     {
  //       key: '1',
  //       name: (
  //         <div className='table__col-name'>
  //           <img
  //             title='img'
  //             className='table__col-name-img'
  //             src='https://lwfiles.mycourse.app/648eaf1c0c0c35ee7db7e0a2-public/custom/400x0_7443fad7314a484dffc9daff76f35cde.jpeg'
  //           />
  //           <span className='table__col-name-text'>HTML, CSS</span>
  //         </div>
  //       ),
  //       author: 'Sang tran dev',
  //       categories: 'Programming',
  //       access: Access.FREE,
  //       finalPrice: 100,
  //       price: 120,
  //       learners: 10,
  //       createdAt: '18 jun 2023',
  //       updatedAt: '18 jun 2023',
  //       actions: (
  //         <Fragment>
  //           <Button>
  //             <Link to={'/author/courses?courseid=1'}>Edit</Link>
  //           </Button>
  //           <Button>Some actions</Button>
  //         </Fragment>
  //       )
  //     },
  //     {
  //       key: '2',
  //       name: 'Javascript',
  //       author: 'Sang tran dev',
  //       categories: 'Programming',
  //       access: Access.FREE,
  //       finalPrice: 100,
  //       price: 120,
  //       learners: 10,
  //       createdAt: '18 jun 2023',
  //       updatedAt: '18 jun 2023'
  //     },
  //     {
  //       key: '3',
  //       name: 'ReactJS',
  //       author: 'Sang tran dev',
  //       categories: 'Programming',
  //       access: Access.FREE,
  //       finalPrice: 100,
  //       price: 120,
  //       learners: 10,
  //       createdAt: '18 jun 2023',
  //       updatedAt: '18 jun 2023'
  //     },
  //     {
  //       key: '4',
  //       name: 'Typescript',
  //       author: 'Sang tran dev',
  //       categories: 'Programming',
  //       access: Access.PAID,
  //       finalPrice: 100,
  //       price: 120,
  //       learners: 10,
  //       createdAt: '18 jun 2023',
  //       updatedAt: '18 jun 2023'
  //     }
  //   ];

  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 12
    }
  });

  return (
    <div className='users-list'>
      {/* {isFetching && <Skeleton />} */}
      <Table columns={columns} dataSource={categoriesSource} onChange={onChange} pagination={tableParams.pagination} />
    </div>
  );
};

export default CategoriesList;
